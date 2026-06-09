import { apolloClient } from "$lib/providers/graphql.provider";
import {
  PAGINATE_CATALOG, PAGINATE_CATALOG_FILTER, FIND_BY_UUID_CATALOG,
  FIND_BY_UUID_OR_SLUG_CATALOG,
  UPDATE_CATALOG, DELETE_BY_UUID_CATALOG,
  PAGINATE_CATALOG_PRODUCTS, PAGINATE_CATALOG_PRODUCTS_NOT_IN,
  ADD_PRODUCTS_TO_CATALOG, REMOVE_PRODUCTS_FROM_CATALOG
} from "../queries/catalog";
import type { IOrgCatalogRepo, PaginateRequest, CatalogFilterQueryParamInput, CatalogUpdateRequest, CatalogProductOrderInput } from "../contract/catalog.repo";
import type { OrgCatalogResponse, OrgCatalogPaginate } from "../model/catalog.model";
import type { OrgProductPaginate } from "$lib/feature/org/product/data/model/product.model";

export class OrgCatalogGqlRepo implements IOrgCatalogRepo {

    async paginate(request: PaginateRequest): Promise<OrgCatalogPaginate> {
        const { data } = await apolloClient.query<{ orgPaginateCatalog: OrgCatalogPaginate }>({
            query: PAGINATE_CATALOG,
            variables: { paginateRequest: request }
        });
        return data!.orgPaginateCatalog;
    }

    async paginateCatalogFilter(filter: CatalogFilterQueryParamInput): Promise<OrgCatalogPaginate> {
        const { data } = await apolloClient.query<{ orgPaginateCatalogFilter: OrgCatalogPaginate }>({
            query: PAGINATE_CATALOG_FILTER,
            variables: { filter }
        });
        return data!.orgPaginateCatalogFilter;
    }

    async findByUuid(uuid: string): Promise<OrgCatalogResponse> {
        const { data } = await apolloClient.query<{ orgFindByUuidCatalog: OrgCatalogResponse }>({
            query: FIND_BY_UUID_CATALOG, variables: { uuid }
        });
        return data!.orgFindByUuidCatalog;
    }

    async findByUuidOrSlug(uuidOrSlug: string): Promise<OrgCatalogResponse> {
        const { data } = await apolloClient.query<{ orgFindByUuidOrSlugCatalog: OrgCatalogResponse }>({
            query: FIND_BY_UUID_OR_SLUG_CATALOG, variables: { uuidOrSlug }
        });
        return data!.orgFindByUuidOrSlugCatalog;
    }

    async update(uuid: string, request: CatalogUpdateRequest): Promise<OrgCatalogResponse> {
        const { data } = await apolloClient.mutate<{ orgUpdateCatalog: OrgCatalogResponse }>({
            mutation: UPDATE_CATALOG,
            variables: { uuid, catalogRequest: request }
        });
        return data!.orgUpdateCatalog;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgDeleteByUuidCatalog: boolean }>({
            mutation: DELETE_BY_UUID_CATALOG, variables: { uuid }
        });
        return data!.orgDeleteByUuidCatalog;
    }

    async paginateCatalogProducts(uuidOrSlug: string, request: PaginateRequest): Promise<OrgProductPaginate> {
        const { data } = await apolloClient.query<{ orgPaginateCatalogProducts: OrgProductPaginate }>({
            query: PAGINATE_CATALOG_PRODUCTS,
            variables: { uuidOrSlug, paginateRequest: request }
        });
        return data!.orgPaginateCatalogProducts;
    }

    async paginateCatalogProductsNotIn(uuidOrSlug: string, request: PaginateRequest): Promise<OrgProductPaginate> {
        const { data } = await apolloClient.query<{ orgPaginateCatalogProductsNotIn: OrgProductPaginate }>({
            query: PAGINATE_CATALOG_PRODUCTS_NOT_IN,
            variables: { uuidOrSlug, paginateRequest: request }
        });
        return data!.orgPaginateCatalogProductsNotIn;
    }

    async addProductsToCatalog(uuidOrSlug: string, products: CatalogProductOrderInput[]): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgAddProductsToCatalog: boolean }>({
            mutation: ADD_PRODUCTS_TO_CATALOG,
            variables: { uuidOrSlug, products }
        });
        return data!.orgAddProductsToCatalog;
    }

    async removeProductsFromCatalog(uuidOrSlug: string, productUuids: string[]): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgRemoveProductsFromCatalog: boolean }>({
            mutation: REMOVE_PRODUCTS_FROM_CATALOG,
            variables: { uuidOrSlug, productUuids }
        });
        return data!.orgRemoveProductsFromCatalog;
    }
}
