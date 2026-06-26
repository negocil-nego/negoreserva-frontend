import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_ROLE, FIND_BY_UUID_ROLE,
    SAVE_ROLE, UPDATE_ROLE, DELETE_BY_UUID_ROLE, GET_ROLE_PERMISSIONS
} from "../queries/role";
import type { IOrgRoleRepo, OrgRoleSaveRequest } from "../contract/role.repo";
import type { OrgRoleResponse, OrgRolePaginate, OrgRolePermissions } from "../model/role.model";

export class OrgRoleGqlRepo implements IOrgRoleRepo {

    async paginate(pageNumber: number, pageSize: number): Promise<OrgRolePaginate> {
        const { data } = await apolloClient.query<{ orgPaginateRole: OrgRolePaginate }>({
            query: PAGINATE_ROLE,
            variables: { paginateRequest: { pageNumber, pageSize } },
        });
        return data!.orgPaginateRole;
    }

    async findByUuid(uuid: string): Promise<OrgRoleResponse> {
        const { data } = await apolloClient.query<{ orgFindByUuidRole: OrgRoleResponse }>({
            query: FIND_BY_UUID_ROLE, variables: { uuid }
        });
        return data!.orgFindByUuidRole;
    }

    async save(request: OrgRoleSaveRequest): Promise<OrgRoleResponse> {
        const { data } = await apolloClient.mutate<{ orgSaveRole: OrgRoleResponse }>({
            mutation: SAVE_ROLE,
            variables: { roleRequest: request }
        });
        return data!.orgSaveRole;
    }

    async update(uuid: string, request: OrgRoleSaveRequest): Promise<OrgRoleResponse> {
        const { data } = await apolloClient.mutate<{ orgUpdateRole: OrgRoleResponse }>({
            mutation: UPDATE_ROLE,
            variables: { uuid, roleRequest: request }
        });
        return data!.orgUpdateRole;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgDeleteByUuidRole: boolean }>({
            mutation: DELETE_BY_UUID_ROLE, variables: { uuid }
        });
        return data!.orgDeleteByUuidRole;
    }

    async getRolePermissions(roleUuid: string): Promise<OrgRolePermissions> {
        const { data } = await apolloClient.query<{ orgGetRolePermissions: OrgRolePermissions }>({
            query: GET_ROLE_PERMISSIONS, variables: { roleUuid }
        });
        return data!.orgGetRolePermissions;
    }
}
