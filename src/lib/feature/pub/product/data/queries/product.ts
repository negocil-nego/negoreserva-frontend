import { gql } from "@apollo/client/core";

export const PUB_SEARCH_PRODUCT = gql`
  query pubSearchProduct($q: String!, $paginateRequest: PaginateRequest) {
    pubSearchProduct(q: $q, paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        description
        image
        organization {
          uuid
          name
          slug
          email
          description
          phone
          address
          rating
          image
          logo
          video
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

export const PUB_SEARCH_PRODUCT_FILTER = gql`
  query pubSearchProductFilter($filter: ProductSearchFilterParamInput!, $paginateRequest: PaginateRequest) {
    pubSearchProductFilter(filter: $filter, paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        description
        image
        organization {
          uuid
          name
          slug
          email
          description
          phone
          address
          rating
          image
          logo
          video
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

export const PRODUCT_DETAIL = gql`
  query pubProductDetail($uuidOrSlug: String) {
    pubProductDetail(uuidOrSlug: $uuidOrSlug) {
      uuid
      name
      description
      image
      organization {
        uuid
        name
        slug
        email
        description
        phone
        address
        logo
        image
        video
        rating
      }
      files {
        uuid
        title
        description
        url
        type
        isPrimary
      }
      tags {
        uuid
        icon
        title
        value
      }
      prices {
        uuid
        type
        value
        order
        isPrimary
        unit
      }
    }
  }
`;
