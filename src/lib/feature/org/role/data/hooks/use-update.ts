import type { IOrgRoleService } from "../contract/role.service";
import type { OrgRoleSaveRequest } from "../contract/role.repo";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_ROLE_FILTER } from "./keys";

interface UpdateRoleProps {
    service: IOrgRoleService;
}

interface UpdateRoleInput {
    uuid: string;
    request: OrgRoleSaveRequest;
}

export const useOrgUpdateRole = ({ service }: UpdateRoleProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: UpdateRoleInput) => service.update(uuid, request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_ROLE_FILTER]);
                toastSuccess("Função atualizada com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar função");
            },
        }
    );
};
