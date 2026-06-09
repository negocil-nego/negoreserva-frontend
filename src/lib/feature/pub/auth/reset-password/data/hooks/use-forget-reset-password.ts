import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { UserForgetResetPasswordRequest } from "../model/reset-password.model";
import { useMutation } from "@sveltestack/svelte-query";
import type { IResetPasswordService } from "../contract/reset-password.service";

interface ForgetResetPasswordProps {
    service: IResetPasswordService;
}

export const useForgetResetPassword = ({
    service,
}: ForgetResetPasswordProps) => {
    return useMutation(
        (request: UserForgetResetPasswordRequest) => service.forgetResetPassword(request),
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
