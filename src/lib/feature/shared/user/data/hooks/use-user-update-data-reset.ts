import type { IUserUpdateDataService } from "../contract/user-update-data.service";
import type { UpdateDataRequest } from "../model/user-update-data.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "$lib/feature/org/organization/data/hooks/keys";

interface UserUpdateDataResetProps {
    service: IUserUpdateDataService;
}

export const useUserUpdateDataReset = ({ service }: UserUpdateDataResetProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: UpdateDataRequest) => service.userUpdateDataReset(request),
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
