import type { IProductService } from "../contract/product.service";
import type { ProductRequest } from "../model/product.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { PRODUCT_FILTER } from "./keys";

interface SaveProductProps {
    service: IProductService;
}

export const useSaveProduct = ({
    service,
}: SaveProductProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: ProductRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PRODUCT_FILTER]);
                toastSuccess("Produto salvo com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar produto");
            }
        }
    );
};