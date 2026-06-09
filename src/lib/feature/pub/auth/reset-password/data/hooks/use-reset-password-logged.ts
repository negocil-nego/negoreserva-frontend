import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { UserResetPasswordLoggedInput } from "../model/reset-password.model";
import type { IResetPasswordService } from "../contract/reset-password.service";
import { useMutation } from "@sveltestack/svelte-query";

interface ResetPasswordProps {
    service: IResetPasswordService;
}

export const useResetPasswordLogged = ({
    service,
}: ResetPasswordProps) => {
    return useMutation(
        (request: UserResetPasswordLoggedInput) => service.resetPasswordLogged(request),
        {
            onSuccess: (data) => {
                if (data) {
                    toastSuccess("Senha redefinida com sucesso");
                } else {
                    toastError("Erro ao redefinir senha");
                }
            },
            onError: (e) => {
                if (handleCombinedGraphqlErrors(e)) return;
                toastError("Erro ao redefinir senha");
            }
        }
    );
};
