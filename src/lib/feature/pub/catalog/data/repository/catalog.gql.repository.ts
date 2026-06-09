import { apolloClient } from "$lib/providers/graphql.provider";
import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";
import { PUB_SEARCH_CATALOG_FILTER } from "../queries/catalog";
import type { ICatalogRepo } from "../contract/catalog.repository";
import type { CatalogSearchFilterParamInput, SearchCatalogPaginate } from "../model/catalog.model";

export class CatalogGqlRepo implements ICatalogRepo {
    async searchFilter(filter: CatalogSearchFilterParamInput, request: PaginateRequest): Promise<SearchCatalogPaginate> {
        try {
            const { data } = await apolloClient.query<{ pubSearchCatalogFilter: SearchCatalogPaginate }>({
                query: PUB_SEARCH_CATALOG_FILTER,
                variables: { filter, paginateRequest: request },
                fetchPolicy: "network-only"
            });
            return data!.pubSearchCatalogFilter;
        } catch (error) {
            console.error("Failed to search catalogs with filter:", error);
            throw error;
        }
    }
}
