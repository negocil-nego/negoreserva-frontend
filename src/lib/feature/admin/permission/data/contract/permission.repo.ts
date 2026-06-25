import type { PermissionPaginate, PermissionResponse, PermissionSaveRequest } from "$lib/feature/shared/permission/data/model";

export interface IAdminPermissionRepo {
    update(uuid: string, request: PermissionSaveRequest): Promise<PermissionResponse>;
    paginate(pageNumber: number, pageSize: number): Promise<PermissionPaginate>;
    save(request: PermissionSaveRequest): Promise<PermissionResponse>;
    findByUuid(uuid: string): Promise<PermissionResponse>;
    deleteByUuid(uuid: string): Promise<boolean>;
}
