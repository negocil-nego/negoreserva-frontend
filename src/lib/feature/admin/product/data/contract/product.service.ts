import type { IProductRepository } from "./product.repository";
import type {
    ProductResponse,
    ProductPaginate,
    ProductRequest,
    ProductFilterQueryParamInput,
    PaginateRequest
} from "../model/product.model";

export class IProductService {
    private repo: IProductRepository;

    constructor(repo: IProductRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<ProductPaginate> {
        return await this.repo.paginate(request);
    }

    async paginateProductFilter(filter: ProductFilterQueryParamInput): Promise<ProductPaginate> {
        return await this.repo.paginateProductFilter(filter);
    }

    async findByUuid(uuid: string): Promise<ProductResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async findByName(name: string): Promise<ProductResponse> {
        return await this.repo.findByName(name);
    }

    async save(request: ProductRequest): Promise<ProductResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: ProductRequest): Promise<ProductResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}