import { apolloClient } from "$lib/providers/graphql.provider";
import {
    USER_SEND_MESSAGE_EMAIL,
    USER_SEND_MESSAGE_PHONE,
    USER_UPDATE_DATA_RESET,
    USER_UPDATE_DATA_FIND_ALL,
    USER_UPDATE_DATA_FIND_BY_ID
} from "../queries/user-update-data";
import type { IUserUpdateDataRepo } from "../contract/user-update-data.repo";
import type {
    UserUpdateDataResponse,
    SendEmailRequest,
    SendPhoneRequest,
    UpdateDataRequest
} from "../model/user-update-data.model";

export class UserUpdateDataGqlRepo implements IUserUpdateDataRepo {

    async userSendMessageEmail(request: SendEmailRequest): Promise<UserUpdateDataResponse> {
        const { data } = await apolloClient.mutate<{ userSendMessageEmail: UserUpdateDataResponse }>({
            mutation: USER_SEND_MESSAGE_EMAIL,
            variables: { request }
        });
        return data!.userSendMessageEmail;
    }

    async userSendMessagePhone(request: SendPhoneRequest): Promise<UserUpdateDataResponse> {
        const { data } = await apolloClient.mutate<{ userSendMessagePhone: UserUpdateDataResponse }>({
            mutation: USER_SEND_MESSAGE_PHONE,
            variables: { request }
        });
        return data!.userSendMessagePhone;
    }

    async userUpdateDataReset(request: UpdateDataRequest): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ userUpdateDataReset: boolean }>({
            mutation: USER_UPDATE_DATA_RESET,
            variables: { request }
        });
        return data!.userUpdateDataReset;
    }

    async userUpdateDataFindAll(): Promise<UserUpdateDataResponse[]> {
        const { data } = await apolloClient.query<{ userUpdateDataFindAll: UserUpdateDataResponse[] }>({
            query: USER_UPDATE_DATA_FIND_ALL,
        });
        return data!.userUpdateDataFindAll;
    }

    async userUpdateDataFindById(id: string): Promise<UserUpdateDataResponse> {
        const { data } = await apolloClient.query<{ userUpdateDataFindById: UserUpdateDataResponse }>({
            query: USER_UPDATE_DATA_FIND_BY_ID,
            variables: { id }
        });
        return data!.userUpdateDataFindById;
    }
}
