import { useQuery } from "@sveltestack/svelte-query";
import { PRODUCT_DETAIL_PUB } from "./keys";
import type { IProductManage } from "../contract/product.service";

interface UseProductDetailProps {
    service: IProductManage;
    uuidOrSlug: string;
}

export const useGetProductDetail = ({
    service, uuidOrSlug
}: UseProductDetailProps) => {
    return useQuery(
        [PRODUCT_DETAIL_PUB, uuidOrSlug],
        () => service.detail(uuidOrSlug),
        {
            refetchOnWindowFocus: false,
            onError: (error) => {
                console.error('Failed to fetch product detail:', error);
            }
        }
    );
};
