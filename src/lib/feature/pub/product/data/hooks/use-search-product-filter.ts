import { useQuery } from "@sveltestack/svelte-query";
import { PRODUCT_SEARCH_PUB } from "./keys";
import type { IProductManage } from "../contract/product.service";
import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";

interface UseSearchProductFilterProps {
    service: IProductManage;
    q: string | null;
    priceMin: number | null;
    priceMax: number | null;
    request: PaginateRequest;
}

export const useSearchProductFilter = (props: UseSearchProductFilterProps) => {
    const { service, q, priceMin, priceMax, request } = props;
    return useQuery(
        [PRODUCT_SEARCH_PUB, q, priceMin, priceMax, request],
        () => service.searchFilter({ q, priceMin, priceMax }, request),
        {
            keepPreviousData: true,
            onError: (error) => {
                console.error('Failed to search products with filter:', error);
            }
        }
    );
};
