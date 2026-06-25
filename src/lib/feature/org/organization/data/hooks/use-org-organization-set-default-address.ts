import type { IOrgOrganizationService } from "../contract/organization.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface Props {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationSetDefaultAddress = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        (addressUuid: string) =>
            service.orOrganizationSetDefaultAddress(addressUuid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Endereço padrão atualizado");
            },
            onError: () => {
                toastError("Erro ao definir endereço padrão");
            },
        }
    );
};
