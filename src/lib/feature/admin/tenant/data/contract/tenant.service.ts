import type { ITenantRepository } from "./tenant.repository";
import type {
    TenantResponse,
    TenantPaginate,
    TenantCreateRequest,
    TenantUpdateRequest,
    TenantFilterQueryParamInput,
    PaginateRequest
} from "../model/tenant.model";

export class ITenantService {
    private repo: ITenantRepository;

    constructor(repo: ITenantRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<TenantPaginate> {
        return await this.repo.paginate(request);
    }

    async paginateTenantFilter(filter: TenantFilterQueryParamInput): Promise<TenantPaginate> {
        return await this.repo.paginateTenantFilter(filter);
    }

    async findByUuid(uuid: string): Promise<TenantResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async findByCode(code: string): Promise<TenantResponse> {
        return await this.repo.findByCode(code);
    }

    async save(request: TenantCreateRequest): Promise<TenantResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: TenantUpdateRequest): Promise<TenantResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}