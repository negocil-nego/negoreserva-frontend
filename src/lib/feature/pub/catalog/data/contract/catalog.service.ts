import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";
import type { ICatalogRepo } from "./catalog.repository";
import type { CatalogSearchFilterParamInput, SearchCatalogPaginate } from "../model/catalog.model";

export abstract class ICatalogManage {
    protected constructor(private repo: ICatalogRepo) { }

    async searchFilter(filter: CatalogSearchFilterParamInput, request: PaginateRequest): Promise<SearchCatalogPaginate> {
        return await this.repo.searchFilter(filter, request);
    }
}
