import type { IOrgPaymentService } from "../contract/payment.service";
import type { PaymentRequest } from "../model/payment.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_PAYMENT_FILTER } from "./keys";

interface SavePaymentProps {
    service: IOrgPaymentService;
}

export const useOrgSavePayment = ({
    service,
}: SavePaymentProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: PaymentRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PAYMENT_FILTER]);
                toastSuccess("Pagamento salvo com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar pagamento");
            }
        }
    );
};
