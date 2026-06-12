import { useQuery } from "@sveltestack/svelte-query";
import { PRODUCT_DETAIL_PUB } from "./keys";
import type { IProductManage } from "../contract/product.service";

interface UseProductDetailProps {
    service: IProductManage;
    uuidOrSlug: string | (() => string);
}

export const useGetProductDetail = ({
    service, uuidOrSlug
}: UseProductDetailProps) => {
    const getUuidOrSlug = typeof uuidOrSlug === "function" ? uuidOrSlug : () => uuidOrSlug;

    return useQuery(
        [PRODUCT_DETAIL_PUB, getUuidOrSlug()],
        () => service.detail(getUuidOrSlug()),
        {
            refetchOnWindowFocus: false,
            onError: (error) => {
                console.error('Failed to fetch product detail:', error);
            }
        }
    );
};
