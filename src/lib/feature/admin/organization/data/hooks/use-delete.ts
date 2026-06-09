import type { IAdminOrganizationService } from "../contract/organization.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ADMIN_ORGANIZATION_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface DeleteOrganizationProps {
    service: IAdminOrganizationService;
}

interface DeleteOrganizationInput {
    uuid: string;
}

export const useAdminDeleteOrganization = ({ service }: DeleteOrganizationProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeleteOrganizationInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_ORGANIZATION_FILTER]);
                toastSuccess("Organização deletada com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar organização");
            }
        }
    );
};