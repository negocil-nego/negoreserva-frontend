import type { IOrgOrganizationService } from "../contract/organization.service";
import type { OrganizationSocialMediaEditRequest } from "../model/organization";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrgOrganizationUpdateSocialMediaProps {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationUpdateSocialMedia = ({ service }: OrgOrganizationUpdateSocialMediaProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: OrganizationSocialMediaEditRequest) =>
            service.orOrganizationUpdateSocialMedia(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Redes sociais atualizadas com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar redes sociais");
            }
        }
    );
};
