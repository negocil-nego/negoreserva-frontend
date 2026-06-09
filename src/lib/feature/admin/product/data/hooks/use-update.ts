import type { IProductService } from "../contract/product.service";
import type { ProductRequest } from "../model/product.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { PRODUCT_FILTER } from "./keys";

interface UpdateProductProps {
    service: IProductService;
}

interface UpdateProductInput {
    uuid: string;
    request: ProductRequest;
}

export const useUpdateProduct = ({ service }: UpdateProductProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: UpdateProductInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PRODUCT_FILTER]);
                toastSuccess("Produto atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar produto");
            }
        }
    );
};