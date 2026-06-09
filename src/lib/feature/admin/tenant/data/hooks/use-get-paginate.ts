import type { ITenantService } from "../contract/tenant.service";
import type { PaginateRequest } from "../model/tenant.model";
import { useQuery } from "@sveltestack/svelte-query";
import { TENANT_FINDALL } from "./keys";

interface TenantPaginateProps {
    service: ITenantService;
    request: PaginateRequest;
}

export const useGetTenantPaginate = ({
    service,
    request
}: TenantPaginateProps) => {
    return useQuery(
        [TENANT_FINDALL, request],
        () => service.paginate(request),
    );
};