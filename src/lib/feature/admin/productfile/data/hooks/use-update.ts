import type { IProductFileService } from "../contract/productfile.service";
import type { ProductFileRequest } from "../model/productfile.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { PRODUCTFILE_FINDALL } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface UpdateProductFileProps {
    service: IProductFileService;
}

interface UpdateProductFileInput {
    uuid: string;
    request: ProductFileRequest;
}

export const useUpdateProductFile = ({ service }: UpdateProductFileProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: UpdateProductFileInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PRODUCTFILE_FINDALL]);
                toastSuccess("Arquivo de produto atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar arquivo de produto");
            }
        }
    );
};