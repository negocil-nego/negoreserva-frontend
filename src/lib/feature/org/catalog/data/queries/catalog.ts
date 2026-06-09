import { gql } from "@apollo/client/core";

export const PAGINATE_CATALOG = gql`
  query orgPaginateCatalog($paginateRequest: PaginateRequest) {
    orgPaginateCatalog(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        description
        imgUrl
        slug
        type
      }
      empty
      first
      last
      number
      numberOfElements
      size
      totalElements
      totalPages
    }
  }
`;

export const PAGINATE_CATALOG_FILTER = gql`
  query orgPaginateCatalogFilter($filter: CatalogFilterQueryParamInput) {
    orgPaginateCatalogFilter(filter: $filter) {
      content {
        uuid
        name
        description
        imgUrl
        slug
        type
      }
      empty
      first
      last
      number
      numberOfElements
      size
      totalElements
      totalPages
    }
  }
`;

export const FIND_BY_UUID_CATALOG = gql`
  query orgFindByUuidCatalog($uuid: ID!) {
    orgFindByUuidCatalog(uuid: $uuid) {
      uuid
      name
      description
      imgUrl
      slug
      type
    }
  }
`;

export const FIND_BY_UUID_OR_SLUG_CATALOG = gql`
  query orgFindByUuidOrSlugCatalog($uuidOrSlug: String!) {
    orgFindByUuidOrSlugCatalog(uuidOrSlug: $uuidOrSlug) {
      uuid
      name
      description
      imgUrl
      slug
      type
    }
  }
`;

export const UPDATE_CATALOG = gql`
  mutation orgUpdateCatalog($uuid: ID!, $catalogRequest: OrgCatalogUpdateRequest!) {
    orgUpdateCatalog(uuid: $uuid, catalogRequest: $catalogRequest) {
      uuid
      name
      description
      imgUrl
      slug
      type
    }
  }
`;

export const DELETE_BY_UUID_CATALOG = gql`
  mutation orgDeleteByUuidCatalog($uuid: ID!) {
    orgDeleteByUuidCatalog(uuid: $uuid)
  }
`;

export const PAGINATE_CATALOG_PRODUCTS = gql`
  query orgPaginateCatalogProducts($uuidOrSlug: String!, $paginateRequest: PaginateRequest) {
    orgPaginateCatalogProducts(uuidOrSlug: $uuidOrSlug, paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        description
        files {
          uuid
          title
          description
          url
          type
        }
      }
      empty first last number numberOfElements size totalElements totalPages
    }
  }
`;

export const PAGINATE_CATALOG_PRODUCTS_NOT_IN = gql`
  query orgPaginateCatalogProductsNotIn($uuidOrSlug: String!, $paginateRequest: PaginateRequest) {
    orgPaginateCatalogProductsNotIn(uuidOrSlug: $uuidOrSlug, paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        description
        files {
          uuid
          title
          description
          url
          type
        }
      }
      empty first last number numberOfElements size totalElements totalPages
    }
  }
`;

export const ADD_PRODUCTS_TO_CATALOG = gql`
  mutation orgAddProductsToCatalog($uuidOrSlug: String!, $products: [CatalogProductOrderInput!]!) {
    orgAddProductsToCatalog(uuidOrSlug: $uuidOrSlug, products: $products)
  }
`;

export const REMOVE_PRODUCTS_FROM_CATALOG = gql`
  mutation orgRemoveProductsFromCatalog($uuidOrSlug: String!, $productUuids: [ID!]!) {
    orgRemoveProductsFromCatalog(uuidOrSlug: $uuidOrSlug, productUuids: $productUuids)
  }
`;
