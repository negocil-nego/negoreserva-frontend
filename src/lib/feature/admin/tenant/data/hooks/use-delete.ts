import type { ITenantService } from "../contract/tenant.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { TENANT_FILTER } from "./keys";

interface DeleteTenantProps {
    service: ITenantService;
}

interface DeleteTenantInput {
    uuid: string;
}

export const useDeleteTenant = ({ service }: DeleteTenantProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeleteTenantInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([TENANT_FILTER]);
                toastSuccess("Inquilino deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar inquilino");
            }
        }
    );
};