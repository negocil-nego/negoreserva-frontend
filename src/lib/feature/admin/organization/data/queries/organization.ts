import { gql } from "@apollo/client/core";

export const PAGINATE_ORGANIZATION = gql`
  query adminPaginateOrganization($paginateRequest: PaginateRequest) {
    adminPaginateOrganization(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        email
        description
        phone
        address
        rating
        logo
        image
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

export const PAGINATE_ORGANIZATION_FILTER = gql`
  query adminPaginateOrganizationFilter($filter: OrganizationFilterQueryParamInput) {
    adminPaginateOrganizationFilter(filter: $filter) {
      content {
        uuid
        name
        email
        description
        phone
        address
        rating
        logo
        image
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

export const FIND_BY_UUID_ORGANIZATION = gql`
  query adminFindByUuidOrganization($uuid: ID!) {
    adminFindByUuidOrganization(uuid: $uuid) {
      uuid
      name
      email
      description
      phone
      address
      rating
      logo
      image
    }
  }
`;

export const FIND_BY_NAME_ORGANIZATION = gql`
  query adminFindByNameOrganization($name: String!) {
    adminFindByNameOrganization(name: $name) {
      uuid
      name
      email
      description
      phone
      address
      rating
      logo
      image
    }
  }
`;

export const FIND_BY_PHONE_ORGANIZATION = gql`
  query adminFindByPhoneOrganization($phone: String!) {
    adminFindByPhoneOrganization(phone: $phone) {
      uuid
      name
      email
      description
      phone
      address
      rating
      logo
      image
    }
  }
`;

export const SAVE_ORGANIZATION = gql`
  mutation adminSaveOrganization($organizationRequest: OrganizationRequest!) {
    adminSaveOrganization(organizationRequest: $organizationRequest) {
      uuid
      name
      email
      description
      phone
      address
      rating
      logo
      image
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation adminUpdateOrganization($uuid: ID!, $organizationRequest: OrganizationRequest!) {
    adminUpdateOrganization(uuid: $uuid, organizationRequest: $organizationRequest) {
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
  }
`;

export const DELETE_BY_UUID_ORGANIZATION = gql`
  mutation adminDeleteByUuidOrganization($uuid: ID!) {
    adminDeleteByUuidOrganization(uuid: $uuid)
  }
`;