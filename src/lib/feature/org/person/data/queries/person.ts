import { gql } from "@apollo/client/core";

export const ORG_PAGINATE_PERSON = gql`
    query orgPaginatePerson($paginateRequest: PaginateRequest) {
        orgPaginatePerson(paginateRequest: $paginateRequest) {
            content {
                uuid
                name
                email
                phone
                roles { uuid name }
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
            roles { uuid name }
        }
    }
`;

export const ORG_UPDATE_PERSON = gql`
    mutation orgUpdatePerson($uuid: ID!, $personUpdateRequest: OrgUserUpdateRequest!) {
        orgUpdatePerson(uuid: $uuid, personUpdateRequest: $personUpdateRequest) {
            uuid
            roles { uuid name }
        }
    }
`;

export const ORG_DELETE_PERSON = gql`
    mutation orgDeleteByUuidPerson($uuid: ID!) {
        orgDeleteByUuidPerson(uuid: $uuid)
    }
`;

export const GET_PERSON_ROLES = gql`
    query orgGetPersonRoles($userUuid: ID!) {
        orgGetPersonRoles(userUuid: $userUuid) {
            assignedRoles { uuid name }
            availableRoles { uuid name }
        }
    }
`;

export const FIND_ALL_ROLES = gql`
    query orgFindAllRole {
        orgFindAllRole { uuid name }
    }
`;
