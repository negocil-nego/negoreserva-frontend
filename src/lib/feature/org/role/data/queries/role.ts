import { gql } from "@apollo/client/core";

export const PAGINATE_ROLE = gql`
  query orgPaginateRole($paginateRequest: PaginateRequest) {
    orgPaginateRole(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
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

export const FIND_BY_UUID_ROLE = gql`
  query orgFindByUuidRole($uuid: ID!) {
    orgFindByUuidRole(uuid: $uuid) {
      uuid
      name
    }
  }
`;

export const SAVE_ROLE = gql`
  mutation orgSaveRole($roleRequest: OrgRoleRequest!) {
    orgSaveRole(roleRequest: $roleRequest) {
      uuid
      name
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation orgUpdateRole($uuid: ID!, $roleRequest: OrgRoleRequest!) {
    orgUpdateRole(uuid: $uuid, roleRequest: $roleRequest) {
      uuid
      name
    }
  }
`;

export const DELETE_BY_UUID_ROLE = gql`
  mutation orgDeleteByUuidRole($uuid: ID!) {
    orgDeleteByUuidRole(uuid: $uuid)
  }
`;
