import { useQuery } from "@sveltestack/svelte-query";
import type { SimpleCrudService } from "../contract/simple-crud.service";
import type { NameCrudResource } from "../model/simple-crud";
import { ORG_NAME_CRUD_PAGINATE } from "./keys";

interface Props {
    service: SimpleCrudService;
    resource: NameCrudResource;
    filter: { pageNumber: number; pageSize: number };
}

export const useOrgNameCrudPaginate = ({ service, resource, filter }: Props) => {
    return useQuery(
        [ORG_NAME_CRUD_PAGINATE, resource, filter],
        () => service.paginate(resource, filter.pageNumber, filter.pageSize),
    );
};
