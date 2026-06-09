import type {
    TenantResponse,
    TenantPaginate,
    TenantCreateRequest,
    TenantUpdateRequest,
    TenantFilterQueryParamInput,
    PaginateRequest
} from "../model/tenant.model";

export interface ITenantRepository {
    paginate(request: PaginateRequest): Promise<TenantPaginate>
    paginateTenantFilter(filter: TenantFilterQueryParamInput): Promise<TenantPaginate>
    findByUuid(uuid: string): Promise<TenantResponse>
    findByCode(code: string): Promise<TenantResponse>
    save(request: TenantCreateRequest): Promise<TenantResponse>
    update(uuid: string, request: TenantUpdateRequest): Promise<TenantResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}