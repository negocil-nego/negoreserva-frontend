import type { PaginateRequest } from "$lib/feature/shared/core/data/model";
import type { PermissionPaginate, PermissionResponse } from "$lib/feature/shared/permission/data/model";
import type { IOrgPermissionRepo } from "./permission.repo";

export class IOrgPermissionService {
    private repo: IOrgPermissionRepo;

    constructor(repo: IOrgPermissionRepo) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<PermissionPaginate> {
        return await this.repo.paginate(request);
    }

    async findAll(): Promise<PermissionResponse[]> {
        return await this.repo.findAll();
    }

}
