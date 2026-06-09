import { useQuery } from "@sveltestack/svelte-query";
import type { IOrgPaymentService } from "../contract/payment.service";

interface UseFindByUuidPaymentProps {
    service: IOrgPaymentService;
    uuid: string;
}

export const useFindByUuidPayment = ({
    service, uuid
}: UseFindByUuidPaymentProps) => {
    return useQuery(
        ["ORG_PAYMENT_FIND_BY_UUID", uuid],
        () => service.findByUuid(uuid),
        {
            enabled: !!uuid,
            onError: (error) => {
                console.error('Failed to fetch payment:', error);
            }
        }
    );
};
