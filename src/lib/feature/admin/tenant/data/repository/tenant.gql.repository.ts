import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_TENANT,
    PAGINATE_TENANT_FILTER,
    FIND_BY_UUID_TENANT,
    FIND_BY_CODE_TENANT,
    SAVE_TENANT,
    UPDATE_TENANT,
    DELETE_BY_UUID_TENANT
} from "../queries/tenant";
import type { ITenantRepository } from "../contract/tenant.repository";
import type {
    TenantResponse,
    TenantPaginate,
    TenantCreateRequest,
    TenantUpdateRequest,
    TenantFilterQueryParamInput,
    PaginateRequest
} from "../model/tenant.model";

export class TenantGqlRepository implements ITenantRepository {

    async paginate(request: PaginateRequest): Promise<TenantPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateTenant: TenantPaginate }>({
            query: PAGINATE_TENANT,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginateTenant;
    }

    async paginateTenantFilter(filter: TenantFilterQueryParamInput): Promise<TenantPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateTenantFilter: TenantPaginate }>({
            query: PAGINATE_TENANT_FILTER,
            variables: { filter }
        });
        return data!.adminPaginateTenantFilter;
    }

    async findByUuid(uuid: string): Promise<TenantResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidTenant: TenantResponse }>({
            query: FIND_BY_UUID_TENANT,
            variables: { uuid }
        });
        return data!.adminFindByUuidTenant;
    }

    async findByCode(code: string): Promise<TenantResponse> {
        const { data } = await apolloClient.query<{ adminFindByCodeTenant: TenantResponse }>({
            query: FIND_BY_CODE_TENANT,
            variables: { code }
        });
        return data!.adminFindByCodeTenant;
    }

    async save(request: TenantCreateRequest): Promise<TenantResponse> {
        const { data } = await apolloClient.mutate<{ adminSaveTenant: TenantResponse }>({
            mutation: SAVE_TENANT,
            variables: { tenantCreateRequest: request }
        });
        return data!.adminSaveTenant;
    }

    async update(uuid: string, request: TenantUpdateRequest): Promise<TenantResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdateTenant: TenantResponse }>({
            mutation: UPDATE_TENANT,
            variables: { uuid, tenantUpdateRequest: request }
        });
        return data!.adminUpdateTenant;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidTenant: boolean }>({
            mutation: DELETE_BY_UUID_TENANT,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidTenant;
    }
}