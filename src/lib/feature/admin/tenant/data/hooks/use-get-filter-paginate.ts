import type { ITenantService } from "../contract/tenant.service";
import type { TenantFilterQueryParamInput } from "../model/tenant.model";
import { useQuery } from "@sveltestack/svelte-query";
import { TENANT_FILTER } from "./keys";

interface TenantFilterPaginateProps {
    service: ITenantService;
    filter: TenantFilterQueryParamInput;
}

export const useGetTenantFilterPaginate = ({
    service,
    filter
}: TenantFilterPaginateProps) => {
    return useQuery(
        [TENANT_FILTER, filter],
        () => service.paginateTenantFilter(filter),
    );
};