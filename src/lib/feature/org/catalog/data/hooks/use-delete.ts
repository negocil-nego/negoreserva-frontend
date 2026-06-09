import type { IOrgCatalogService } from "../contract/catalog.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ORG_CATALOG_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface DeleteCatalogProps {
    service: IOrgCatalogService;
}

interface DeleteCatalogInput {
    uuid: string;
}

export const useOrgDeleteCatalog = ({ service }: DeleteCatalogProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeleteCatalogInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_CATALOG_FILTER]);
                toastSuccess("Catálogo deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar catálogo");
            }
        }
    );
};
