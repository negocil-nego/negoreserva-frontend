import { useQuery } from "@sveltestack/svelte-query";
import { ORGANIZATION_SEARCH_PUB } from "./keys";
import type { IOrganizationManage } from "../contract/organization.service";
import type { PaginateRequest } from "../model/organization.model";

interface UseSearchOrganizationProps {
    service: IOrganizationManage;
    q: string;
    request: PaginateRequest;
}

export const useSearchOrganization = (props: UseSearchOrganizationProps) => {
    return useQuery(
        [ORGANIZATION_SEARCH_PUB],
        () => props.service.search(props.q, props.request),
        {
            enabled: false,
            keepPreviousData: true,
            onError: (error) => {
                console.error('Failed to search organizations:', error);
            }
        }
    );
};
