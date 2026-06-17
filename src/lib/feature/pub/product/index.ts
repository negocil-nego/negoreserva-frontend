export type {
    ProductDetailResponse,
    ProductResponse,
    SearchProductPaginate,
    ProductSearchFilterParamInput
} from "./data/model/product.model";

export { PRODUCT_DETAIL, PUB_SEARCH_PRODUCT, PUB_SEARCH_PRODUCT_FILTER } from "./data/queries/product";

export { ProductManage as ProductService } from "./data/service/product.service";

export { useGetProductDetail } from "./data/hooks/use-get-product-detail";
export { useSearchProduct } from "./data/hooks/use-search-product";
export { useSearchProductFilter } from "./data/hooks/use-search-product-filter";
