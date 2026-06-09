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
      country
      state
      city
      neighborhood
      street
      number
      zipCode
      complement
      latitude
      longitude
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