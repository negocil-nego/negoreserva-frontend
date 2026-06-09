import type { ProductResponse } from "$lib/feature/admin/product/data/model/product.model";

export interface ProductFileResponse {
    uuid: string;
    title?: string | null;
    description?: string | null;
    url: string;
    type: string;
    isPrimary?: boolean;
    product: ProductResponse;
}

export interface ProductFilePaginate {
    content: ProductFileResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface ProductFileRequest {
    productUuid?: string | null;
    title?: string | null;
    description?: string | null;
    url: string;
    type: string;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const PRODUCTFILE_RESPONSE_EMPTY = {
    uuid: "",
    title: "",
    description: "",
    url: "",
    type: "",
    product: {
        uuid: "",
        name: "",
        price: 0,
        description: "",
        type: "",
        organization: {
            uuid: "",
            name: "",
            slug: "",
            email: "",
            description: "",
            phone: "",
            address: "",
        },
    },
}