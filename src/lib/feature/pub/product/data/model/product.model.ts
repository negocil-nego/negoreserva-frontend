import type {
    OrganizationResponse,
    ProductFileGetOrgResponse,
    ProductPriceGetOrgResponse,
    ProductTagInfoGetOrgResponse,
    PaginateRequest
} from "$lib/feature/pub/organization/data/model/organization.model";

export interface ProductDetailResponse {
    uuid: string;
    name: string;
    description: string;
    image?: string | null;
    organization: OrganizationResponse;
    files: ProductFileGetOrgResponse[];
    tags: ProductTagInfoGetOrgResponse[];
    prices: ProductPriceGetOrgResponse[];
}

export interface ProductSearchFilterParamInput {
    q?: string | null;
    priceMin?: number | null;
    priceMax?: number | null;
    organizationUuids?: string[] | null;
}

export interface ProductResponse {
    uuid: string;
    name: string;
    slug: string;
    description: string;
    image?: string | null;
    organization: OrganizationResponse;
}

export interface SearchProductPaginate {
    content: ProductResponse[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
