import type { OrgOrganizationEditProfileRequest } from "$lib/feature/admin/organization/data/model/organization.model";
import type { OrganizationResponse } from "$lib/feature/pub/organization";
import type { OrgOrganizationProfile, OrganizationSocialMediaEditRequest, OrganizationAddressEditRequest } from "../model/organization";

export interface IOrgOrganizationRepo {
    orgProfileOrganization(): Promise<OrgOrganizationProfile>
    orOrganizationUpdate(request: OrgOrganizationEditProfileRequest): Promise<OrganizationResponse>
    orOrganizationUpdateSocialMedia(request: OrganizationSocialMediaEditRequest): Promise<OrganizationResponse>
    orOrganizationUpdateAddress(request: OrganizationAddressEditRequest): Promise<OrganizationResponse>
    orOrganizationUpdateLogo(file: File): Promise<OrganizationResponse>
    orOrganizationUpdateImage(file: File): Promise<OrganizationResponse>
    orOrganizationUpdateVideo(file: File): Promise<OrganizationResponse>
}