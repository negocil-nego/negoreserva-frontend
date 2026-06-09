import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_PRODUCT,
    PAGINATE_PRODUCT_FILTER,
    FIND_BY_UUID_PRODUCT,
    SAVE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_BY_UUID_PRODUCT
} from "../queries/product";
import type { IOrgProductRepo } from "../contract/product.repo";
import type {
    OrgProductResponse,
    OrgProductPaginate,
    ProductRequest,
    ProductFilterQueryParamInput,
    PaginateRequest
} from "../model/product.model";

export class OrgProductGqlRepo implements IOrgProductRepo {

    async paginate(request: PaginateRequest): Promise<OrgProductPaginate> {
        const { data } = await apolloClient.query<{ orgPaginateProduct: OrgProductPaginate }>({
            query: PAGINATE_PRODUCT,
            variables: { paginateRequest: request }
        });
        return data!.orgPaginateProduct;
    }

    async paginateProductFilter(filter: ProductFilterQueryParamInput): Promise<OrgProductPaginate> {
        const { data } = await apolloClient.query<{ orgPaginateProductFilter: OrgProductPaginate }>({
            query: PAGINATE_PRODUCT_FILTER,
            variables: { filter }
        });
        return data!.orgPaginateProductFilter;
    }

    async findByUuid(uuid: string): Promise<OrgProductResponse> {
        const { data } = await apolloClient.query<{ orgFindByUuidProduct: OrgProductResponse }>({
            query: FIND_BY_UUID_PRODUCT,
            variables: { uuid }
        });
        return data!.orgFindByUuidProduct;
    }

    async save(request: ProductRequest): Promise<OrgProductResponse> {
        const { data } = await apolloClient.mutate<{ orgSaveProduct: OrgProductResponse }>({
            mutation: SAVE_PRODUCT,
            variables: { productRequest: request }
        });
        return data!.orgSaveProduct;
    }

    async update(uuid: string, request: ProductRequest): Promise<OrgProductResponse> {
        const { data } = await apolloClient.mutate<{ orgUpdateProduct: OrgProductResponse }>({
            mutation: UPDATE_PRODUCT,
            variables: { uuid, productRequest: request }
        });
        return data!.orgUpdateProduct;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgDeleteByUuidProduct: boolean }>({
            mutation: DELETE_BY_UUID_PRODUCT,
            variables: { uuid }
        });
        return data!.orgDeleteByUuidProduct;
    }
}
