import type { IOrgPaymentService } from "../contract/payment.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_PAYMENT_FILTER } from "./keys";

interface ValidateReceiptProps {
    service: IOrgPaymentService;
}

interface ValidateReceiptInput {
    uuid: string;
}

export const useOrgValidatePaymentReceipt = ({ service }: ValidateReceiptProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: ValidateReceiptInput) => {
            return service.validateReceipt(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PAYMENT_FILTER]);
                toastSuccess("Comprovativo validado com sucesso");
            },
            onError: () => {
                toastError("Erro ao validar comprovativo");
            }
        }
    );
};
