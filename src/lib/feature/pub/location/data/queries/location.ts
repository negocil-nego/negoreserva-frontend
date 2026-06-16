import { gql } from "@apollo/client/core";

export const PUB_LIST_PROVINCE = gql`
  query pubListProvince {
    pubListProvince {
      uuid
      value
      label
    }
  }
`;

export const PUB_LIST_MUNICIPALITY_BY_PROVINCE = gql`
  query pubListMunicipalityByProvince($provinceUuid: ID!) {
    pubListMunicipalityByProvince(provinceUuid: $provinceUuid) {
      uuid
      value
      label
    }
  }
`;
