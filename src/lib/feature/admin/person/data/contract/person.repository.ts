import type {
    PersonResponse,
    PersonPaginate,
    PersonCreateRequest,
    PersonUpdateRequest,
    PersonFilterQueryParamInput,
    PaginateRequest
} from "../model/person.model";

export interface IAdminPersonRepository {
    paginate(request: PaginateRequest): Promise<PersonPaginate>
    paginatePersonFilter(filter: PersonFilterQueryParamInput): Promise<PersonPaginate>
    findByUuid(uuid: string): Promise<PersonResponse>
    findByEmail(email: string): Promise<PersonResponse>
    findByPhone(phone: string): Promise<PersonResponse>
    save(request: PersonCreateRequest): Promise<PersonResponse>
    update(uuid: string, request: PersonUpdateRequest): Promise<PersonResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}