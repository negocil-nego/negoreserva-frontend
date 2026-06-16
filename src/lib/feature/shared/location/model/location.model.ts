export interface ProvinceResponse {
    uuid: string;
    value: string;
    label: string;
}

export interface ProvincePaginate {
    content: ProvinceResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface ProvinceRequest {
    value: string;
    label: string;
}

export interface ProvinceFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface MunicipalityResponse {
    uuid: string;
    value: string;
    label: string;
    provinceUuid: string;
    provinceValue: string;
    provinceLabel: string;
}

export interface MunicipalityPaginate {
    content: MunicipalityResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface MunicipalityRequest {
    value: string;
    label: string;
    provinceId: number;
}

export interface MunicipalityFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
    provinceId?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const PROVINCE_RESPONSE_EMPTY = {
    uuid: "",
    value: "",
    label: "",
};

export const MUNICIPALITY_RESPONSE_EMPTY = {
    uuid: "",
    value: "",
    label: "",
    provinceUuid: "",
    provinceValue: "",
    provinceLabel: "",
};
