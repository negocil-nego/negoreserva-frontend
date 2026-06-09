import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_PERSON,
    PAGINATE_PERSON_FILTER,
    FIND_BY_UUID_PERSON,
    FIND_BY_EMAIL_PERSON,
    FIND_BY_PHONE_PERSON,
    SAVE_PERSON,
    UPDATE_PERSON,
    DELETE_BY_UUID_PERSON
} from "../queries/person";
import type { IAdminPersonRepository } from "../contract/person.repository";
import type {
    PersonResponse,
    PersonPaginate,
    PersonCreateRequest,
    PersonUpdateRequest,
    PersonFilterQueryParamInput,
    PaginateRequest
} from "../model/person.model";

export class PersonGqlRepository implements IAdminPersonRepository {

    async paginate(request: PaginateRequest): Promise<PersonPaginate> {
        const { data } = await apolloClient.query<{ adminPaginatePerson: PersonPaginate }>({
            query: PAGINATE_PERSON,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginatePerson;
    }

    async paginatePersonFilter(filter: PersonFilterQueryParamInput): Promise<PersonPaginate> {
        const { data } = await apolloClient.query<{ adminPaginatePersonFilter: PersonPaginate }>({
            query: PAGINATE_PERSON_FILTER,
            variables: { filter }
        });
        return data!.adminPaginatePersonFilter;
    }

    async findByUuid(uuid: string): Promise<PersonResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidPerson: PersonResponse }>({
            query: FIND_BY_UUID_PERSON,
            variables: { uuid }
        });
        return data!.adminFindByUuidPerson;
    }

    async findByEmail(email: string): Promise<PersonResponse> {
        const { data } = await apolloClient.query<{ adminFindByEmailPerson: PersonResponse }>({
            query: FIND_BY_EMAIL_PERSON,
            variables: { email }
        });
        return data!.adminFindByEmailPerson;
    }

    async findByPhone(phone: string): Promise<PersonResponse> {
        const { data } = await apolloClient.query<{ adminFindByPhonePerson: PersonResponse }>({
            query: FIND_BY_PHONE_PERSON,
            variables: { phone }
        });
        return data!.adminFindByPhonePerson;
    }

    async save(request: PersonCreateRequest): Promise<PersonResponse> {
        const { data } = await apolloClient.mutate<{ adminSavePerson: PersonResponse }>({
            mutation: SAVE_PERSON,
            variables: { personCreateRequest: request }
        });
        return data!.adminSavePerson;
    }

    async update(uuid: string, request: PersonUpdateRequest): Promise<PersonResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdatePerson: PersonResponse }>({
            mutation: UPDATE_PERSON,
            variables: { uuid, personUpdateRequest: request }
        });
        return data!.adminUpdatePerson;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidPerson: boolean }>({
            mutation: DELETE_BY_UUID_PERSON,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidPerson;
    }
}