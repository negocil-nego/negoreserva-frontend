export interface TenantResponse {
    uuid: string;
    code: string;
    name: string;
}

export interface TenantPaginate {
    content: TenantResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface TenantCreateRequest {
    code: string;
    name: string;
}

export interface TenantUpdateRequest {
    name?: string;
}

export interface TenantFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const TENANT_RESPONSE_EMPTY = {
    uuid: "",
    code: "",
    name: "",
}