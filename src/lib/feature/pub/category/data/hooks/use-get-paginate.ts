import type { ICategoryManage } from "../contract/category.service";
import type { PaginateRequest } from "$lib/feature/shared/category/model/category.model";
import { useQuery } from "@sveltestack/svelte-query";
import { CATEGORY_FINDALL_PUB } from "./keys";

interface CategoryPaginateProps {
    service: ICategoryManage;
    request: PaginateRequest;
}

export const useGetCategoryPaginate = ({
    service,
    request
}: CategoryPaginateProps) => {
    return useQuery(
        [CATEGORY_FINDALL_PUB, request],
        () => service.paginate(request),
    );
};