import type { ICategoryManage } from "../contract/category.service";
import { useQuery } from "@sveltestack/svelte-query";
import { CATEGORY_FILTER_PUB } from "./keys";
import type { CategoryFilterQueryParamInput } from "$lib/feature/shared/category/model/category.model";

interface CategoryFilterPaginateProps {
    service: ICategoryManage;
    filter: CategoryFilterQueryParamInput;
}

export const usePubGetCategoryFilterPaginate = ({
    service,
    filter
}: CategoryFilterPaginateProps) => {
    return useQuery(
        [CATEGORY_FILTER_PUB, filter],
        () => service.paginateCategoryFilter(filter),
    );
};