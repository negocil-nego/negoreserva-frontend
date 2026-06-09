import type {
    ProductResponse,
    ProductPaginate,
    ProductRequest,
    ProductFilterQueryParamInput,
    PaginateRequest
} from "../model/product.model";

export interface IProductRepository {
    paginate(request: PaginateRequest): Promise<ProductPaginate>
    paginateProductFilter(filter: ProductFilterQueryParamInput): Promise<ProductPaginate>
    findByUuid(uuid: string): Promise<ProductResponse>
    findByName(name: string): Promise<ProductResponse>
    save(request: ProductRequest): Promise<ProductResponse>
    update(uuid: string, request: ProductRequest): Promise<ProductResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}