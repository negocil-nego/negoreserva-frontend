import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { IUserService } from "../contract/user.service";
import { userAuthStore } from "$lib/stores/user-auth.store";

interface UserUpdateLogoProps {
    service: IUserService;
}

export const useUserUpdateLogo = ({ service }: UserUpdateLogoProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (file: File) => service.updateLogoUser(file),
        {
            onSuccess: (data, file) => {
                queryClient.invalidateQueries(["profileUser"]);
                
                // Set local preview in the auth store for instant visual update
                const currentUser = userAuthStore.getUserAuthResponse();
                if (currentUser) {
                    const localUrl = URL.createObjectURL(file);
                    userAuthStore.setUserAuthResponse({
                        ...currentUser,
                        logo: localUrl
                    });
                }
                
                toastSuccess("Foto de perfil atualizada com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar foto de perfil");
            }
        }
    );
};
