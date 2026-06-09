import type { IOrgPaymentService } from "../contract/payment.service";
import type { PaymentRequest } from "../model/payment.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_PAYMENT_FILTER } from "./keys";

interface UpdatePaymentProps {
    service: IOrgPaymentService;
}

interface UpdatePaymentInput {
    uuid: string;
    request: PaymentRequest;
}

export const useOrgUpdatePayment = ({ service }: UpdatePaymentProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: UpdatePaymentInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PAYMENT_FILTER]);
                toastSuccess("Pagamento atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar pagamento");
            }
        }
    );
};
