import type { IOrgProductService } from "../contract/product.service";
import type { ProductRequest } from "../model/product.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_PRODUCT_FILTER } from "./keys";

interface SaveProductProps {
    service: IOrgProductService;
}

export const useOrgSaveProduct = ({
    service,
}: SaveProductProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: ProductRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PRODUCT_FILTER]);
                toastSuccess("Produto salvo com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar produto");
            }
        }
    );
};
