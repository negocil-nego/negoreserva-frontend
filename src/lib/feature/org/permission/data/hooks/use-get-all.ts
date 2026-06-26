import type { IOrgPermissionService } from "../contract/permission.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_PERMISSION_FILTER } from "./keys";

interface OrgGetAllProps {
    service: IOrgPermissionService;
    enabled?: boolean;
}

export const useOrgGetPermission = ({
    service,
    enabled = true
}: OrgGetAllProps) => {
    return useQuery(
        [ORG_PERMISSION_FILTER],
        () => service.findAll(),
        { enabled }
    );
};
