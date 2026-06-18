import { apolloClient } from "$lib/providers/graphql.provider";
import type {
  UserDeleteAccountConfirmRequest,
  UserDeleteAccountRequest,
  UserDeleteAccountResponse,
} from "../model/delete-account.model";
import type { IDeleteAccountRepository } from "../contract/delete-account.repository";
import { CONFIRM_DELETE_ACCOUNT, SEND_DELETE_ACCOUNT } from "../queries/delete-account";

export class DeleteAccountGqlRepository implements IDeleteAccountRepository {
  async sendMessageDeleteAccount(request: UserDeleteAccountRequest): Promise<UserDeleteAccountResponse> {
    const { data } = await apolloClient.mutate<{ pubSendMessageDeleteAccount: UserDeleteAccountResponse }>({
      mutation: SEND_DELETE_ACCOUNT,
      variables: { request },
    });
    return data!.pubSendMessageDeleteAccount;
  }

  async confirmDeleteAccount(request: UserDeleteAccountConfirmRequest): Promise<boolean> {
    const { data } = await apolloClient.mutate<{ pubConfirmDeleteAccount: boolean }>({
      mutation: CONFIRM_DELETE_ACCOUNT,
      variables: { request },
    });
    return data!.pubConfirmDeleteAccount;
  }
}
