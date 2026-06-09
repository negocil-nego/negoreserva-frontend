import type {
    ProductFileResponse,
    ProductFilePaginate,
    ProductFileRequest,
    PaginateRequest
} from "../model/productfile.model";

export interface IProductFileRepository {
    paginate(request: PaginateRequest): Promise<ProductFilePaginate>
    findByUuid(uuid: string): Promise<ProductFileResponse>
    save(request: ProductFileRequest): Promise<ProductFileResponse>
    update(uuid: string, request: ProductFileRequest): Promise<ProductFileResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}