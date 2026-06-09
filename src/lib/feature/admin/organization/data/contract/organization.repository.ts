import type {
    OrganizationResponse,
    OrganizationPaginate,
    OrganizationRequest,
    OrganizationFilterQueryParamInput,
    PaginateRequest
} from "../model/organization.model";

export interface IAdminOrganizationRepo {
    paginate(request: PaginateRequest): Promise<OrganizationPaginate>
    paginateOrganizationFilter(filter: OrganizationFilterQueryParamInput): Promise<OrganizationPaginate>
    findByUuid(uuid: string): Promise<OrganizationResponse>
    findByName(name: string): Promise<OrganizationResponse>
    save(request: OrganizationRequest): Promise<OrganizationResponse>
    update(uuid: string, request: OrganizationRequest): Promise<OrganizationResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}