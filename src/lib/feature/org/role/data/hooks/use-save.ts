import type { IOrgRoleService } from "../contract/role.service";
import type { OrgRoleSaveRequest } from "../contract/role.repo";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_ROLE_FILTER } from "./keys";

interface SaveRoleProps {
    service: IOrgRoleService;
}

export const useOrgSaveRole = ({ service }: SaveRoleProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: OrgRoleSaveRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_ROLE_FILTER]);
                toastSuccess("Função criada com sucesso");
            },
            onError: () => {
                toastError("Erro ao criar função");
            },
        }
    );
};
