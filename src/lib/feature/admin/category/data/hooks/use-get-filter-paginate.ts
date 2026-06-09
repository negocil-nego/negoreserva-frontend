import type { IAdminCategoryService } from "../contract/category.service";
import type { CategoryFilterQueryParamInput } from "../../../../shared/category/model/category.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ADMIN_CATEGORY_FILTER } from "./keys";

interface AdminCategoryFilterPaginateProps {
    service: IAdminCategoryService;
    filter: CategoryFilterQueryParamInput;
}

export const useAdminGetCategoryFilterPaginate = ({
    service,
    filter
}: AdminCategoryFilterPaginateProps) => {
    return useQuery(
        [ADMIN_CATEGORY_FILTER, filter],
        () => service.paginateCategoryFilter(filter),
    );
};