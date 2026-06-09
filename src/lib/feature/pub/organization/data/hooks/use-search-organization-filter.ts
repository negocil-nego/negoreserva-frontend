import { useQuery } from "@sveltestack/svelte-query";
import { ORGANIZATION_SEARCH_PUB } from "./keys";
import type { IOrganizationManage } from "../contract/organization.service";
import type { PaginateRequest } from "../model/organization.model";

interface UseSearchOrganizationFilterProps {
    service: IOrganizationManage;
    q: string | null;
    categoriesUuid: string[];
    request: PaginateRequest;
}

export const useSearchOrganizationFilter = (props: UseSearchOrganizationFilterProps) => {
    const { service, q, categoriesUuid, request } = props;
    return useQuery(
        [ORGANIZATION_SEARCH_PUB, q, categoriesUuid, request],
        () => service.searchFilter({ q, categoriesUuid }, request),
        {
            keepPreviousData: true,
            onError: (error) => {
                console.error('Failed to search organizations with filter:', error);
            }
        }
    );
};
