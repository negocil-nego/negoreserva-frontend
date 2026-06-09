import type { CategoryFilterQueryParamInput, CategoryPaginate, PaginateRequest } from "$lib/feature/shared/category/model/category.model";
import type { ICategoryRepo } from "./category.repository";

export class ICategoryManage {
    private repo: ICategoryRepo;

    constructor(repo: ICategoryRepo) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<CategoryPaginate> {
        return await this.repo.paginate(request);
    }

    async paginateCategoryFilter(filter: CategoryFilterQueryParamInput): Promise<CategoryPaginate> {
        return await this.repo.paginateCategoryFilter(filter);
    }
}
