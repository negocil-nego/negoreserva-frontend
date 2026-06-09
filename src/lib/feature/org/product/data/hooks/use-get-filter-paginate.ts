import type { IOrgProductService } from "../contract/product.service";
import type { ProductFilterQueryParamInput } from "../model/product.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_PRODUCT_FILTER } from "./keys";

interface OrgProductFilterPaginateProps {
    service: IOrgProductService;
    filter: ProductFilterQueryParamInput;
}

export const useOrgGetProductFilterPaginate = ({
    service,
    filter
}: OrgProductFilterPaginateProps) => {
    return useQuery(
        [ORG_PRODUCT_FILTER, filter],
        () => service.paginateProductFilter(filter),
    );
};
