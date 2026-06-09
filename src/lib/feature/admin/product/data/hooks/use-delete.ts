import type { IProductService } from "../contract/product.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { PRODUCT_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface DeleteProductProps {
    service: IProductService;
}

interface DeleteProductInput {
    uuid: string;
}

export const useDeleteProduct = ({ service }: DeleteProductProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeleteProductInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PRODUCT_FILTER]);
                toastSuccess("Produto deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar produto");
            }
        }
    );
};