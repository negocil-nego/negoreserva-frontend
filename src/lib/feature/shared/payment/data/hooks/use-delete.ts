import type { IOrgPaymentService } from "../contract/payment.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ORG_PAYMENT_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface DeletePaymentProps {
    service: IOrgPaymentService;
}

interface DeletePaymentInput {
    uuid: string;
}

export const useOrgDeletePayment = ({ service }: DeletePaymentProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeletePaymentInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PAYMENT_FILTER]);
                toastSuccess("Pagamento deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar pagamento");
            }
        }
    );
};
