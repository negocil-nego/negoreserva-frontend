import type { IOrgOrganizationService } from "../contract/organization.service";
import type { AddressUpsertRequest } from "../model/organization";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface Props {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationUpsertAddress = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: AddressUpsertRequest) =>
            service.orOrganizationUpsertAddress(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Endereço adicionado com sucesso");
            },
            onError: () => {
                toastError("Erro ao adicionar endereço");
            },
        }
    );
};
