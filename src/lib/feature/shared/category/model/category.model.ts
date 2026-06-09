export interface CategoryResponse {
    uuid: string;
    name: string;
    slug: string;
    icon?: string | null;
    description?: string | null;
}

export interface CategoryPaginate {
    content: CategoryResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface CategoryRequest {
    name: string;
    description: string;
}

export interface CategoryFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const CATEGORY_RESPONSE_EMPTY = {
    uuid: "",
    name: "",
    slug: "",
    description: "",
}