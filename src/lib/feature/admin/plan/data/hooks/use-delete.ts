import type { IPlanService } from "../contract/plan.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { PLAN_FILTER } from "./keys";

interface DeletePlanProps {
    service: IPlanService;
}

interface DeletePlanInput {
    uuid: string;
}

export const useDeletePlan = ({ service }: DeletePlanProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeletePlanInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PLAN_FILTER]);
                toastSuccess("Plano deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar plano");
            }
        }
    );
};