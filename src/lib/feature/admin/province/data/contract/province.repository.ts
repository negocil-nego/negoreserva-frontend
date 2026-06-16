import type {
    ProvinceResponse,
    ProvincePaginate,
    ProvinceRequest,
    ProvinceFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/location/model/location.model";

export interface IAdminProvinceRepository {
    paginate(request: PaginateRequest): Promise<ProvincePaginate>
    paginateProvinceFilter(filter: ProvinceFilterQueryParamInput): Promise<ProvincePaginate>
    findByUuid(uuid: string): Promise<ProvinceResponse>
    findByValue(value: string): Promise<ProvinceResponse>
    save(request: ProvinceRequest): Promise<ProvinceResponse>
    update(uuid: string, request: ProvinceRequest): Promise<ProvinceResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}
