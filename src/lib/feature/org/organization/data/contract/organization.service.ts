import type { OrgOrganizationEditProfileRequest } from "$lib/feature/admin/organization/data/model/organization.model";
import type { OrganizationResponse } from "$lib/feature/pub/organization";
import type { OrgOrganizationProfile, OrganizationSocialMediaEditRequest, OrganizationAddressEditRequest } from "../model/organization";
import type { IOrgOrganizationRepo } from "./organization.repo";

export class IOrgOrganizationService {
    private repo: IOrgOrganizationRepo;

    constructor(repo: IOrgOrganizationRepo) {
        this.repo = repo;
    }

    async orgProfileOrganization(): Promise<OrgOrganizationProfile> {
        return await this.repo.orgProfileOrganization();
    }

    async orOrganizationUpdate(request: OrgOrganizationEditProfileRequest): Promise<OrganizationResponse> {
        return await this.repo.orOrganizationUpdate(request);
    }

    async orOrganizationUpdateSocialMedia(request: OrganizationSocialMediaEditRequest): Promise<OrganizationResponse> {
        return await this.repo.orOrganizationUpdateSocialMedia(request);
    }

    async orOrganizationUpdateAddress(request: OrganizationAddressEditRequest): Promise<OrganizationResponse> {
        return await this.repo.orOrganizationUpdateAddress(request);
    }

    async orOrganizationUpdateLogo(file: File): Promise<OrganizationResponse> {
        return await this.repo.orOrganizationUpdateLogo(file);
    }

    async orOrganizationUpdateImage(file: File): Promise<OrganizationResponse> {
        return await this.repo.orOrganizationUpdateImage(file);
    }

    async orOrganizationUpdateVideo(file: File): Promise<OrganizationResponse> {
        return await this.repo.orOrganizationUpdateVideo(file);
    }
}