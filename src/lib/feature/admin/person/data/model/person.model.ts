export interface PersonResponse {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
}

export interface PersonPaginate {
    content: PersonResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface PersonCreateRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    birthday: string;
}

export interface PersonUpdateRequest {
    name?: string;
    birthday?: string;
}

export interface PersonFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const PERSON_RESPONSE_EMPTY = {
    uuid: "",
    name: "",
    email: "",
    phone: "",
    birthday: "",
}