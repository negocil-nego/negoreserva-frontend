import { gql } from "@apollo/client/core";

export const PAGINATE_PERSON = gql`
  query adminPaginatePerson($paginateRequest: PaginateRequest) {
    adminPaginatePerson(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        email
        phone
        birthday
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

export const PAGINATE_PERSON_FILTER = gql`
  query adminPaginatePersonFilter($filter: PersonFilterQueryParamInput) {
    adminPaginatePersonFilter(filter: $filter) {
      content {
        uuid
        name
        email
        phone
        birthday
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

export const FIND_BY_UUID_PERSON = gql`
  query adminFindByUuidPerson($uuid: ID!) {
    adminFindByUuidPerson(uuid: $uuid) {
      uuid
      name
      email
      phone
      birthday
    }
  }
`;

export const FIND_BY_EMAIL_PERSON = gql`
  query adminFindByEmailPerson($email: String!) {
    adminFindByEmailPerson(email: $email) {
      uuid
      name
      email
      phone
      birthday
    }
  }
`;

export const FIND_BY_PHONE_PERSON = gql`
  query adminFindByPhonePerson($phone: String!) {
    adminFindByPhonePerson(phone: $phone) {
      uuid
      name
      email
      phone
      birthday
    }
  }
`;

export const SAVE_PERSON = gql`
  mutation adminSavePerson($personCreateRequest: PersonCreateRequest!) {
    adminSavePerson(personCreateRequest: $personCreateRequest) {
      uuid
      name
      email
      phone
      birthday
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation adminUpdatePerson($uuid: ID!, $personUpdateRequest: PersonUpdateRequest!) {
    adminUpdatePerson(uuid: $uuid, personUpdateRequest: $personUpdateRequest) {
      uuid
      name
      email
      phone
      birthday
    }
  }
`;

export const DELETE_BY_UUID_PERSON = gql`
  mutation adminDeleteByUuidPerson($uuid: ID!) {
    adminDeleteByUuidPerson(uuid: $uuid)
  }
`;