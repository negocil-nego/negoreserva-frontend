import { apolloClient } from "$lib/providers/graphql.provider";
import {
    ORG_SEND_MESSAGE_EMAIL,
    ORG_SEND_MESSAGE_PHONE,
    ORG_UPDATE_DATA_RESET,
    ORG_UPDATE_DATA_FIND_ALL,
    ORG_UPDATE_DATA_FIND_BY_ID
} from "../queries/organization-update-data";
import type { IOrgOrganizationUpdateDataRepo } from "../contract/organization-update-data.repo";
import type {
    OrganizationDataChangeRequestResponse,
    SendEmailRequest,
    SendPhoneRequest,
    UpdateDataRequest
} from "../model/organization-update-data.model";

export class OrgOrganizationUpdateDataGqlRepo implements IOrgOrganizationUpdateDataRepo {

    async orgSendMessageEmail(request: SendEmailRequest): Promise<OrganizationDataChangeRequestResponse> {
        const { data } = await apolloClient.mutate<{ orgSendMessageEmail: OrganizationDataChangeRequestResponse }>({
            mutation: ORG_SEND_MESSAGE_EMAIL,
            variables: { request }
        });
        return data!.orgSendMessageEmail;
    }

    async orgSendMessagePhone(request: SendPhoneRequest): Promise<OrganizationDataChangeRequestResponse> {
        const { data } = await apolloClient.mutate<{ orgSendMessagePhone: OrganizationDataChangeRequestResponse }>({
            mutation: ORG_SEND_MESSAGE_PHONE,
            variables: { request }
        });
        return data!.orgSendMessagePhone;
    }

    async orgUpdateDataReset(request: UpdateDataRequest): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgUpdateDataReset: boolean }>({
            mutation: ORG_UPDATE_DATA_RESET,
            variables: { request }
        });
        return data!.orgUpdateDataReset;
    }

    async orgUpdateDataFindAll(): Promise<OrganizationDataChangeRequestResponse[]> {
        const { data } = await apolloClient.query<{ orgUpdateDataFindAll: OrganizationDataChangeRequestResponse[] }>({
            query: ORG_UPDATE_DATA_FIND_ALL,
        });
        return data!.orgUpdateDataFindAll;
    }

    async orgUpdateDataFindById(id: string): Promise<OrganizationDataChangeRequestResponse> {
        const { data } = await apolloClient.query<{ orgUpdateDataFindById: OrganizationDataChangeRequestResponse }>({
            query: ORG_UPDATE_DATA_FIND_BY_ID,
            variables: { id }
        });
        return data!.orgUpdateDataFindById;
    }
}
