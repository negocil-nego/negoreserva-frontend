import type { IAdminOrganizationRepo } from "./organization.repository";
import type {
    OrganizationResponse,
    OrganizationPaginate,
    OrganizationRequest,
    OrganizationFilterQueryParamInput,
    PaginateRequest
} from "../model/organization.model";

export class IAdminOrganizationService {
    private repo: IAdminOrganizationRepo;

    constructor(repo: IAdminOrganizationRepo) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<OrganizationPaginate> {
        return await this.repo.paginate(request);
    }

    async paginateOrganizationFilter(filter: OrganizationFilterQueryParamInput): Promise<OrganizationPaginate> {
        return await this.repo.paginateOrganizationFilter(filter);
    }

    async findByUuid(uuid: string): Promise<OrganizationResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async findByName(name: string): Promise<OrganizationResponse> {
        return await this.repo.findByName(name);
    }

    async save(request: OrganizationRequest): Promise<OrganizationResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: OrganizationRequest): Promise<OrganizationResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}