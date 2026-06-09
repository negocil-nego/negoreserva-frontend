import type { IAdminOrganizationService } from "../contract/organization.service";
import type { OrganizationFilterQueryParamInput } from "../model/organization.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ADMIN_ORGANIZATION_FILTER } from "./keys";

interface AdminOrganizationFilterPaginateProps {
    service: IAdminOrganizationService;
    filter: OrganizationFilterQueryParamInput;
}

export const useAdminGetOrganizationFilterPaginate = ({
    service,
    filter
}: AdminOrganizationFilterPaginateProps) => {
    return useQuery(
        [ADMIN_ORGANIZATION_FILTER, filter],
        () => service.paginateOrganizationFilter(filter),
    );
};