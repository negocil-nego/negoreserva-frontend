import type { IAdminCategoryService } from "../contract/category.service";
import type { PaginateRequest } from "../../../../shared/category/model/category.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ADMIN_CATEGORY_FINDALL } from "./keys";

interface AdminCategoryPaginateProps {
    service: IAdminCategoryService;
    request: PaginateRequest;
}

export const useAdminGetCategoryPaginate = ({
    service,
    request
}: AdminCategoryPaginateProps) => {
    return useQuery(
        [ADMIN_CATEGORY_FINDALL, request],
        () => service.paginate(request),
    );
};