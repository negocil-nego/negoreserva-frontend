import { gql } from "@apollo/client/core";

export const PAGINATE_CATEGORY = gql`
  query adminPaginateCategory($paginateRequest: PaginateRequest) {
    adminPaginateCategory(paginateRequest: $paginateRequest) {
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
  query adminPaginateCategoryFilter($filter: CategoryFilterQueryParamInput) {
    adminPaginateCategoryFilter(filter: $filter) {
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

export const FIND_BY_UUID_CATEGORY = gql`
  query adminFindByUuidCategory($uuid: ID!) {
    adminFindByUuidCategory(uuid: $uuid) {
      uuid
      name
      description
    }
  }
`;

export const FIND_BY_NAME_CATEGORY = gql`
  query adminFindByNameCategory($name: ID!) {
    adminFindByNameCategory(name: $name) {
      uuid
      name
      description
    }
  }
`;

export const SAVE_CATEGORY = gql`
  mutation adminSaveCategory($categoryRequest: CategoryRequest!) {
    adminSaveCategory(categoryRequest: $categoryRequest) {
      uuid
      name
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation adminUpdateCategory($uuid: ID!, $categoryRequest: CategoryRequest!) {
    adminUpdateCategory(uuid: $uuid, categoryRequest: $categoryRequest) {
      uuid
      name
      description
    }
  }
`;

export const DELETE_BY_UUID_CATEGORY = gql`
  mutation adminDeleteByUuidCategory($uuid: ID!) {
    adminDeleteByUuidCategory(uuid: $uuid)
  }
`;
