import type { IOrgOrganizationService } from "../contract/organization.service";
import type { OrganizationAddressEditRequest } from "../model/organization";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrgOrganizationUpdateAddressProps {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationUpdateAddress = ({ service }: OrgOrganizationUpdateAddressProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: OrganizationAddressEditRequest) =>
            service.orOrganizationUpdateAddress(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Endereço atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar endereço");
            }
        }
    );
};
