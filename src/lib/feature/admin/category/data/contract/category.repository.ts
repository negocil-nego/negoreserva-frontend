import type {
    CategoryResponse,
    CategoryPaginate,
    CategoryRequest,
    CategoryFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/category/model/category.model";

export interface IAdminCategoryRepository {
    paginate(request: PaginateRequest): Promise<CategoryPaginate>
    paginateCategoryFilter(filter: CategoryFilterQueryParamInput): Promise<CategoryPaginate>
    findByUuid(uuid: string): Promise<CategoryResponse>
    findByName(name: string): Promise<CategoryResponse>
    save(request: CategoryRequest): Promise<CategoryResponse>
    update(uuid: string, request: CategoryRequest): Promise<CategoryResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}
