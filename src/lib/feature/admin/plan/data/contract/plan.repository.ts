import type {
    PlanResponse,
    PlanPaginate,
    PlanRequest,
    PlanFilterQueryParamInput,
    PaginateRequest
} from "../model/plan.model";

export interface IPlanRepository {
    paginate(request: PaginateRequest): Promise<PlanPaginate>
    paginatePlanFilter(filter: PlanFilterQueryParamInput): Promise<PlanPaginate>
    findByUuid(uuid: string): Promise<PlanResponse>
    findByName(name: string): Promise<PlanResponse>
    save(request: PlanRequest): Promise<PlanResponse>
    update(uuid: string, request: PlanRequest): Promise<PlanResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}