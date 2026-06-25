import { apolloClient } from "$lib/providers/graphql.provider";
import type { IPersonRepo } from "../contract/person.repo";
import type { Person, PersonCreateRequest, PersonUpdateRequest, PersonPaginate } from "../model/person";
import { ORG_PAGINATE_PERSON, ORG_SAVE_PERSON, ORG_UPDATE_PERSON, ORG_DELETE_PERSON } from "../queries/person";

export class PersonGqlRepo implements IPersonRepo {
    async paginate(pageNumber: number, pageSize: number): Promise<PersonPaginate> {
        const { data } = await apolloClient.query<{ orgPaginatePerson: PersonPaginate }>({
            query: ORG_PAGINATE_PERSON,
            variables: { paginateRequest: { pageNumber, pageSize } },
            fetchPolicy: "network-only",
        });
        return data!.orgPaginatePerson;
    }

    async save(request: PersonCreateRequest): Promise<{ uuid: string }> {
        const { data } = await apolloClient.mutate<{ orgSavePerson: { uuid: string } }>({
            mutation: ORG_SAVE_PERSON,
            variables: { personCreateRequest: request },
        });
        return data!.orgSavePerson;
    }

    async update(uuid: string, request: PersonUpdateRequest): Promise<{ uuid: string }> {
        const { data } = await apolloClient.mutate<{ orgUpdatePerson: { uuid: string } }>({
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
}
