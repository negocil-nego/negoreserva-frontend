export interface OrgProductFileResponse {
    uuid: string;
    title?: string | null;
    description?: string | null;
    url: string;
    type: string;
    isPrimary?: boolean;
}

export interface OrgProductResponse {
    uuid: string;
    name: string;
    slug?: string | null;
    description?: string | null;
    files?: OrgProductFileResponse[] | null;
    prices?: any[] | null;
    tags?: any[] | null;
}

export interface OrgProductPaginate {
    content: OrgProductResponse[];
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
    description: string;
    type: string;
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

export const ORG_PRODUCT_RESPONSE_EMPTY: OrgProductResponse = {
    uuid: "",
    name: "",
    description: "",
    files: [],
}
