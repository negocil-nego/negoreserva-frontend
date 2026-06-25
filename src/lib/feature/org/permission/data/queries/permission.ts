import { gql } from "@apollo/client/core";

export const ORG_LIST_PERMISSION = gql`
  query orgFindAll {
    orgFindAll {
        uuid
        name
        description
    }
  }
`;


export const ORG_PAGINATE_PERMISSION = gql`
  query orgPaginate($paginateRequest: PaginateRequest) {
    orgPaginate(paginateRequest: $paginateRequest) {
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