import type { IUserService } from "../contract/user.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "$lib/feature/org/organization/data/hooks/keys";
import type { UserEditProfileRequest } from "../model/user.model";
import { userAuthStore } from "$lib/stores/user-auth.store";

interface UserEditProps {
    service: IUserService;
}

export const useUserEdit = ({
    service,
}: UserEditProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: UserEditProfileRequest) => service.userUpdate(request),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                queryClient.invalidateQueries(["profileUser"]);
                
                const currentUser = userAuthStore.getUserAuthResponse();
                if (currentUser && data) {
                    userAuthStore.setUserAuthResponse({
                        ...currentUser,
                        name: data.name,
                        email: data.email,
                    });
                }
                
                toastSuccess("Dados salvos com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar dados");
            }
        }
    );
};