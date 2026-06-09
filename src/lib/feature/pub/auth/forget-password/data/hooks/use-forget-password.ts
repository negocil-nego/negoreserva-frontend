import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { IForgetPasswordService } from "../contract/forget-password.service";
import type { UserForgetPasswordRequest } from "../model/forget-password.model";
import { useMutation } from "@sveltestack/svelte-query";

interface ForgetPasswordProps {
    service: IForgetPasswordService;
}

export const useForgetPassword = ({
    service,
}: ForgetPasswordProps) => {
    return useMutation(
        (request: UserForgetPasswordRequest) => service.sendMessageForgetPassword(request),
        {
            onSuccess: (data) => {
                if (data) {
                    toastSuccess("Email de recuperação enviado com sucesso");
                    goto(resolve("/auth/reset-password" as any));
                } else {
                    toastError("Erro ao enviar email de recuperação");
                }
            },
            onError: (e) => {
                if (handleCombinedGraphqlErrors(e)) return;
                toastError("Erro ao enviar email de recuperação");
            }
        }
    );
};
