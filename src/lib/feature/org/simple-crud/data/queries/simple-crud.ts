import { gql } from "@apollo/client/core";
import type { NameCrudResource } from "../model/simple-crud";

export function paginateQuery(resource: NameCrudResource) {
    return gql`
        query orgPaginateNameCrud($paginateRequest: PaginateRequest) {
            orgPaginate${resource}(paginateRequest: $paginateRequest) {
                content { uuid name description }
                first last number size totalElements totalPages
            }
        }
    `;
}

export function saveQuery(resource: NameCrudResource) {
    const requestName = resource === "Role" ? "roleRequest" : "permissionRequest";
    return gql`
        mutation orgSaveNameCrud($request: Org${resource}Request!) {
            orgSave${resource}(${requestName}: $request) { uuid }
        }
    `;
}

export function updateQuery(resource: NameCrudResource) {
    const requestName = resource === "Role" ? "roleRequest" : "permissionRequest";
    return gql`
        mutation orgUpdateNameCrud($uuid: ID!, $request: Org${resource}Request!) {
            orgUpdate${resource}(uuid: $uuid, ${requestName}: $request) { uuid }
        }
    `;
}

export function deleteQuery(resource: NameCrudResource) {
    return gql`
        mutation orgDeleteNameCrud($uuid: ID!) {
            orgDeleteByUuid${resource}(uuid: $uuid)
        }
    `;
}
