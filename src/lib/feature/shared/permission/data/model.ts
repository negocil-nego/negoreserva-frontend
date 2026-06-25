export interface PermissionResponse {
    uuid: string;
    name: string;
    description?: string;
}

export interface PermissionPaginate {
    content: PermissionResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface PermissionSaveRequest {
    name: string;
    description?: string;
}

export const Admin_PERMISSION_RESPONSE_EMPTY: PermissionResponse = {
    uuid: "",
    name: "",
    description: "",
};
