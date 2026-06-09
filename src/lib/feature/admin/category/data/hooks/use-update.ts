import type { IAdminCategoryService } from "../contract/category.service";
import type { CategoryRequest } from "../../../../shared/category/model/category.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_CATEGORY_FILTER } from "./keys";

interface AdminUpdateCategoryProps {
    service: IAdminCategoryService;
}

interface AdminUpdateCategoryInput {
    uuid: string;
    request: CategoryRequest;
}

export const useAdminUpdateCategory = ({ service }: AdminUpdateCategoryProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: AdminUpdateCategoryInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_CATEGORY_FILTER]);
                toastSuccess("Categoria atualizada com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar categoria");
            }
        }
    );
};