import type { IProductFileService } from "../contract/productfile.service";
import type { ProductFileRequest } from "../model/productfile.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { PRODUCTFILE_FINDALL } from "./keys";

interface SaveProductFileProps {
    service: IProductFileService;
}

export const useSaveProductFile = ({
    service,
}: SaveProductFileProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: ProductFileRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PRODUCTFILE_FINDALL]);
                toastSuccess("Arquivo de produto salvo com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar arquivo de produto");
            }
        }
    );
};