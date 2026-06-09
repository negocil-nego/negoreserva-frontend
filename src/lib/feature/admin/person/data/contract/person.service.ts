import type { IAdminPersonRepository } from "./person.repository";
import type {
    PersonResponse,
    PersonPaginate,
    PersonCreateRequest,
    PersonUpdateRequest,
    PersonFilterQueryParamInput,
    PaginateRequest
} from "../model/person.model";

export class IAdminPersonService {
    private repo: IAdminPersonRepository;

    constructor(repo: IAdminPersonRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<PersonPaginate> {
        return await this.repo.paginate(request);
    }

    async paginatePersonFilter(filter: PersonFilterQueryParamInput): Promise<PersonPaginate> {
        return await this.repo.paginatePersonFilter(filter);
    }

    async findByUuid(uuid: string): Promise<PersonResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async findByEmail(email: string): Promise<PersonResponse> {
        return await this.repo.findByEmail(email);
    }

    async findByPhone(phone: string): Promise<PersonResponse> {
        return await this.repo.findByPhone(phone);
    }

    async save(request: PersonCreateRequest): Promise<PersonResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: PersonUpdateRequest): Promise<PersonResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}