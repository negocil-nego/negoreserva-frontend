import { apolloClient } from "$lib/providers/graphql.provider";
import type { CategoryFilterQueryParamInput, CategoryPaginate, PaginateRequest } from "$lib/feature/shared/category/model/category.model";
import type { ICategoryRepo } from "../contract/category.repository";
import { PAGINATE_CATEGORY, PAGINATE_CATEGORY_FILTER } from "../queries/category";


export class CategoryGqlRepo implements ICategoryRepo {

    async paginate(request: PaginateRequest): Promise<CategoryPaginate> {
        const { data } = await apolloClient.query<{ pubPaginateCategory: CategoryPaginate }>({
            query: PAGINATE_CATEGORY,
            variables: { paginateRequest: request }
        });
        return data!.pubPaginateCategory;
    }

    async paginateCategoryFilter(filter: CategoryFilterQueryParamInput): Promise<CategoryPaginate> {
        const { data } = await apolloClient.query<{ pubPaginateCategoryFilter: CategoryPaginate }>({
            query: PAGINATE_CATEGORY_FILTER,
            variables: { filter }
        });
        return data!.pubPaginateCategoryFilter;
    }
}
