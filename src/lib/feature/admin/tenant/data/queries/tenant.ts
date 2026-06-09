import { gql } from "@apollo/client/core";

export const PAGINATE_TENANT = gql`
  query adminPaginateTenant($paginateRequest: PaginateRequest) {
    adminPaginateTenant(paginateRequest: $paginateRequest) {
      content {
        uuid
        code
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

export const PAGINATE_TENANT_FILTER = gql`
  query adminPaginateTenantFilter($filter: TenantFilterQueryParamInput) {
    adminPaginateTenantFilter(filter: $filter) {
      content {
        uuid
        code
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

export const FIND_BY_UUID_TENANT = gql`
  query adminFindByUuidTenant($uuid: ID!) {
    adminFindByUuidTenant(uuid: $uuid) {
      uuid
      code
      name
    }
  }
`;

export const FIND_BY_CODE_TENANT = gql`
  query adminFindByCodeTenant($code: String!) {
    adminFindByCodeTenant(code: $code) {
      uuid
      code
      name
    }
  }
`;

export const SAVE_TENANT = gql`
  mutation adminSaveTenant($tenantCreateRequest: TenantCreateRequest!) {
    adminSaveTenant(tenantCreateRequest: $tenantCreateRequest) {
      uuid
      code
      name
    }
  }
`;

export const UPDATE_TENANT = gql`
  mutation adminUpdateTenant($uuid: ID!, $tenantUpdateRequest: TenantUpdateRequest!) {
    adminUpdateTenant(uuid: $uuid, tenantUpdateRequest: $tenantUpdateRequest) {
      uuid
      code
      name
    }
  }
`;

export const DELETE_BY_UUID_TENANT = gql`
  mutation adminDeleteByUuidTenant($uuid: ID!) {
    adminDeleteByUuidTenant(uuid: $uuid)
  }
`;