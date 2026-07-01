import { apolloClient } from "$lib/providers/graphql.provider";
import { ORGANIZATION_DETAIL, PUB_CATALOG_PRODUCTS, PUB_SEARCH_ORGANIZATION, PUB_SEARCH_ORGANIZATION_FILTER } from "$lib/feature/pub/organization/data/queries/organization";
import type { IOrganizationRepo } from "../contract/organization.repository";
import type {
    OrganizationDetailResponse,
    OrganizationPaginate,
    OrganizationSearchFilterParamInput,
} from "../model/organization.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product/data/model/product.model";
import type { PaginateRequest } from "$lib/feature/shared/core/data/model";

export class OrganizationGqlRepo implements IOrganizationRepo {
    async detail(uuidOrSlug: string): Promise<OrganizationDetailResponse> {
        try {
            const { data } = await apolloClient.query<{ pubOrganizationDetail: OrganizationDetailResponse }>({
                query: ORGANIZATION_DETAIL,
                variables: { uuidOrSlug },
                fetchPolicy: 'cache-first'
            });
            return data!.pubOrganizationDetail;
        } catch (error) {
            console.error('Failed to fetch organization detail:', error);
            throw error;
        }
    }

    async catalogProducts(uuidOrSlug: string): Promise<ProductDetailResponse[]> {
        try {
            const { data } = await apolloClient.query<{ pubCatalogProducts: ProductDetailResponse[] }>({
                query: PUB_CATALOG_PRODUCTS,
                variables: { uuidOrSlug },
                fetchPolicy: 'network-only'
            });
            return data!.pubCatalogProducts;
        } catch (error) {
            console.error('Failed to fetch catalog products:', error);
            throw error;
        }
    }

    async search(q: string, request: PaginateRequest): Promise<OrganizationPaginate> {
        try {
            const { data } = await apolloClient.query<{ pubSearchOrganization: OrganizationPaginate }>({
                query: PUB_SEARCH_ORGANIZATION,
                variables: { q, paginateRequest: request },
                fetchPolicy: 'network-only'
            });
            return data!.pubSearchOrganization;
        } catch (error) {
            console.error('Failed to search organizations:', error);
            throw error;
        }
    }

    async searchFilter(filter: OrganizationSearchFilterParamInput, request: PaginateRequest): Promise<OrganizationPaginate> {
        try {
            const { data } = await apolloClient.query<{ pubSearchOrganizationFilter: OrganizationPaginate }>({
                query: PUB_SEARCH_ORGANIZATION_FILTER,
                variables: { filter, paginateRequest: request },
                fetchPolicy: 'network-only'
            });
            return data!.pubSearchOrganizationFilter;
        } catch (error) {
            console.error('Failed to search organizations with filter:', error);
            throw error;
        }
    }
}
