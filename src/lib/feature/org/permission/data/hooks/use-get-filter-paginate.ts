import type { IOrgPermissionService } from "../contract/permission.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_PERMISSION_FILTER } from "./keys";

interface OrgPermissionFilterPaginateProps {
    service: IOrgPermissionService;
    filter: { pageNumber: number; pageSize: number };
}

export const useOrgGetPermissionFilterPaginate = ({
    service,
    filter
}: OrgPermissionFilterPaginateProps) => {
    return useQuery(
        [ORG_PERMISSION_FILTER, filter],
        () => service.paginate(filter),
    );
};
