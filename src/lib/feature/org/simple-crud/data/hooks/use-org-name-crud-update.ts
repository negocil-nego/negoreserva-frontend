import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { SimpleCrudService } from "../contract/simple-crud.service";
import type { NameCrudResource } from "../model/simple-crud";
import { ORG_NAME_CRUD_PAGINATE } from "./keys";

interface Props {
    service: SimpleCrudService;
}

export const useOrgNameCrudUpdate = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ resource, uuid, request }: { resource: NameCrudResource; uuid: string; request: { name: string; description?: string | null; permissionUuids?: string[] } }) =>
            service.update(resource, uuid, request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [ORG_NAME_CRUD_PAGINATE] });
                toastSuccess("Registo atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar registo");
            },
        }
    );
};
