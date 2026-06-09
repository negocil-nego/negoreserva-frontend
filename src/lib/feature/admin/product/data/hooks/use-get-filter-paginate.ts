import type { IProductService } from "../contract/product.service";
import type { ProductFilterQueryParamInput } from "../model/product.model";
import { useQuery } from "@sveltestack/svelte-query";
import { PRODUCT_FILTER } from "./keys";

interface ProductFilterPaginateProps {
    service: IProductService;
    filter: ProductFilterQueryParamInput;
}

export const useGetProductFilterPaginate = ({
    service,
    filter
}: ProductFilterPaginateProps) => {
    return useQuery(
        [PRODUCT_FILTER, filter],
        () => service.paginateProductFilter(filter),
    );
};