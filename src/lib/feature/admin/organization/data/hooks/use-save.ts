import type { IAdminOrganizationService } from "../contract/organization.service";
import type { OrganizationRequest } from "../model/organization.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ADMIN_ORGANIZATION_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface AdminSaveOrganizationProps {
    service: IAdminOrganizationService;
}

export const useAdminSaveOrganization = ({
    service,
}: AdminSaveOrganizationProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: OrganizationRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_ORGANIZATION_FILTER]);
                toastSuccess("Organização salva com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar organização");
            }
        }
    );
};