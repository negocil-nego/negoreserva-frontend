import type { IAdminPermissionRepo, AdminPermissionSaveRequest } from "./permission.repo";
import type { AdminPermissionResponse, AdminPermissionPaginate } from "../model/permission.model";

export class IAdminPermissionService {
    private repo: IAdminPermissionRepo;

    constructor(repo: IAdminPermissionRepo) {
        this.repo = repo;
    }

    async paginate(pageNumber: number, pageSize: number): Promise<AdminPermissionPaginate> {
        return await this.repo.paginate(pageNumber, pageSize);
    }

    async findByUuid(uuid: string): Promise<AdminPermissionResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async save(request: AdminPermissionSaveRequest): Promise<AdminPermissionResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: AdminPermissionSaveRequest): Promise<AdminPermissionResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}
