import type { IOrganizationRepo } from "./organization.repository";
import type {
    GetOrganizationPaginate,
    OrganizationDetailResponse,
    OrganizationSearchFilterParamInput,
    PaginateRequest,
    SearchOrganizationPaginate
} from "../model/organization.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product/data/model/product.model";

export abstract class IOrganizationManage {
    protected constructor(private repo: IOrganizationRepo) { }

    async paginate(request: PaginateRequest): Promise<GetOrganizationPaginate> {
        return await this.repo.paginate(request);
    }

    async detail(uuidOrSlug: string): Promise<OrganizationDetailResponse> {
        return await this.repo.detail(uuidOrSlug);
    }

    async catalogProducts(uuidOrSlug: string): Promise<ProductDetailResponse[]> {
        return await this.repo.catalogProducts(uuidOrSlug);
    }

    async search(q: string, request: PaginateRequest): Promise<SearchOrganizationPaginate> {
        return await this.repo.search(q, request);
    }

    async searchFilter(filter: OrganizationSearchFilterParamInput, request: PaginateRequest): Promise<SearchOrganizationPaginate> {
        return await this.repo.searchFilter(filter, request);
    }
}
