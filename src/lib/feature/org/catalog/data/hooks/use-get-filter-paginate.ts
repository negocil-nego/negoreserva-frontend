import type { IOrgCatalogService } from "../contract/catalog.service";
import type { CatalogFilterQueryParamInput } from "../contract/catalog.repo";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_CATALOG_FILTER } from "./keys";

interface OrgCatalogFilterPaginateProps {
    service: IOrgCatalogService;
    filter: CatalogFilterQueryParamInput;
}

export const useOrgGetCatalogFilterPaginate = ({
    service,
    filter
}: OrgCatalogFilterPaginateProps) => {
    return useQuery(
        [ORG_CATALOG_FILTER, filter],
        () => service.paginateCatalogFilter(filter),
    );
};
