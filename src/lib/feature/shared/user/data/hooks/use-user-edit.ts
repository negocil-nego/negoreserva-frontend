import type { IUserService } from "../contract/user.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "$lib/feature/org/organization/data/hooks/keys";
import type { UserEditProfileRequest } from "../model/user.model";

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
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE])
                toastSuccess("Dados salvos com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar dados");
            }
        }
    );
};