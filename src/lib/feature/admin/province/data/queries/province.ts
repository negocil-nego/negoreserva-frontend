import { gql } from "@apollo/client/core";

export const PAGINATE_PROVINCE = gql`
  query adminPaginateProvince($paginateRequest: PaginateRequest) {
    adminPaginateProvince(paginateRequest: $paginateRequest) {
      content {
        uuid
        value
        label
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

export const PAGINATE_PROVINCE_FILTER = gql`
  query adminPaginateProvinceFilter($filter: ProvinceFilterQueryParamInput) {
    adminPaginateProvinceFilter(filter: $filter) {
      content {
        uuid
        value
        label
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

export const FIND_BY_UUID_PROVINCE = gql`
  query adminFindByUuidProvince($uuid: ID!) {
    adminFindByUuidProvince(uuid: $uuid) {
      uuid
      value
      label
    }
  }
`;

export const FIND_BY_VALUE_PROVINCE = gql`
  query adminFindByValueProvince($value: String!) {
    adminFindByValueProvince(value: $value) {
      uuid
      value
      label
    }
  }
`;

export const SAVE_PROVINCE = gql`
  mutation adminSaveProvince($provinceRequest: ProvinceRequest!) {
    adminSaveProvince(provinceRequest: $provinceRequest) {
      uuid
      value
      label
    }
  }
`;

export const UPDATE_PROVINCE = gql`
  mutation adminUpdateProvince($uuid: ID!, $provinceRequest: ProvinceRequest!) {
    adminUpdateProvince(uuid: $uuid, provinceRequest: $provinceRequest) {
      uuid
      value
      label
    }
  }
`;

export const DELETE_BY_UUID_PROVINCE = gql`
  mutation adminDeleteByUuidProvince($uuid: ID!) {
    adminDeleteByUuidProvince(uuid: $uuid)
  }
`;
