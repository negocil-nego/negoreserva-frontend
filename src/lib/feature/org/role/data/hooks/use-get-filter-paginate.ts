import type { IOrgRoleService } from "../contract/role.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_ROLE_FILTER } from "./keys";

interface OrgRoleFilterPaginateProps {
    service: IOrgRoleService;
    filter: { pageNumber: number; pageSize: number };
}

export const useOrgGetRoleFilterPaginate = ({
    service,
    filter
}: OrgRoleFilterPaginateProps) => {
    return useQuery(
        [ORG_ROLE_FILTER, filter],
        () => service.paginate(filter.pageNumber, filter.pageSize),
    );
};
