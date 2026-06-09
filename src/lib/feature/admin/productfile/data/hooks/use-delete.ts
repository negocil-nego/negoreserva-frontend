import type { IProductFileService } from "../contract/productfile.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { PRODUCTFILE_FINDALL } from "./keys";

interface DeleteProductFileProps {
    service: IProductFileService;
}

interface DeleteProductFileInput {
    uuid: string;
}

export const useDeleteProductFile = ({ service }: DeleteProductFileProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: DeleteProductFileInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PRODUCTFILE_FINDALL]);
                toastSuccess("Arquivo de produto deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar arquivo de produto");
            }
        }
    );
};