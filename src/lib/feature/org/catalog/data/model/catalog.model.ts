export interface OrgCatalogResponse {
    uuid: string;
    name: string;
    description: string;
    imgUrl?: string | null;
    slug: string;
    type: "NONE" | "DRIK" | "FOOD";
}

export interface OrgCatalogPaginate {
    content: OrgCatalogResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export const ORG_CATALOG_RESPONSE_EMPTY: OrgCatalogResponse = {
    uuid: "",
    name: "",
    description: "",
    slug: "",
    type: "NONE",
};
