import type { IPlanService } from "../contract/plan.service";
import type { PlanFilterQueryParamInput } from "../model/plan.model";
import { useQuery } from "@sveltestack/svelte-query";
import { PLAN_FILTER } from "./keys";

interface PlanFilterPaginateProps {
    service: IPlanService;
    filter: PlanFilterQueryParamInput;
}

export const useGetPlanFilterPaginate = ({
    service,
    filter
}: PlanFilterPaginateProps) => {
    return useQuery(
        [PLAN_FILTER, filter],
        () => service.paginatePlanFilter(filter),
    );
};