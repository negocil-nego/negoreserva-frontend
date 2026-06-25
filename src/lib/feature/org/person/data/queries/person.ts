import { gql } from "@apollo/client/core";

export const ORG_PAGINATE_PERSON = gql`
    query orgPaginatePerson($paginateRequest: PaginateRequest) {
        orgPaginatePerson(paginateRequest: $paginateRequest) {
            content {
                uuid
                name
                email
                phone
                birthday
            }
            first
            last
            number
            size
            totalElements
            totalPages
        }
    }
`;

export const ORG_SAVE_PERSON = gql`
    mutation orgSavePerson($personCreateRequest: OrgUserCreateRequest!) {
        orgSavePerson(personCreateRequest: $personCreateRequest) {
            uuid
        }
    }
`;

export const ORG_UPDATE_PERSON = gql`
    mutation orgUpdatePerson($uuid: ID!, $personUpdateRequest: OrgUserUpdateRequest!) {
        orgUpdatePerson(uuid: $uuid, personUpdateRequest: $personUpdateRequest) {
            uuid
        }
    }
`;

export const ORG_DELETE_PERSON = gql`
    mutation orgDeleteByUuidPerson($uuid: ID!) {
        orgDeleteByUuidPerson(uuid: $uuid)
    }
`;
