import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";
import type { ProductDetailResponse, ProductSearchFilterParamInput, SearchProductPaginate } from "../model/product.model";

export interface IProductRepo {
    detail(uuidOrSlug: string): Promise<ProductDetailResponse>;
    search(q: string, request: PaginateRequest): Promise<SearchProductPaginate>;
    searchFilter(filter: ProductSearchFilterParamInput, request: PaginateRequest): Promise<SearchProductPaginate>;
}
