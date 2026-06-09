import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { IRegisterService } from "../contract/register.service";
import type { ResendUserOtpVerificationInput } from "../model/register.model";
import { useMutation } from "@sveltestack/svelte-query";
import {registerStore} from "$lib/stores/register.store";

interface ResendOtpProps {
    service: IRegisterService;
}

export const useResendOtp = ({
    service,
}: ResendOtpProps) => {
    return useMutation(
        (request: ResendUserOtpVerificationInput) => service.resendOtp(request),
        {
            onSuccess: (data) => {
                if (data.status) {
                    registerStore.setAccountResponse(data!);
                    toastSuccess("Código enviado com sucesso");
                } else {
                    toastError("Erro ao enviar código");
                }
            },
            onError: (e) => {
                if (handleCombinedGraphqlErrors(e)) return;
                toastError("Erro ao enviar código");
            }
        }
    );
};
