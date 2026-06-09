import type { OrgOrganizationEditProfileRequest } from "$lib/feature/admin/organization/data/model/organization.model";
import type { OrganizationResponse } from "$lib/feature/pub/organization";
import { apolloClient } from "$lib/providers/graphql.provider";
import type { IOrgOrganizationRepo } from "../contract/organization.repo";
import type { OrgOrganizationProfile, OrganizationSocialMediaEditRequest, OrganizationAddressEditRequest } from "../model/organization";
import { GET_ORGANIZATION, ORG_ORGANIZATION_UPDATE, ORG_ORGANIZATION_UPDATE_SOCIAL_MEDIA, ORG_ORGANIZATION_UPDATE_ADDRESS } from "../queries/organization";
import { useUpdateImageOrganization } from "../usecase/useUpdateImageOrganization";
import { useUpdateLogoOrganization } from "../usecase/useUpdateLogoOrganization";
import { useUpdateVideoOrganization } from "../usecase/useUpdateVideoOrganization";

export class OrgOrganizationGqlRepo implements IOrgOrganizationRepo {

    async orgProfileOrganization(): Promise<OrgOrganizationProfile> {
        const { data } = await apolloClient.query<{ orgProfileOrganization: OrgOrganizationProfile }>({
            query: GET_ORGANIZATION,
        });
        return data!.orgProfileOrganization;
    }

    async orOrganizationUpdate(request: OrgOrganizationEditProfileRequest): Promise<OrganizationResponse> {
        const { data } = await apolloClient.mutate<{ orgOrganizationUpdate: OrganizationResponse }>({
            mutation: ORG_ORGANIZATION_UPDATE,
            variables: { request },
        });
        return data!.orgOrganizationUpdate;
    }

    async orOrganizationUpdateSocialMedia(request: OrganizationSocialMediaEditRequest): Promise<OrganizationResponse> {
        const { data } = await apolloClient.mutate<{ orgOrganizationUpdateSocialMedia: OrganizationResponse }>({
            mutation: ORG_ORGANIZATION_UPDATE_SOCIAL_MEDIA,
            variables: { request },
        });
        return data!.orgOrganizationUpdateSocialMedia;
    }

    async orOrganizationUpdateAddress(request: OrganizationAddressEditRequest): Promise<OrganizationResponse> {
        const { data } = await apolloClient.mutate<{ orgOrganizationUpdateAddress: OrganizationResponse }>({
            mutation: ORG_ORGANIZATION_UPDATE_ADDRESS,
            variables: { request },
        });
        return data!.orgOrganizationUpdateAddress;
    }

    async orOrganizationUpdateLogo(file: File): Promise<OrganizationResponse> {
        return await useUpdateLogoOrganization(file);
    }

    async orOrganizationUpdateImage(file: File): Promise<OrganizationResponse> {
        return await useUpdateImageOrganization(file);
    }

    async orOrganizationUpdateVideo(file: File): Promise<OrganizationResponse> {
        return await useUpdateVideoOrganization(file);
    }
}