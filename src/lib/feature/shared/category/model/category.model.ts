export class CategoryType {
    public static readonly HOSTING: string = "HOSTING"
    public static readonly RESTAURANT: string = "RESTAURANT"
}

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

export const CATEGORY_RESPONSE_EMPTY = {
    uuid: "",
    name: "",
    slug: "",
    description: "",
}