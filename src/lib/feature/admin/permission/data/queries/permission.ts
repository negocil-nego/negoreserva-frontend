import { gql } from "@apollo/client/core";

export const PAGINATE_PERMISSION = gql`
  query adminPaginatePermission($paginateRequest: PaginateRequest) {
    adminPaginatePermission(paginateRequest: $paginateRequest) {
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

export const FIND_BY_UUID_PERMISSION = gql`
  query adminFindByUuidPermission($uuid: ID!) {
    adminFindByUuidPermission(uuid: $uuid) {
      uuid
      name
      description
    }
  }
`;

export const SAVE_PERMISSION = gql`
  mutation adminSavePermission($permissionRequest: adminPermissionRequest!) {
    adminSavePermission(permissionRequest: $permissionRequest) {
      uuid
      name
      description
    }
  }
`;

export const UPDATE_PERMISSION = gql`
  mutation adminUpdatePermission($uuid: ID!, $permissionRequest: adminPermissionRequest!) {
    adminUpdatePermission(uuid: $uuid, permissionRequest: $permissionRequest) {
      uuid
      name
      description
    }
  }
`;

export const DELETE_BY_UUID_PERMISSION = gql`
  mutation adminDeleteByUuidPermission($uuid: ID!) {
    adminDeleteByUuidPermission(uuid: $uuid)
  }
`;
