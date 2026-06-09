import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { IRegisterService } from "../contract/register.service";
import { UserType, type ConfirmUserOtpVerificationInput } from "../model/register.model";
import { useMutation } from "@sveltestack/svelte-query";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import {userAuthStore} from "$lib/stores/user-auth.store";

interface ConfirmOtpProps {
    service: IRegisterService;
}

export const useConfirmOtp = ({
    service,
}: ConfirmOtpProps) => {
    return useMutation(
        (request: ConfirmUserOtpVerificationInput) => service.confirmOtp(request),
        {
            onSuccess: (data) => {
                if (data) {
                    userAuthStore.setUserAuthResponse(data!);
                    toastSuccess("Código confirmado com sucesso");
                    if (data.type === UserType.CLIENT) {
                        goto(resolve("/dashboard/client" as any));
                    } else if (data.type === UserType.ORGANIZATION) {
                        goto(resolve("/dashboard/organization" as any));
                    }
                } else {
                    toastError("Erro ao confirmar código");
                }
            },
            onError: (e) => {
                if (handleCombinedGraphqlErrors(e)) return;
                toastError("Erro ao confirmar código");
            }
        }
    );
};
