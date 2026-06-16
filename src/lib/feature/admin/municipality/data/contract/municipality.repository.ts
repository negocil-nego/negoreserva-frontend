import type {
    MunicipalityResponse,
    MunicipalityPaginate,
    MunicipalityRequest,
    MunicipalityFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/location/model/location.model";

export interface IAdminMunicipalityRepository {
    paginate(request: PaginateRequest): Promise<MunicipalityPaginate>
    paginateMunicipalityFilter(filter: MunicipalityFilterQueryParamInput): Promise<MunicipalityPaginate>
    findByUuid(uuid: string): Promise<MunicipalityResponse>
    save(request: MunicipalityRequest): Promise<MunicipalityResponse>
    update(uuid: string, request: MunicipalityRequest): Promise<MunicipalityResponse>
    deleteByUuid(uuid: string): Promise<boolean>
    listProvinces(): Promise<{ uuid: string; value: string; label: string }[]>
}
