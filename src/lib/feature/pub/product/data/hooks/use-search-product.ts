import { useQuery } from "@sveltestack/svelte-query";
import { PRODUCT_SEARCH_PUB } from "./keys";
import type { IProductManage } from "../contract/product.service";
import type { PaginateRequest } from "$lib/feature/pub/organization/data/model/organization.model";

interface UseSearchProductProps {
    service: IProductManage;
    q: string;
    request: PaginateRequest;
}

export const useSearchProduct = (props: UseSearchProductProps) => {
    return useQuery(
        [PRODUCT_SEARCH_PUB],
        () => props.service.search(props.q, props.request),
        {
            enabled: false,
            keepPreviousData: true,
            onError: (error) => {
                console.error('Failed to search products:', error);
            }
        }
    );
};
