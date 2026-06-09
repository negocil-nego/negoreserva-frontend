import type { CategoryResponse } from "$lib/feature/shared/category/model/category.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product/data/model/product.model";

// Types matching organization.graphqls exactly
export interface ProductFileGetOrgResponse {
    uuid: string;
    title?: string | null;
    description?: string | null;
    url?: string | null;
    type?: string | null;
    isPrimary?: boolean;
}

export interface ProductPriceGetOrgResponse {
    uuid: string;
    type: string;
    value: number;
    order: number;
    isPrimary: boolean;
}

export interface ProductGetOrganizationResponse {
    uuid: string;
    name: string;
    slug: string;
    price?: number | null;
    description?: string | null;
    type?: string | null;
    image?: string | null;
}

export interface ProductTagInfoGetOrgResponse {
    uuid: string;
    icon: string;
    title: string;
    value: string;
}

export interface GetOrganizationProductResponse {
    product: ProductGetOrganizationResponse;
    files: ProductFileGetOrgResponse[];
    tags: ProductTagInfoGetOrgResponse[];
    prices: ProductPriceGetOrgResponse[];
}

export interface OrganizationResponse {
    uuid: string;
    name: string;
    slug: string;
    email: string;
    description?: string | null;
    phone: string;
    address?: string | null;
    rating?: number | null;
    logo?: string | null;
    image?: string | null;
    video?: string | null;
}

export interface GetOrganizationResponse {
    organization: OrganizationResponse;
    categories: CategoryResponse[];
    products: GetOrganizationProductResponse[];
}

export interface GetOrganizationPaginate {
    content: GetOrganizationResponse[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface OrganizationSocialMediaDetailResponse {
    uuid: string;
    facebook?: string | null;
    instagram?: string | null ;
    youtube?: string | null;
    tiKtok?: string | null;
    linkedin?: string | null;
}

export interface AddressResponse {
    uuid: string;
    country: string;
    state: string;
    city: string;
    neighborhood?: string | null;
    street: string;
    number?: string | null;
    zipCode?: string | null;
    complement?: string | null;
    latitude?: number | null;
    longitude?: number | null;
}

export interface CatalogResponse {
    uuid: string;
    name: string;
    description: string;
    imgUrl?: string | null;
    slug: string;
}

export interface OrganizationDetailResponse {
    uuid: string;
    name: string;
    slug: string;
    description: string;
    address: string;
    rating: string;
    logo: string;
    image: string;
    video: string;
    email: string;
    phone: string;
    categories: CategoryResponse[];
    products: ProductDetailResponse[];
    catalogs: CatalogResponse[];
    socialsMedia: OrganizationSocialMediaDetailResponse | null;
    addresses: AddressResponse[];
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export interface OrganizationSearchFilterParamInput {
    q?: string | null;
    categoriesUuid?: string[] | null;
}

export interface SearchOrganizationPaginate {
    content: OrganizationResponse[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

// Constants
export const EMPTY_ORGANIZATION: OrganizationResponse = {
    uuid: "",
    name: "",
    slug: "",
    email: "",
    description: "",
    phone: "",
    address: ""
};

export const EMPTY_GET_ORGANIZATION_RESPONSE: GetOrganizationResponse = {
    organization: EMPTY_ORGANIZATION,
    categories: [],
    products: []
};

export const EMPTY_GET_ORGANIZATION_PAGINATE: GetOrganizationPaginate = {
    content: [],
    empty: true,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
};
