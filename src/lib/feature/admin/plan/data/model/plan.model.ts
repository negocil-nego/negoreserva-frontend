export interface PlanResponse {
    uuid: string;
    name: string;
    price: number;
    description?: string | null;
    type: string;
}

export interface PlanPaginate {
    content: PlanResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface PlanRequest {
    name: string;
    price: number;
    description: string;
    type: string;
}

export interface PlanFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const PLAN_RESPONSE_EMPTY = {
    uuid: "",
    name: "",
    price: 0,
    description: "",
    type: "",
}