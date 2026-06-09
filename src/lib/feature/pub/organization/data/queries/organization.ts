import { gql } from "@apollo/client/core";

export const ORGANIZATION_DETAIL = gql`
  query pubOrganizationDetail($uuidOrSlug: String) {
    pubOrganizationDetail(uuidOrSlug: $uuidOrSlug) {
      uuid
      name
      slug
      description
      address
      rating
      logo
      image
      video
      email
      phone
      categories {
        uuid
        name
        description
      }
      products {
        uuid
        name
        description
        image
        files {
          uuid
          title
          description
          url
          type
        }
        prices {
          type
          value
          order
          isPrimary
        }
        tags {
          uuid
          icon
          title
          value
        }
      }
      catalogs {
        uuid
        name
        description
        imgUrl
        slug
      }
      socialsMedia {
        uuid
        facebook
        instagram
        youtube
        tiKtok
        linkedin
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
    }
  }
`;

export const PUB_CATALOG_PRODUCTS = gql`
  query pubCatalogProducts($uuidOrSlug: String!) {
    pubCatalogProducts(uuidOrSlug: $uuidOrSlug) {
      uuid
      name
      description
      image
      organization {
        uuid
        name
        slug
        email
        description
        phone
        address
        rating
        image
        logo
        video
      }
      files {
        uuid
        title
        description
        url
        type
        isPrimary
      }
      prices {
        uuid
        type
        value
        order
        isPrimary
      }
      tags {
        uuid
        icon
        title
        value
      }
    }
  }
`;

export const PUB_SEARCH_ORGANIZATION = gql`
  query pubSearchOrganization($q: String!, $paginateRequest: PaginateRequest) {
    pubSearchOrganization(q: $q, paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        email
        description
        phone
        address
        rating
        image
        logo
        video
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

export const PUB_SEARCH_ORGANIZATION_FILTER = gql`
  query pubSearchOrganizationFilter($filter: OrganizationSearchFilterParamInput!, $paginateRequest: PaginateRequest) {
    pubSearchOrganizationFilter(filter: $filter, paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        slug
        email
        description
        phone
        address
        rating
        image
        logo
        video
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

export const PAGINATE_ORGANIZATION = gql`
  query pubPaginateGetOrganization($paginateRequest: PaginateRequest) {
    pubPaginateGetOrganization(paginateRequest: $paginateRequest) {
      content {
        organization {
          uuid
          name
          description
          address
          rating
          video
          logo
          slug
          image
        }
        categories {
          uuid
          icon
          name
          description
        }
        products {
          product {
            uuid
            name
            slug
            price
            description
            image
          }
          tags {
            uuid
            icon
            title
            value 
          }
          prices {
            type
            value
            order
            isPrimary
          }
          files {
            uuid
            title
            description
            url
            type
          }
        }
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
