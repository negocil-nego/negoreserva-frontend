import type { CategoryResponse } from "$lib/feature/shared/category/model/category.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product/data/model/product.model";

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
    isHighlight?: boolean | null;
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
    country?: string | null;
    state?: string | null;
    city?: string | null;
    neighborhood?: string | null;
    street?: string | null;
    number?: string | null;
    zipCode?: string | null;
    complement?: string | null;
    province?: string | null;
    municipality?: string | null;
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

export interface ProductFileGetOrgResponse {
    uuid: string;
    title?: string | null;
    description?: string | null;
    url?: string | null;
    type?: string | null;
    isPrimary?: boolean | null;
}

export interface ProductPriceGetOrgResponse {
    uuid: string;
    type?: string | null;
    value?: number | null;
    order?: number | null;
    isPrimary?: boolean | null;
}

export interface ProductTagInfoGetOrgResponse {
    uuid: string;
    icon?: string | null;
    title?: string | null;
    value?: string | null;
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
    province?: string | null;
    municipality?: string | null;
    isHighlight?: boolean | null;
}

export interface OrganizationPaginate {
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

export const EMPTY_ORGANIZATION: OrganizationResponse = {
    uuid: "",
    name: "",
    slug: "",
    email: "",
    description: "",
    phone: "",
    address: ""
};

export const EMPTY_ORGANIZATION_PAGINATE: OrganizationPaginate = {
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
