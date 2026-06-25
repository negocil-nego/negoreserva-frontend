import type { ISimpleCrudRepo } from "./simple-crud.repo";
import type { NameCrudItem, NameCrudPaginate, NameCrudResource } from "../model/simple-crud";

export class SimpleCrudService {
    private repo: ISimpleCrudRepo;

    constructor(repo: ISimpleCrudRepo) {
        this.repo = repo;
    }

    async paginate(resource: NameCrudResource, pageNumber: number, pageSize: number): Promise<NameCrudPaginate> {
        return await this.repo.paginate(resource, pageNumber, pageSize);
    }

    async save(resource: NameCrudResource, request: { name: string; description?: string | null; permissionUuids?: string[] }): Promise<{ uuid: string }> {
        return await this.repo.save(resource, request);
    }

    async update(resource: NameCrudResource, uuid: string, request: { name: string; description?: string | null; permissionUuids?: string[] }): Promise<{ uuid: string }> {
        return await this.repo.update(resource, uuid, request);
    }

    async delete(resource: NameCrudResource, uuid: string): Promise<boolean> {
        return await this.repo.delete(resource, uuid);
    }
}
