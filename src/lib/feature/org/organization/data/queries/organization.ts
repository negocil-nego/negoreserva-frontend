import { gql } from "@apollo/client/core";

export const GET_ORGANIZATION = gql`
query {
  orgProfileOrganization {
    user {
      uuid
      username
      name
      email
      phone
    }
    organization {
      uuid
      name
      email
      description
      phone
      address
      rating
      logo
      image
      video
    }
    updateDataResponse {
      id
      field
      type
      expiredAt
    }
    addresses {
      uuid
      complement
      province {
        uuid
        value
        label
      }
      municipality {
        uuid
        value
        label
      }
      latitude
      longitude
      isDefault
    }
    socialMedia {
      uuid
      facebook
      instagram
      youtube
      tiKtok
      linkedin
    }
  }
}
`;

export const ORG_ORGANIZATION_UPDATE = gql`
mutation($request: OrganizationEditProfileRequest!) {
  orgOrganizationUpdate(request: $request) {
        uuid
        name
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
`;

export const ORG_ORGANIZATION_UPDATE_SOCIAL_MEDIA = gql`
mutation($request: OrganizationSocialMediaEditRequest!) {
  orgOrganizationUpdateSocialMedia(request: $request) {
        uuid
        name
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
`;

export const ORG_ORGANIZATION_UPDATE_ADDRESS = gql`
mutation($request: OrganizationAddressEditRequest!) {
  orgOrganizationUpdateAddress(request: $request) {
        uuid
        name
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
`;

export const ORG_ORGANIZATION_UPSERT_ADDRESS = gql`
mutation($request: OrganizationAddressUpsertRequest!) {
  orgOrganizationUpsertAddress(request: $request) {
        uuid
        complement
        province { uuid value label }
        municipality { uuid value label }
        latitude
        longitude
        isDefault
  }
}
`;

export const ORG_ORGANIZATION_SET_DEFAULT_ADDRESS = gql`
mutation($addressUuid: ID!) {
  orgOrganizationSetDefaultAddress(addressUuid: $addressUuid) {
        uuid
        complement
        province { uuid value label }
        municipality { uuid value label }
        latitude
        longitude
        isDefault
  }
}
`;

export const ORG_ORGANIZATION_REMOVE_ADDRESS = gql`
mutation($addressUuid: ID!) {
  orgOrganizationRemoveAddress(addressUuid: $addressUuid) {
        uuid
        name
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
`;