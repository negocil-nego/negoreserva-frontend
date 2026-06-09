import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_ORGANIZATION,
    PAGINATE_ORGANIZATION_FILTER,
    FIND_BY_UUID_ORGANIZATION,
    FIND_BY_NAME_ORGANIZATION,
    SAVE_ORGANIZATION,
    UPDATE_ORGANIZATION,
    DELETE_BY_UUID_ORGANIZATION
} from "$lib/feature/admin/organization/data/queries/organization";
import type { IAdminOrganizationRepo } from "../contract/organization.repository";
import type {
    OrganizationResponse,
    OrganizationPaginate,
    OrganizationRequest,
    OrganizationFilterQueryParamInput,
    PaginateRequest
} from "../model/organization.model";

export class AdminOrganizationGqlRepo implements IAdminOrganizationRepo {

    async paginate(request: PaginateRequest): Promise<OrganizationPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateOrganization: OrganizationPaginate }>({
            query: PAGINATE_ORGANIZATION,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginateOrganization;
    }

    async paginateOrganizationFilter(filter: OrganizationFilterQueryParamInput): Promise<OrganizationPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateOrganizationFilter: OrganizationPaginate }>({
            query: PAGINATE_ORGANIZATION_FILTER,
            variables: { filter }
        });
        return data!.adminPaginateOrganizationFilter;
    }

    async findByUuid(uuid: string): Promise<OrganizationResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidOrganization: OrganizationResponse }>({
            query: FIND_BY_UUID_ORGANIZATION,
            variables: { uuid }
        });
        return data!.adminFindByUuidOrganization;
    }

    async findByName(name: string): Promise<OrganizationResponse> {
        const { data } = await apolloClient.query<{ adminFindByNameOrganization: OrganizationResponse }>({
            query: FIND_BY_NAME_ORGANIZATION,
            variables: { name }
        });
        return data!.adminFindByNameOrganization;
    }

    async save(request: OrganizationRequest): Promise<OrganizationResponse> {
        const { data } = await apolloClient.mutate<{ adminSaveOrganization: OrganizationResponse }>({
            mutation: SAVE_ORGANIZATION,
            variables: { organizationRequest: request }
        });
        return data!.adminSaveOrganization;
    }

    async update(uuid: string, request: OrganizationRequest): Promise<OrganizationResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdateOrganization: OrganizationResponse }>({
            mutation: UPDATE_ORGANIZATION,
            variables: { uuid, organizationRequest: request }
        });
        return data!.adminUpdateOrganization;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidOrganization: boolean }>({
            mutation: DELETE_BY_UUID_ORGANIZATION,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidOrganization;
    }
}