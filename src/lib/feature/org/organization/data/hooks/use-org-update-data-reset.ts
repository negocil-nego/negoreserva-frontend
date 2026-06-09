import type { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import type { UpdateDataRequest } from "../model/organization-update-data.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_UPDATE_DATA_FIND_ALL } from "./keys";

interface OrgUpdateDataResetProps {
    service: IOrgOrganizationUpdateDataService;
}

export const useOrgUpdateDataReset = ({ service }: OrgUpdateDataResetProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: UpdateDataRequest) => service.orgUpdateDataReset(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_UPDATE_DATA_FIND_ALL]);
                toastSuccess("Dados atualizados com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar dados");
            }
        }
    );
};
