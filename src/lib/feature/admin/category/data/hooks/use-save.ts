import type { IAdminCategoryService } from "../contract/category.service";
import type { CategoryRequest } from "../../../../shared/category/model/category.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_CATEGORY_FILTER } from "./keys";

interface AdminSaveCategoryProps {
    service: IAdminCategoryService;
}

export const useAdminSaveCategory = ({
    service,
}: AdminSaveCategoryProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: CategoryRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_CATEGORY_FILTER]);
                toastSuccess("Categoria salva com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar categoria");
            }
        }
    );
};