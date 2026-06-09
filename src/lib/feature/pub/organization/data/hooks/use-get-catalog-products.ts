import { useQuery } from "@sveltestack/svelte-query";
import type { IOrganizationManage } from "../contract/organization.service";

interface UseCatalogProductsProps {
    service: IOrganizationManage;
    uuidOrSlug: string;
}

export const useGetCatalogProducts = (props: UseCatalogProductsProps) => {
    return useQuery(
        ["PUB_CATALOG_PRODUCTS", props.uuidOrSlug],
        () => props.service.catalogProducts(props.uuidOrSlug),
        {
            enabled: Boolean(props.uuidOrSlug),
            onError: (error) => {
                console.error("Failed to fetch catalog products:", error);
            }
        }
    );
};
