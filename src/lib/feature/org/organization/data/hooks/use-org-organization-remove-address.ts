import type { IOrgOrganizationService } from "../contract/organization.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface Props {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationRemoveAddress = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        (addressUuid: string) =>
            service.orOrganizationRemoveAddress(addressUuid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Endereço removido com sucesso");
            },
            onError: () => {
                toastError("Erro ao remover endereço");
            },
        }
    );
};
