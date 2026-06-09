import type { ITenantService } from "../contract/tenant.service";
import type { TenantUpdateRequest } from "../model/tenant.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { TENANT_FILTER } from "./keys";

interface UpdateTenantProps {
    service: ITenantService;
}

interface UpdateTenantInput {
    uuid: string;
    request: TenantUpdateRequest;
}

export const useUpdateTenant = ({ service }: UpdateTenantProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: UpdateTenantInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([TENANT_FILTER]);
                toastSuccess("Inquilino atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar inquilino");
            }
        }
    );
};