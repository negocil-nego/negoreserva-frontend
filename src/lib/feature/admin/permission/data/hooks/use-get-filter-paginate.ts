import type { IAdminPermissionService } from "../contract/permission.service";
import { useQuery } from "@sveltestack/svelte-query";
import { Admin_PERMISSION_FILTER } from "./keys";

interface AdminPermissionFilterPaginateProps {
    service: IAdminPermissionService;
    filter: { pageNumber: number; pageSize: number };
}

export const useAdminGetPermissionFilterPaginate = ({
    service,
    filter
}: AdminPermissionFilterPaginateProps) => {
    return useQuery(
        [Admin_PERMISSION_FILTER, filter],
        () => service.paginate(filter.pageNumber, filter.pageSize),
    );
};
