export interface Person {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    birthday?: string | null;
}

export interface PersonCreateRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    birthday?: string | null;
    roleUuid?: string | null;
}

export interface PersonUpdateRequest {
    name?: string;
    birthday?: string | null;
}

export interface PersonPaginate {
    content: Person[];
    first: boolean;
    last: boolean;
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
