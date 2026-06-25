import type { OrgRoleResponse, OrgRolePaginate } from "../model/role.model";

export interface IOrgRoleRepo {
    paginate(pageNumber: number, pageSize: number): Promise<OrgRolePaginate>;
    findByUuid(uuid: string): Promise<OrgRoleResponse>;
    save(request: OrgRoleSaveRequest): Promise<OrgRoleResponse>;
    update(uuid: string, request: OrgRoleSaveRequest): Promise<OrgRoleResponse>;
    deleteByUuid(uuid: string): Promise<boolean>;
}

export interface OrgRoleSaveRequest {
    name: string;
    permissionUuids?: string[];
}