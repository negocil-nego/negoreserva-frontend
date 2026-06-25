import type { PaginateRequest } from "$lib/feature/shared/core/data/model";
import type { PermissionPaginate, PermissionResponse } from "$lib/feature/shared/permission/data/model";

export interface IOrgPermissionRepo {
    paginate(request: PaginateRequest): Promise<PermissionPaginate>;
    findAll(): Promise<PermissionResponse[]>;
}