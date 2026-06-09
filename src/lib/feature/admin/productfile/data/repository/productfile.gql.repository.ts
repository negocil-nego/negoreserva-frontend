import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_PRODUCTFILE,
    FIND_BY_UUID_PRODUCTFILE,
    SAVE_PRODUCTFILE,
    UPDATE_PRODUCTFILE,
    DELETE_BY_UUID_PRODUCTFILE
} from "../queries/productfile";
import type { IProductFileRepository } from "../contract/productfile.repository";
import type {
    ProductFileResponse,
    ProductFilePaginate,
    ProductFileRequest,
    PaginateRequest
} from "../model/productfile.model";

export class ProductFileGqlRepository implements IProductFileRepository {

    async paginate(request: PaginateRequest): Promise<ProductFilePaginate> {
        const { data } = await apolloClient.query<{ adminPaginateProductFile: ProductFilePaginate }>({
            query: PAGINATE_PRODUCTFILE,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginateProductFile;
    }

    async findByUuid(uuid: string): Promise<ProductFileResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidProductFile: ProductFileResponse }>({
            query: FIND_BY_UUID_PRODUCTFILE,
            variables: { uuid }
        });
        return data!.adminFindByUuidProductFile;
    }

    async save(request: ProductFileRequest): Promise<ProductFileResponse> {
        const { data } = await apolloClient.mutate<{ adminSaveProductFile: ProductFileResponse }>({
            mutation: SAVE_PRODUCTFILE,
            variables: { productFileRequest: request }
        });
        return data!.adminSaveProductFile;
    }

    async update(uuid: string, request: ProductFileRequest): Promise<ProductFileResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdateProductFile: ProductFileResponse }>({
            mutation: UPDATE_PRODUCTFILE,
            variables: { uuid, productFileRequest: request }
        });
        return data!.adminUpdateProductFile;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidProductFile: boolean }>({
            mutation: DELETE_BY_UUID_PRODUCTFILE,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidProductFile;
    }
}