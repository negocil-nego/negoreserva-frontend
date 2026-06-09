export type {
    ProductDetailResponse,
    ProductResponse,
    SearchProductPaginate,
    ProductSearchFilterParamInput
} from "./data/model/product.model";

export { PRODUCT_DETAIL, PUB_SEARCH_PRODUCT, PUB_SEARCH_PRODUCT_FILTER } from "./data/queries/product";

export type { IProductRepo as IProductRepository } from "./data/contract/product.repository";

export type { IProductManage as IProductService } from "./data/contract/product.service";
export { IProductManage as BaseProductService } from "./data/contract/product.service";

export { ProductGqlRepo as ProductGqlRepository } from "./data/repository/product.gql.repository";

export { ProductManage as ProductService } from "./data/service/product.service";

export { useGetProductDetail } from "./data/hooks/use-get-product-detail";
export { useSearchProduct } from "./data/hooks/use-search-product";
export { useSearchProductFilter } from "./data/hooks/use-search-product-filter";
export { PRODUCT_DETAIL_PUB as PRODUCT_DETAIL_KEY, PRODUCT_SEARCH_PUB as PRODUCT_SEARCH_KEY } from "./data/hooks/keys";
