import type { IPlanRepository } from "./plan.repository";
import type {
    PlanResponse,
    PlanPaginate,
    PlanRequest,
    PlanFilterQueryParamInput,
    PaginateRequest
} from "../model/plan.model";

export class IPlanService {
    private repo: IPlanRepository;

    constructor(repo: IPlanRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<PlanPaginate> {
        return await this.repo.paginate(request);
    }

    async paginatePlanFilter(filter: PlanFilterQueryParamInput): Promise<PlanPaginate> {
        return await this.repo.paginatePlanFilter(filter);
    }

    async findByUuid(uuid: string): Promise<PlanResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async findByName(name: string): Promise<PlanResponse> {
        return await this.repo.findByName(name);
    }

    async save(request: PlanRequest): Promise<PlanResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: PlanRequest): Promise<PlanResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}