import type { IAdminCategoryService } from "../contract/category.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ADMIN_CATEGORY_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface AdminDeleteCategoryProps {
    service: IAdminCategoryService;
}

interface AdminDeleteCategoryInput {
    uuid: string;
}

export const useAdminDeleteCategory = ({ service }: AdminDeleteCategoryProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: AdminDeleteCategoryInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_CATEGORY_FILTER]);
                toastSuccess("Categoria deletada com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar categoria");
            }
        }
    );
};