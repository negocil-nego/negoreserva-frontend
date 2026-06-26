import type { OrgRoleResponse, OrgRolePaginate, OrgRolePermissions } from "../model/role.model";

export interface IOrgRoleRepo {
    paginate(pageNumber: number, pageSize: number): Promise<OrgRolePaginate>;
    findByUuid(uuid: string): Promise<OrgRoleResponse>;
    save(request: OrgRoleSaveRequest): Promise<OrgRoleResponse>;
    update(uuid: string, request: OrgRoleSaveRequest): Promise<OrgRoleResponse>;
    deleteByUuid(uuid: string): Promise<boolean>;
    getRolePermissions(roleUuid: string): Promise<OrgRolePermissions>;
}

export interface OrgRoleSaveRequest {
    name: string;
    permissionUuids?: string[];
}