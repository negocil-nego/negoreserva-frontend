import { apolloClient } from "$lib/providers/graphql.provider";
import {
    ORG_LIST_PERMISSION,
    ORG_PAGINATE_PERMISSION
} from "../queries/permission";
import type { IOrgPermissionRepo } from "../contract/permission.repo";
import type { PermissionPaginate, PermissionResponse } from "$lib/feature/shared/permission/data/model";
import type { PaginateRequest } from "$lib/feature/shared/core/data/model";

export class OrgPermissionGqlRepo implements IOrgPermissionRepo {

    async paginate(request: PaginateRequest): Promise<PermissionPaginate> {
        const { data } = await apolloClient.query<{ orgPaginate: PermissionPaginate }>({
            query: ORG_PAGINATE_PERMISSION,
            variables: { paginateRequest: request }
        });
        return data!.orgPaginate;
    }

    async findAll(): Promise<PermissionResponse[]> {
        const { data } = await apolloClient.query<{ orgFindAll: PermissionResponse[] }>({
            query: ORG_LIST_PERMISSION,
        });
        return data!.orgFindAll;
    }
}
