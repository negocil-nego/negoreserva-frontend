import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { SimpleCrudService } from "../contract/simple-crud.service";
import type { NameCrudResource } from "../model/simple-crud";
import { ORG_NAME_CRUD_PAGINATE } from "./keys";

interface Props {
    service: SimpleCrudService;
}

export const useOrgNameCrudDelete = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ resource, uuid }: { resource: NameCrudResource; uuid: string }) =>
            service.delete(resource, uuid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [ORG_NAME_CRUD_PAGINATE] });
                toastSuccess("Registo eliminado com sucesso");
            },
            onError: () => {
                toastError("Erro ao eliminar registo");
            },
        }
    );
};
