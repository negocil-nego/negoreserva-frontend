export interface NameCrudItem {
    uuid: string;
    name: string;
    description?: string | null;
}

export interface NameCrudPaginate {
    content: NameCrudItem[];
    first: boolean;
    last: boolean;
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export type NameCrudAction = "create" | "update" | "delete";

export type NameCrudResource = "Role" | "Permission";
