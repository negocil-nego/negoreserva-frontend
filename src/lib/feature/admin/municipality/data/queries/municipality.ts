import { gql } from "@apollo/client/core";

export const PAGINATE_MUNICIPALITY = gql`
  query adminPaginateMunicipality($paginateRequest: PaginateRequest) {
    adminPaginateMunicipality(paginateRequest: $paginateRequest) {
      content {
        uuid
        value
        label
        provinceUuid
        provinceValue
        provinceLabel
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

export const PAGINATE_MUNICIPALITY_FILTER = gql`
  query adminPaginateMunicipalityFilter($filter: MunicipalityFilterQueryParamInput) {
    adminPaginateMunicipalityFilter(filter: $filter) {
      content {
        uuid
        value
        label
        provinceUuid
        provinceValue
        provinceLabel
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

export const FIND_BY_UUID_MUNICIPALITY = gql`
  query adminFindByUuidMunicipality($uuid: ID!) {
    adminFindByUuidMunicipality(uuid: $uuid) {
      uuid
      value
      label
      provinceUuid
      provinceValue
      provinceLabel
    }
  }
`;

export const SAVE_MUNICIPALITY = gql`
  mutation adminSaveMunicipality($municipalityRequest: MunicipalityRequest!) {
    adminSaveMunicipality(municipalityRequest: $municipalityRequest) {
      uuid
      value
      label
      provinceUuid
      provinceValue
      provinceLabel
    }
  }
`;

export const UPDATE_MUNICIPALITY = gql`
  mutation adminUpdateMunicipality($uuid: ID!, $municipalityRequest: MunicipalityRequest!) {
    adminUpdateMunicipality(uuid: $uuid, municipalityRequest: $municipalityRequest) {
      uuid
      value
      label
      provinceUuid
      provinceValue
      provinceLabel
    }
  }
`;

export const DELETE_BY_UUID_MUNICIPALITY = gql`
  mutation adminDeleteByUuidMunicipality($uuid: ID!) {
    adminDeleteByUuidMunicipality(uuid: $uuid)
  }
`;

export const LIST_PROVINCES = gql`
  query pubListProvince {
    pubListProvince {
      uuid
      value
      label
    }
  }
`;
