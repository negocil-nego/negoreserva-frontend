import { gql } from "@apollo/client/core";

export const PAGINATE_PRODUCT = gql`
  query adminPaginateProduct($paginateRequest: PaginateRequest) {
    adminPaginateProduct(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        price
        description
        type
        organizationUuid
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
  query adminPaginateProductFilter($filter: ProductFilterQueryParamInput) {
    adminPaginateProductFilter(filter: $filter) {
      content {
        uuid
        name
        price
        description
        type
        organization {
          uuid
          name
          email
          description
          phone
          address         
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
  query adminFindByUuidProduct($uuid: ID!) {
    adminFindByUuidProduct(uuid: $uuid) {
      uuid
      name
      price
      description
      type
      organization {
        uuid
        name
        email
        description
        phone
        address         
      }
    }
  }
`;

export const FIND_BY_NAME_PRODUCT = gql`
  query adminFindByNameProduct($name: String!) {
    adminFindByNameProduct(name: $name) {
      uuid
      name
      price
      description
      type
      organization {
        uuid
        name
        email
        description
        phone
        address         
      }
    }
  }
`;

export const SAVE_PRODUCT = gql`
  mutation adminSaveProduct($productRequest: ProductRequest!) {
    adminSaveProduct(productRequest: $productRequest) {
      uuid
      name
      price
      description
      type
      organization {
        uuid
        name
        email
        description
        phone
        address         
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation adminUpdateProduct($uuid: ID!, $productRequest: ProductRequest!) {
    adminUpdateProduct(uuid: $uuid, productRequest: $productRequest) {
      uuid
      name
      price
      description
      type
      organization {
        uuid
        name
        email
        description
        phone
        address         
      }
    }
  }
`;

export const DELETE_BY_UUID_PRODUCT = gql`
  mutation adminDeleteByUuidProduct($uuid: ID!) {
    adminDeleteByUuidProduct(uuid: $uuid)
  }
`;