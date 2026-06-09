import type { IOrgOrganizationService } from "../contract/organization.service";
import type { OrgOrganizationEditProfileRequest } from "$lib/feature/admin/organization/data/model/organization.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrgOrganizationUpdateProps {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationUpdate = ({ service }: OrgOrganizationUpdateProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: OrgOrganizationEditProfileRequest) => service.orOrganizationUpdate(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Dados atualizados com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar dados");
            }
        }
    );
};
