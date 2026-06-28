import type { IOrgProductService } from "../contract/product.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_PRODUCT_SUGGESTIONS } from "./keys";

interface OrgProductSuggestionsProps {
    service: IOrgProductService;
}

export const useOrgGetProductSuggestions = ({
    service
}: OrgProductSuggestionsProps) => {
    return useQuery(
        [ORG_PRODUCT_SUGGESTIONS],
        () => service.suggestions(),
    );
};
