import type {
    OrganizationDetailResponse,
    OrganizationPaginate,
    OrganizationSearchFilterParamInput,
    PaginateRequest,
} from "../model/organization.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product/data/model/product.model";

export interface IOrganizationRepo {
    detail(uuidOrSlug: string): Promise<OrganizationDetailResponse>;
    catalogProducts(uuidOrSlug: string): Promise<ProductDetailResponse[]>;
    search(q: string, request: PaginateRequest): Promise<OrganizationPaginate>;
    searchFilter(filter: OrganizationSearchFilterParamInput, request: PaginateRequest): Promise<OrganizationPaginate>;
}
