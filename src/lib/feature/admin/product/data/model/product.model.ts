import type { OrganizationResponse } from "$lib/feature/admin/organization/data/model/organization.model";

export interface ProductResponse {
    uuid: string;
    name: string;
    price: number;
    description?: string | null;
    type: string;
    organization: OrganizationResponse;
}

export interface ProductPaginate {
    content: ProductResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface ProductRequest {
    name: string;
    price: number;
    description: string;
    type: string;
    organizationUuid?: string | null;
}

export interface ProductFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const PRODUCT_RESPONSE_EMPTY = {
    uuid: "",
    name: "",
    price: 0,
    description: "",
    type: "",
    organization: {
        uuid: "",
        name: "",
        email: "",
        description: "",
        phone: "",
        address: "",
    },
}