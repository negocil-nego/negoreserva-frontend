import type { IOrgPaymentService } from "../contract/payment.service";
import type { PaymentFilterQueryParamInput } from "../model/payment.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_PAYMENT_FILTER } from "./keys";

interface OrgPaymentFilterPaginateProps {
    service: IOrgPaymentService;
    filter: PaymentFilterQueryParamInput;
}

export const useOrgGetPaymentFilterPaginate = ({
    service,
    filter
}: OrgPaymentFilterPaginateProps) => {
    return useQuery(
        [ORG_PAYMENT_FILTER, filter],
        () => service.paginatePaymentFilter(filter),
    );
};
