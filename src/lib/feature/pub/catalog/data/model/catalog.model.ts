import type { OrganizationResponse, PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";

export type CatalogType = "NONE" | "DRIK" | "FOOD";

export interface CatalogResponse {
    uuid: string;
    name: string;
    description: string;
    imgUrl?: string | null;
    slug: string;
    type: CatalogType;
    organization: OrganizationResponse;
}

export interface CatalogSearchFilterParamInput {
    q?: string | null;
    organizationUuids?: string[] | null;
}

export interface SearchCatalogPaginate {
    content: CatalogResponse[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export type { PaginateRequest };
