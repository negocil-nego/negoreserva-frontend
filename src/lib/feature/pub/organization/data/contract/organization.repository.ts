import type {
    GetOrganizationPaginate,
    OrganizationDetailResponse,
    OrganizationResponse,
    OrganizationSearchFilterParamInput,
    PaginateRequest,
    SearchOrganizationPaginate
} from "../model/organization.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product/data/model/product.model";

export interface IOrganizationRepo {
    paginate(request: PaginateRequest): Promise<GetOrganizationPaginate>;
    detail(uuidOrSlug: string): Promise<OrganizationDetailResponse>;
    catalogProducts(uuidOrSlug: string): Promise<ProductDetailResponse[]>;
    search(q: string, request: PaginateRequest): Promise<SearchOrganizationPaginate>;
    searchFilter(filter: OrganizationSearchFilterParamInput, request: PaginateRequest): Promise<SearchOrganizationPaginate>;
}
