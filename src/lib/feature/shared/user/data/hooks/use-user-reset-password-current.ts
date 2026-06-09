import type { IUserService } from "../contract/user.service";
import { useMutation } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { UserResetPasswordCurrentRequest } from "../model/user.model";

interface UserResetPasswordCurrentProps {
    service: IUserService;
}

export const useUserResetPasswordCurrent = ({
    service,
}: UserResetPasswordCurrentProps) => {
    return useMutation(
        (request: UserResetPasswordCurrentRequest) => service.userResetPasswordCurrent(request),
        {
            onSuccess: () => {
                toastSuccess("Palavra-passe alterada com sucesso");
            },
            onError: () => {
                toastError("Erro ao alterar palavra-passe");
            }
        }
    );
};
