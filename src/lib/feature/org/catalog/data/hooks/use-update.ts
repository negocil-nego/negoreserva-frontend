import type { IOrgCatalogService } from "../contract/catalog.service";
import type { CatalogUpdateRequest } from "../contract/catalog.repo";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_CATALOG_FILTER } from "./keys";

interface UpdateCatalogProps {
    service: IOrgCatalogService;
}

interface UpdateCatalogInput {
    uuid: string;
    request: CatalogUpdateRequest;
}

export const useOrgUpdateCatalog = ({ service }: UpdateCatalogProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: UpdateCatalogInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_CATALOG_FILTER]);
                toastSuccess("Catálogo atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar catálogo");
            }
        }
    );
};
