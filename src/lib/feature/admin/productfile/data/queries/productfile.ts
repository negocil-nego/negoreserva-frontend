import { gql } from "@apollo/client/core";

export const PAGINATE_PRODUCTFILE = gql`
  query adminPaginateProductFile($paginateRequest: PaginateRequest) {
    adminPaginateProductFile(paginateRequest: $paginateRequest) {
      content {
        uuid
        title
        description
        productUuid
        url
        type
        product {
          uuid
          name
          price
          description
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

export const FIND_BY_UUID_PRODUCTFILE = gql`
  query adminFindByUuidProductFile($uuid: ID!) {
    adminFindByUuidProductFile(uuid: $uuid) {
      uuid
      title
      description
      productUuid
      url
      type
      product {
          uuid
          name
          price
          description
          type
        }      
    }
  }
`;

export const SAVE_PRODUCTFILE = gql`
  mutation adminSaveProductFile($productFileRequest: ProductFileRequest!) {
    adminSaveProductFile(productFileRequest: $productFileRequest) {
      uuid
      title
      description
      productUuid
      url
      type
      product {
        uuid
        name
        price
          description
          type
        }      
    }
  }
`;

export const UPDATE_PRODUCTFILE = gql`
  mutation adminUpdateProductFile($uuid: ID!, $productFileRequest: ProductFileRequest!) {
    adminUpdateProductFile(uuid: $uuid, productFileRequest: $productFileRequest) {
      uuid
      title
      description
      productUuid
      url
      type
      product {
        uuid
        name
        price
        description
        type
      }      
    }
  }
`;

export const DELETE_BY_UUID_PRODUCTFILE = gql`
  mutation adminDeleteByUuidProductFile($uuid: ID!) {
    adminDeleteByUuidProductFile(uuid: $uuid)
  }
`;