import { gql } from "@apollo/client/core";

export const PUB_SEARCH_CATALOG_FILTER = gql`
  query pubSearchCatalogFilter($filter: CatalogSearchFilterParamInput!, $paginateRequest: PaginateRequest) {
    pubSearchCatalogFilter(filter: $filter, paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        description
        imgUrl
        type
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
