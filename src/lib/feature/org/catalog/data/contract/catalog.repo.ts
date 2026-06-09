import type { OrgCatalogResponse, OrgCatalogPaginate } from "../model/catalog.model";
import type { OrgProductResponse, OrgProductPaginate } from "$lib/feature/org/product/data/model/product.model";

export interface IOrgCatalogRepo {
    paginate(request: PaginateRequest): Promise<OrgCatalogPaginate>
    paginateCatalogFilter(filter: CatalogFilterQueryParamInput): Promise<OrgCatalogPaginate>
    findByUuid(uuid: string): Promise<OrgCatalogResponse>
    findByUuidOrSlug(uuidOrSlug: string): Promise<OrgCatalogResponse>
    update(uuid: string, request: CatalogUpdateRequest): Promise<OrgCatalogResponse>
    deleteByUuid(uuid: string): Promise<boolean>
    paginateCatalogProducts(uuidOrSlug: string, request: PaginateRequest): Promise<OrgProductPaginate>
    paginateCatalogProductsNotIn(uuidOrSlug: string, request: PaginateRequest): Promise<OrgProductPaginate>
    addProductsToCatalog(uuidOrSlug: string, products: CatalogProductOrderInput[]): Promise<boolean>
    removeProductsFromCatalog(uuidOrSlug: string, productUuids: string[]): Promise<boolean>
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export interface CatalogFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface CatalogUpdateRequest {
    name: string;
    description: string;
    type?: "NONE" | "DRIK" | "FOOD" | null;
}

export interface CatalogProductOrderInput {
    productUuid: string;
    order: number;
}
