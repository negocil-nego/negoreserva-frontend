import type { OrganizationResponse } from "$lib/feature/pub/organization";

export enum UpdateDataFielEnum {
    EMAIL = "EMAIL",
    PHONE = "PHONE",
}

export enum UpdateDataTypeEnum {
    USER = "USER",
    ORGANIZATION = "ORGANIZATION",
}

export interface OrgUserResponse {
    uuid: string
    username: string
    name: string
    email: string
    phone: string
}

export interface UpdateDataResponse {
    id: string
    field: string
    type: string
    expiredAt: string
}

export interface AddressResponse {
    uuid: string
    country: string
    state: string
    city: string
    neighborhood?: string | null
    street: string
    number?: string | null
    zipCode?: string | null
    complement?: string | null
    latitude?: number | null
    longitude?: number | null
}

export interface OrganizationSocialMediaDetailResponse {
    uuid: string
    facebook: string
    instagram: string
    youtube: string
    tiKtok: string
    linkedin: string
}

export interface OrganizationSocialMediaEditRequest {
    facebook?: string
    instagram?: string
    youtube?: string
    tiktok?: string
    linkedin?: string
}

export interface OrganizationAddressEditRequest {
    address: string
}

export interface OrgOrganizationProfile {
    user: OrgUserResponse
    organization: OrganizationResponse
    updateDataResponse: UpdateDataResponse[]
    addresses: AddressResponse[]
    socialMedia: OrganizationSocialMediaDetailResponse | null
}