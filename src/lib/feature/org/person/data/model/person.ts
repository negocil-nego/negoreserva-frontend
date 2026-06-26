export interface OrgRoleItem {
    uuid: string;
    name: string;
}

export interface Person {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    roles: OrgRoleItem[];
}

export interface PersonCreateRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    roleUuids?: string[];
}

export interface PersonUpdateRequest {
    name?: string;
    roleUuids?: string[];
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

export interface OrgPersonRoles {
    assignedRoles: OrgRoleItem[];
    availableRoles: OrgRoleItem[];
}
