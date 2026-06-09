import type { IOrgCatalogRepo, PaginateRequest, CatalogFilterQueryParamInput, CatalogUpdateRequest, CatalogProductOrderInput } from "./catalog.repo";
import type { OrgCatalogResponse, OrgCatalogPaginate } from "../model/catalog.model";
import type { OrgProductPaginate } from "$lib/feature/org/product/data/model/product.model";

export class IOrgCatalogService {
    private repo: IOrgCatalogRepo;
    constructor(repo: IOrgCatalogRepo) { this.repo = repo; }

    async paginate(request: PaginateRequest): Promise<OrgCatalogPaginate> {
        return await this.repo.paginate(request);
    }
    async paginateCatalogFilter(filter: CatalogFilterQueryParamInput): Promise<OrgCatalogPaginate> {
        return await this.repo.paginateCatalogFilter(filter);
    }
    async findByUuid(uuid: string): Promise<OrgCatalogResponse> {
        return await this.repo.findByUuid(uuid);
    }
    async findByUuidOrSlug(uuidOrSlug: string): Promise<OrgCatalogResponse> {
        return await this.repo.findByUuidOrSlug(uuidOrSlug);
    }
    async update(uuid: string, request: CatalogUpdateRequest): Promise<OrgCatalogResponse> {
        return await this.repo.update(uuid, request);
    }
    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
    async paginateCatalogProducts(uuidOrSlug: string, request: PaginateRequest): Promise<OrgProductPaginate> {
        return await this.repo.paginateCatalogProducts(uuidOrSlug, request);
    }
    async paginateCatalogProductsNotIn(uuidOrSlug: string, request: PaginateRequest): Promise<OrgProductPaginate> {
        return await this.repo.paginateCatalogProductsNotIn(uuidOrSlug, request);
    }
    async addProductsToCatalog(uuidOrSlug: string, products: CatalogProductOrderInput[]): Promise<boolean> {
        return await this.repo.addProductsToCatalog(uuidOrSlug, products);
    }
    async removeProductsFromCatalog(uuidOrSlug: string, productUuids: string[]): Promise<boolean> {
        return await this.repo.removeProductsFromCatalog(uuidOrSlug, productUuids);
    }
}
