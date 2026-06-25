import type { OrgOrganizationEditProfileRequest } from "$lib/feature/admin/organization/data/model/organization.model";
import type { OrganizationResponse } from "$lib/feature/pub/organization";
import type { OrgOrganizationProfile, OrganizationSocialMediaEditRequest, OrganizationAddressEditRequest, AddressUpsertRequest, AddressResponse } from "../model/organization";

export interface IOrgOrganizationRepo {
    orgProfileOrganization(): Promise<OrgOrganizationProfile>
    orOrganizationUpdate(request: OrgOrganizationEditProfileRequest): Promise<OrganizationResponse>
    orOrganizationUpdateSocialMedia(request: OrganizationSocialMediaEditRequest): Promise<OrganizationResponse>
    orOrganizationUpdateAddress(request: OrganizationAddressEditRequest): Promise<OrganizationResponse>
    orOrganizationUpsertAddress(request: AddressUpsertRequest): Promise<AddressResponse>
    orOrganizationSetDefaultAddress(addressUuid: string): Promise<AddressResponse>
    orOrganizationRemoveAddress(addressUuid: string): Promise<OrganizationResponse>
    orOrganizationUpdateLogo(file: File): Promise<OrganizationResponse>
    orOrganizationUpdateImage(file: File): Promise<OrganizationResponse>
    orOrganizationUpdateVideo(file: File): Promise<OrganizationResponse>
}