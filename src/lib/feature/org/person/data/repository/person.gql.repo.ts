import { apolloClient } from "$lib/providers/graphql.provider";
import type { IPersonRepo } from "../contract/person.repo";
import type { Person, PersonCreateRequest, PersonUpdateRequest, PersonPaginate, OrgPersonRoles, OrgRoleItem } from "../model/person";
import { ORG_PAGINATE_PERSON, ORG_SAVE_PERSON, ORG_UPDATE_PERSON, ORG_DELETE_PERSON, GET_PERSON_ROLES, FIND_ALL_ROLES } from "../queries/person";

export class PersonGqlRepo implements IPersonRepo {
    async paginate(pageNumber: number, pageSize: number): Promise<PersonPaginate> {
        const { data } = await apolloClient.query<{ orgPaginatePerson: PersonPaginate }>({
            query: ORG_PAGINATE_PERSON,
            variables: { paginateRequest: { pageNumber, pageSize } },
            fetchPolicy: "network-only",
        });
        return data!.orgPaginatePerson;
    }

    async save(request: PersonCreateRequest): Promise<Person> {
        const { data } = await apolloClient.mutate<{ orgSavePerson: Person }>({
            mutation: ORG_SAVE_PERSON,
            variables: { personCreateRequest: request },
        });
        return data!.orgSavePerson;
    }

    async update(uuid: string, request: PersonUpdateRequest): Promise<Person> {
        const { data } = await apolloClient.mutate<{ orgUpdatePerson: Person }>({
            mutation: ORG_UPDATE_PERSON,
            variables: { uuid, personUpdateRequest: request },
        });
        return data!.orgUpdatePerson;
    }

    async delete(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgDeleteByUuidPerson: boolean }>({
            mutation: ORG_DELETE_PERSON,
            variables: { uuid },
        });
        return data!.orgDeleteByUuidPerson;
    }

    async getPersonRoles(userUuid: string): Promise<OrgPersonRoles> {
        const { data } = await apolloClient.query<{ orgGetPersonRoles: OrgPersonRoles }>({
            query: GET_PERSON_ROLES,
            variables: { userUuid },
            fetchPolicy: "network-only",
        });
        return data!.orgGetPersonRoles;
    }

    async findAllRoles(): Promise<OrgRoleItem[]> {
        const { data } = await apolloClient.query<{ orgFindAllRole: OrgRoleItem[] }>({
            query: FIND_ALL_ROLES,
            fetchPolicy: "network-only",
        });
        return data!.orgFindAllRole;
    }
}
