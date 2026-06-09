import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_PRODUCT,
    PAGINATE_PRODUCT_FILTER,
    FIND_BY_UUID_PRODUCT,
    FIND_BY_NAME_PRODUCT,
    SAVE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_BY_UUID_PRODUCT
} from "$lib/feature/admin/product/data/queries/product";
import type { IProductRepository } from "../contract/product.repository";
import type {
    ProductResponse,
    ProductPaginate,
    ProductRequest,
    ProductFilterQueryParamInput,
    PaginateRequest
} from "../model/product.model";

export class ProductGqlRepository implements IProductRepository {

    async paginate(request: PaginateRequest): Promise<ProductPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateProduct: ProductPaginate }>({
            query: PAGINATE_PRODUCT,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginateProduct;
    }

    async paginateProductFilter(filter: ProductFilterQueryParamInput): Promise<ProductPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateProductFilter: ProductPaginate }>({
            query: PAGINATE_PRODUCT_FILTER,
            variables: { filter }
        });
        return data!.adminPaginateProductFilter;
    }

    async findByUuid(uuid: string): Promise<ProductResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidProduct: ProductResponse }>({
            query: FIND_BY_UUID_PRODUCT,
            variables: { uuid }
        });
        return data!.adminFindByUuidProduct;
    }

    async findByName(name: string): Promise<ProductResponse> {
        const { data } = await apolloClient.query<{ adminFindByNameProduct: ProductResponse }>({
            query: FIND_BY_NAME_PRODUCT,
            variables: { name }
        });
        return data!.adminFindByNameProduct;
    }

    async save(request: ProductRequest): Promise<ProductResponse> {
        const { data } = await apolloClient.mutate<{ adminSaveProduct: ProductResponse }>({
            mutation: SAVE_PRODUCT,
            variables: { productRequest: request }
        });
        return data!.adminSaveProduct;
    }

    async update(uuid: string, request: ProductRequest): Promise<ProductResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdateProduct: ProductResponse }>({
            mutation: UPDATE_PRODUCT,
            variables: { uuid, productRequest: request }
        });
        return data!.adminUpdateProduct;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidProduct: boolean }>({
            mutation: DELETE_BY_UUID_PRODUCT,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidProduct;
    }
}