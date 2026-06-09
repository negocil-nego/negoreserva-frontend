import type { IPlanService } from "../contract/plan.service";
import type { PlanRequest } from "../model/plan.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { PLAN_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface SavePlanProps {
    service: IPlanService;
}

export const useSavePlan = ({
    service,
}: SavePlanProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: PlanRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PLAN_FILTER]);
                toastSuccess("Plano salvo com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar plano");
            }
        }
    );
};