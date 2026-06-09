import type {
    OrgProductResponse,
    OrgProductPaginate,
    ProductRequest,
    ProductFilterQueryParamInput,
    PaginateRequest
} from "../model/product.model";

export interface IOrgProductRepo {
    paginate(request: PaginateRequest): Promise<OrgProductPaginate>
    paginateProductFilter(filter: ProductFilterQueryParamInput): Promise<OrgProductPaginate>
    findByUuid(uuid: string): Promise<OrgProductResponse>
    save(request: ProductRequest): Promise<OrgProductResponse>
    update(uuid: string, request: ProductRequest): Promise<OrgProductResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}
