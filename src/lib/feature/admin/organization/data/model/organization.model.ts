import type { OrganizationResponse } from "$lib/feature/pub/organization";
export type { OrganizationResponse };

export interface OrganizationPaginate {
    content: OrganizationResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface OrganizationRequest {
    name: string;
    email: string;
    description: string;
    phone: string;
    address: string;
}

export interface OrganizationFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export interface OrgOrganizationEditProfileRequest {
    name: string;
    description: string;
    address: string;
}

export const ORGANIZATION_RESPONSE_EMPTY = {
    uuid: "",
    name: "",
    slug: "",
    email: "",
    description: "",
    phone: "",
    address: "",
}