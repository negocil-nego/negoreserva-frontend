import type { IAdminCategoryRepository } from "./category.repository";
import type {
    CategoryResponse,
    CategoryPaginate,
    CategoryRequest,
    CategoryFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/category/model/category.model";

export class IAdminCategoryService {
    private repo: IAdminCategoryRepository;

    constructor(repo: IAdminCategoryRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<CategoryPaginate> {
        return await this.repo.paginate(request);
    }

    async paginateCategoryFilter(filter: CategoryFilterQueryParamInput): Promise<CategoryPaginate> {
        return await this.repo.paginateCategoryFilter(filter);
    }

    async findByUuid(uuid: string): Promise<CategoryResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async findByName(name: string): Promise<CategoryResponse> {
        return await this.repo.findByName(name);
    }

    async save(request: CategoryRequest): Promise<CategoryResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: CategoryRequest): Promise<CategoryResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}
