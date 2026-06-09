import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";
import type { CatalogSearchFilterParamInput, SearchCatalogPaginate } from "../model/catalog.model";

export interface ICatalogRepo {
    searchFilter(filter: CatalogSearchFilterParamInput, request: PaginateRequest): Promise<SearchCatalogPaginate>;
}
