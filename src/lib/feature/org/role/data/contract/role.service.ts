import type { IOrgRoleRepo, OrgRoleSaveRequest } from "./role.repo";
import type { OrgRoleResponse, OrgRolePaginate } from "../model/role.model";

export class IOrgRoleService {
    private repo: IOrgRoleRepo;

    constructor(repo: IOrgRoleRepo) {
        this.repo = repo;
    }

    async paginate(pageNumber: number, pageSize: number): Promise<OrgRolePaginate> {
        return await this.repo.paginate(pageNumber, pageSize);
    }

    async findByUuid(uuid: string): Promise<OrgRoleResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async save(request: OrgRoleSaveRequest): Promise<OrgRoleResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: OrgRoleSaveRequest): Promise<OrgRoleResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}
