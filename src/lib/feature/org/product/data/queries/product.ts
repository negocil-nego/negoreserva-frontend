import { gql } from "@apollo/client/core";

export const PAGINATE_PRODUCT = gql`
  query orgPaginateProduct($paginateRequest: PaginateRequest) {
    orgPaginateProduct(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        description
        type
        files {
          uuid
          title
          description
          url
          type
        }
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

export const PAGINATE_PRODUCT_FILTER = gql`
  query orgPaginateProductFilter($filter: ProductFilterQueryParamInput) {
    orgPaginateProductFilter(filter: $filter) {
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

export const FIND_BY_UUID_PRODUCT = gql`
  query orgFindByUuidProduct($uuid: ID!) {
    orgFindByUuidProduct(uuid: $uuid) {
      uuid
      name
      description
      type
      files {
        uuid
        title
        description
        url
        type
      }
    }
  }
`;

export const SAVE_PRODUCT = gql`
  mutation orgSaveProduct($productRequest: ProductRequest!) {
    orgSaveProduct(productRequest: $productRequest) {
      uuid
      name
      description
      type
      files {
        uuid
        title
        description
        url
        type
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation orgUpdateProduct($uuid: ID!, $productRequest: ProductRequest!) {
    orgUpdateProduct(uuid: $uuid, productRequest: $productRequest) {
      uuid
      name
      description
      type
      files {
        uuid
        title
        description
        url
        type
      }
    }
  }
`;

export const DELETE_BY_UUID_PRODUCT = gql`
  mutation orgDeleteByUuidProduct($uuid: ID!) {
    orgDeleteByUuidProduct(uuid: $uuid)
  }
`;
