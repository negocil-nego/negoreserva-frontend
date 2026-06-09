import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_PLAN,
    PAGINATE_PLAN_FILTER,
    FIND_BY_UUID_PLAN,
    FIND_BY_NAME_PLAN,
    SAVE_PLAN,
    UPDATE_PLAN,
    DELETE_BY_UUID_PLAN
} from "$lib/feature/admin/plan/data/queries/plan";
import type { IPlanRepository } from "../contract/plan.repository";
import type {
    PlanResponse,
    PlanPaginate,
    PlanRequest,
    PlanFilterQueryParamInput,
    PaginateRequest
} from "../model/plan.model";

export class PlanGqlRepository implements IPlanRepository {

    async paginate(request: PaginateRequest): Promise<PlanPaginate> {
        const { data } = await apolloClient.query<{ adminPaginatePlan: PlanPaginate }>({
            query: PAGINATE_PLAN,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginatePlan;
    }

    async paginatePlanFilter(filter: PlanFilterQueryParamInput): Promise<PlanPaginate> {
        const { data } = await apolloClient.query<{ adminPaginatePlanFilter: PlanPaginate }>({
            query: PAGINATE_PLAN_FILTER,
            variables: { filter }
        });
        return data!.adminPaginatePlanFilter;
    }

    async findByUuid(uuid: string): Promise<PlanResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidPlan: PlanResponse }>({
            query: FIND_BY_UUID_PLAN,
            variables: { uuid }
        });
        return data!.adminFindByUuidPlan;
    }

    async findByName(name: string): Promise<PlanResponse> {
        const { data } = await apolloClient.query<{ adminFindByNamePlan: PlanResponse }>({
            query: FIND_BY_NAME_PLAN,
            variables: { name }
        });
        return data!.adminFindByNamePlan;
    }

    async save(request: PlanRequest): Promise<PlanResponse> {
        const { data } = await apolloClient.mutate<{ adminSavePlan: PlanResponse }>({
            mutation: SAVE_PLAN,
            variables: { planRequest: request }
        });
        return data!.adminSavePlan;
    }

    async update(uuid: string, request: PlanRequest): Promise<PlanResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdatePlan: PlanResponse }>({
            mutation: UPDATE_PLAN,
            variables: { uuid, planRequest: request }
        });
        return data!.adminUpdatePlan;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidPlan: boolean }>({
            mutation: DELETE_BY_UUID_PLAN,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidPlan;
    }
}