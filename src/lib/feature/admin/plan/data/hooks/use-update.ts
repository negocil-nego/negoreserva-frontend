import type { IPlanService } from "../contract/plan.service";
import type { PlanRequest } from "../model/plan.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { PLAN_FILTER } from "./keys";

interface UpdatePlanProps {
    service: IPlanService;
}

interface UpdatePlanInput {
    uuid: string;
    request: PlanRequest;
}

export const useUpdatePlan = ({ service }: UpdatePlanProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: UpdatePlanInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PLAN_FILTER]);
                toastSuccess("Plano atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar plano");
            }
        }
    );
};