import type { IOrgOrganizationService } from "../contract/organization.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrgOrganizationUpdateLogoProps {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationUpdateLogo = ({ service }: OrgOrganizationUpdateLogoProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (file: File) => service.orOrganizationUpdateLogo(file),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Logótipo atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar logótipo");
            }
        }
    );
};
