import type { IOrgProductService } from "../contract/product.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ORG_PRODUCT_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface DeleteProductProps {
    service: IOrgProductService;
}

interface DeleteProductInput {
    uuid: string;
}

export const useOrgDeleteProduct = ({ service }: DeleteProductProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeleteProductInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PRODUCT_FILTER]);
                toastSuccess("Produto deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar produto");
            }
        }
    );
};
