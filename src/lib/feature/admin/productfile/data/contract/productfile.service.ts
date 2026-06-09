import type { IProductFileRepository } from "./productfile.repository";
import type {
    ProductFileResponse,
    ProductFilePaginate,
    ProductFileRequest,
    PaginateRequest
} from "../model/productfile.model";

export class IProductFileService {
    private repo: IProductFileRepository;

    constructor(repo: IProductFileRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<ProductFilePaginate> {
        return await this.repo.paginate(request);
    }

    async findByUuid(uuid: string): Promise<ProductFileResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async save(request: ProductFileRequest): Promise<ProductFileResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: ProductFileRequest): Promise<ProductFileResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}