import type { IOrgRoleService } from "../contract/role.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_ROLE_FILTER } from "./keys";

interface GetRolePermissionsProps {
    service: IOrgRoleService;
    roleUuid: string;
    enabled?: boolean;
}

export const useOrgGetRolePermissions = ({
    service,
    roleUuid,
    enabled = true
}: GetRolePermissionsProps) => {
    return useQuery(
        ["ORG_ROLE_PERMISSIONS", roleUuid],
        () => service.getRolePermissions(roleUuid),
        { enabled }
    );
};
