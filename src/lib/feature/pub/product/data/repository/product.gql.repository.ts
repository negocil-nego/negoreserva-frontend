import { apolloClient } from "$lib/providers/graphql.provider";
import { PRODUCT_DETAIL, PUB_SEARCH_PRODUCT, PUB_SEARCH_PRODUCT_FILTER } from "$lib/feature/pub/product/data/queries/product";
import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";
import type { IProductRepo } from "../contract/product.repository";
import type { ProductDetailResponse, ProductSearchFilterParamInput, SearchProductPaginate } from "../model/product.model";

export class ProductGqlRepo implements IProductRepo {
    async detail(uuidOrSlug: string): Promise<ProductDetailResponse> {
        try {
            const { data } = await apolloClient.query<{ pubProductDetail: ProductDetailResponse }>({
                query: PRODUCT_DETAIL,
                variables: { uuidOrSlug },
                fetchPolicy: 'cache-first'
            });
            return data!.pubProductDetail;
        } catch (error) {
            console.error('Failed to fetch product detail:', error);
            throw error;
        }
    }

    async search(q: string, request: PaginateRequest): Promise<SearchProductPaginate> {
        try {
            const { data } = await apolloClient.query<{ pubSearchProduct: SearchProductPaginate }>({
                query: PUB_SEARCH_PRODUCT,
                variables: { q, paginateRequest: request },
                fetchPolicy: 'network-only'
            });
            return data!.pubSearchProduct;
        } catch (error) {
            console.error('Failed to search products:', error);
            throw error;
        }
    }

    async searchFilter(filter: ProductSearchFilterParamInput, request: PaginateRequest): Promise<SearchProductPaginate> {
        try {
            const { data } = await apolloClient.query<{ pubSearchProductFilter: SearchProductPaginate }>({
                query: PUB_SEARCH_PRODUCT_FILTER,
                variables: { filter, paginateRequest: request },
                fetchPolicy: 'network-only'
            });
            return data!.pubSearchProductFilter;
        } catch (error) {
            console.error('Failed to search products with filter:', error);
            throw error;
        }
    }
}
