import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";
import type { IProductRepo } from "./product.repository";
import type { ProductDetailResponse, ProductSearchFilterParamInput, SearchProductPaginate } from "../model/product.model";

export abstract class IProductManage {
    protected constructor(private repo: IProductRepo) { }

    async detail(uuidOrSlug: string): Promise<ProductDetailResponse> {
        return await this.repo.detail(uuidOrSlug);
    }

    async search(q: string, request: PaginateRequest): Promise<SearchProductPaginate> {
        return await this.repo.search(q, request);
    }

    async searchFilter(filter: ProductSearchFilterParamInput, request: PaginateRequest): Promise<SearchProductPaginate> {
        return await this.repo.searchFilter(filter, request);
    }
}
