import type { IAdminOrganizationService } from "../contract/organization.service";
import type { OrganizationRequest } from "../model/organization.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ADMIN_ORGANIZATION_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface AdminUpdateOrganizationProps {
    service: IAdminOrganizationService;
}

interface AdminUpdateOrganizationInput {
    uuid: string;
    request: OrganizationRequest;
}

export const useAdminUpdateOrganization = ({ service }: AdminUpdateOrganizationProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: AdminUpdateOrganizationInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_ORGANIZATION_FILTER]);
                toastSuccess("Organização atualizada com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar organização");
            }
        }
    );
};