import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_PERMISSION, FIND_BY_UUID_PERMISSION,
    SAVE_PERMISSION, UPDATE_PERMISSION, DELETE_BY_UUID_PERMISSION
} from "../queries/permission";
import type { IAdminPermissionRepo, AdminPermissionSaveRequest } from "../contract/permission.repo";
import type { AdminPermissionResponse, AdminPermissionPaginate } from "../model/permission.model";

export class AdminPermissionGqlRepo implements IAdminPermissionRepo {

    async paginate(pageNumber: number, pageSize: number): Promise<AdminPermissionPaginate> {
        const { data } = await apolloClient.query<{ adminPaginatePermission: AdminPermissionPaginate }>({
            query: PAGINATE_PERMISSION,
            variables: { paginateRequest: { pageNumber, pageSize } },
        });
        return data!.adminPaginatePermission;
    }

    async findByUuid(uuid: string): Promise<AdminPermissionResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidPermission: AdminPermissionResponse }>({
            query: FIND_BY_UUID_PERMISSION, variables: { uuid }
        });
        return data!.adminFindByUuidPermission;
    }

    async save(request: AdminPermissionSaveRequest): Promise<AdminPermissionResponse> {
        const { data } = await apolloClient.mutate<{ adminSavePermission: AdminPermissionResponse }>({
            mutation: SAVE_PERMISSION,
            variables: { permissionRequest: request }
        });
        return data!.adminSavePermission;
    }

    async update(uuid: string, request: AdminPermissionSaveRequest): Promise<AdminPermissionResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdatePermission: AdminPermissionResponse }>({
            mutation: UPDATE_PERMISSION,
            variables: { uuid, permissionRequest: request }
        });
        return data!.adminUpdatePermission;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidPermission: boolean }>({
            mutation: DELETE_BY_UUID_PERMISSION, variables: { uuid }
        });
        return data!.adminDeleteByUuidPermission;
    }
}
