import type { CategoryFilterQueryParamInput, CategoryPaginate, PaginateRequest } from "$lib/feature/shared/category/model/category.model"

export interface ICategoryRepo {
    paginate(request: PaginateRequest): Promise<CategoryPaginate>
    paginateCategoryFilter(filter: CategoryFilterQueryParamInput): Promise<CategoryPaginate>
}
