import type { IOrgProductRepo } from "./product.repo";
import type {
    OrgProductResponse,
    OrgProductPaginate,
    ProductRequest,
    ProductFilterQueryParamInput,
    PaginateRequest
} from "../model/product.model";

export class IOrgProductService {
    private repo: IOrgProductRepo;

    constructor(repo: IOrgProductRepo) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<OrgProductPaginate> {
        return await this.repo.paginate(request);
    }

    async paginateProductFilter(filter: ProductFilterQueryParamInput): Promise<OrgProductPaginate> {
        return await this.repo.paginateProductFilter(filter);
    }

    async findByUuid(uuid: string): Promise<OrgProductResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async save(request: ProductRequest): Promise<OrgProductResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: ProductRequest): Promise<OrgProductResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}
