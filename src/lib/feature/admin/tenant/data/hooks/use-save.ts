import type { ITenantService } from "../contract/tenant.service";
import type { TenantCreateRequest } from "../model/tenant.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { TENANT_FILTER } from "./keys";

interface SaveTenantProps {
    service: ITenantService;
}

export const useSaveTenant = ({
    service,
}: SaveTenantProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: TenantCreateRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([TENANT_FILTER]);
                toastSuccess("Inquilino salvo com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar inquilino");
            }
        }
    );
};