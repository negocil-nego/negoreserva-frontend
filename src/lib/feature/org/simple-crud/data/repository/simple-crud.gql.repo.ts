import { apolloClient } from "$lib/providers/graphql.provider";
import type { ISimpleCrudRepo } from "../contract/simple-crud.repo";
import type { NameCrudItem, NameCrudPaginate, NameCrudResource } from "../model/simple-crud";
import { paginateQuery, saveQuery, updateQuery, deleteQuery } from "../queries/simple-crud";

export class SimpleCrudGqlRepo implements ISimpleCrudRepo {
    async paginate(resource: NameCrudResource, pageNumber: number, pageSize: number): Promise<NameCrudPaginate> {
        const key = `orgPaginate${resource}`;
        const { data } = await apolloClient.query<Record<string, NameCrudPaginate>>({
            query: paginateQuery(resource),
            variables: { paginateRequest: { pageNumber, pageSize } },
            fetchPolicy: "network-only",
        });
        return data![key];
    }

    async save(resource: NameCrudResource, request: { name: string; description?: string | null; permissionUuids?: string[] }): Promise<{ uuid: string }> {
        const { data } = await apolloClient.mutate<Record<string, { uuid: string }>>({
            mutation: saveQuery(resource),
            variables: { request },
        });
        return data![`orgSave${resource}`];
    }

    async update(resource: NameCrudResource, uuid: string, request: { name: string; description?: string | null; permissionUuids?: string[] }): Promise<{ uuid: string }> {
        const { data } = await apolloClient.mutate<Record<string, { uuid: string }>>({
            mutation: updateQuery(resource),
            variables: { uuid, request },
        });
        return data![`orgUpdate${resource}`];
    }

    async delete(resource: NameCrudResource, uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<Record<string, boolean>>({
            mutation: deleteQuery(resource),
            variables: { uuid },
        });
        return data![`orgDeleteByUuid${resource}`];
    }
}
