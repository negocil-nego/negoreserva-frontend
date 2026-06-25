import type { NameCrudItem, NameCrudPaginate, NameCrudResource } from "../model/simple-crud";

export interface ISimpleCrudRepo {
    paginate(resource: NameCrudResource, pageNumber: number, pageSize: number): Promise<NameCrudPaginate>;
    save(resource: NameCrudResource, request: { name: string; description?: string | null; permissionUuids?: string[] }): Promise<{ uuid: string }>;
    update(resource: NameCrudResource, uuid: string, request: { name: string; description?: string | null; permissionUuids?: string[] }): Promise<{ uuid: string }>;
    delete(resource: NameCrudResource, uuid: string): Promise<boolean>;
}
