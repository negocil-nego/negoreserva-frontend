import type { PaginateRequest } from "../model/organization.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ORGANIZATION_PAGINATE_PUB } from "./keys";
import type { IOrganizationManage } from "../contract/organization.service";

interface UseOrganizationPaginateProps {
    service: IOrganizationManage;
    request: PaginateRequest;
}

export const usePubGetOrganizationPaginate = ({
    service, request
}: UseOrganizationPaginateProps) => {
    return useQuery(
        [ORGANIZATION_PAGINATE_PUB, request],
        () => service.paginate(request),
        {
            keepPreviousData: true,
            onError: (error) => {
                console.error('Failed to fetch organizations:', error);
            }
        }
    );
};
