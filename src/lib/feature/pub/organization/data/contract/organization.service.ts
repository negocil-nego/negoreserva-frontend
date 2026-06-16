import type { IOrganizationRepo } from "./organization.repository";
import type {
    OrganizationDetailResponse,
    OrganizationPaginate,
    OrganizationSearchFilterParamInput,
    PaginateRequest,
} from "../model/organization.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product/data/model/product.model";

export abstract class IOrganizationManage {
    protected constructor(private repo: IOrganizationRepo) { }

    async detail(uuidOrSlug: string): Promise<OrganizationDetailResponse> {
        return await this.repo.detail(uuidOrSlug);
    }

    async catalogProducts(uuidOrSlug: string): Promise<ProductDetailResponse[]> {
        return await this.repo.catalogProducts(uuidOrSlug);
    }

    async search(q: string, request: PaginateRequest): Promise<OrganizationPaginate> {
        return await this.repo.search(q, request);
    }

    async searchFilter(filter: OrganizationSearchFilterParamInput, request: PaginateRequest): Promise<OrganizationPaginate> {
        return await this.repo.searchFilter(filter, request);
    }
}
