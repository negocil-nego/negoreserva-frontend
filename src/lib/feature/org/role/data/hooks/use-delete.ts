import type { IOrgRoleService } from "../contract/role.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ORG_ROLE_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface DeleteRoleProps {
    service: IOrgRoleService;
}

export const useOrgDeleteRole = ({ service }: DeleteRoleProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (uuid: string) => service.deleteByUuid(uuid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_ROLE_FILTER]);
                toastSuccess("Função eliminada com sucesso");
            },
            onError: () => {
                toastError("Erro ao eliminar função");
            },
        }
    );
};
