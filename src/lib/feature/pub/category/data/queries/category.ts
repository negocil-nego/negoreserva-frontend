import { gql } from "@apollo/client/core";

export const PAGINATE_CATEGORY = gql`
  query pubPaginateCategory($paginateRequest: PaginateRequest) {
    pubPaginateCategory(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        description
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

export const PAGINATE_CATEGORY_FILTER = gql`
  query pubPaginateCategoryFilter($filter: CategoryFilterQueryParamInput) {
    pubPaginateCategoryFilter(filter: $filter) {
      content {
        uuid
        name
        icon
        description
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
