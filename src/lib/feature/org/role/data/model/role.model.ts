export interface OrgRoleResponse {
    uuid: string;
    name: string;
}

export interface OrgRolePaginate {
    content: OrgRoleResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface OrgRolePermissionResponse {
    uuid: string;
    name: string;
    description?: string;
}

export interface OrgRolePermissions {
    assignedPermissions: OrgRolePermissionResponse[];
    availablePermissions: OrgRolePermissionResponse[];
}

export const ORG_ROLE_RESPONSE_EMPTY: OrgRoleResponse = {
    uuid: "",
    name: "",
};
