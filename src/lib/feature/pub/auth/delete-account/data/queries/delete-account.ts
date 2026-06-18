import { gql } from "@apollo/client/core";

export const SEND_DELETE_ACCOUNT = gql`
  mutation pubSendMessageDeleteAccount($request: UserDeleteAccountRequest!) {
    pubSendMessageDeleteAccount(request: $request) {
      input
      expiredAt
    }
  }
`;

export const CONFIRM_DELETE_ACCOUNT = gql`
  mutation pubConfirmDeleteAccount($request: UserDeleteAccountConfirmRequest!) {
    pubConfirmDeleteAccount(request: $request)
  }
`;
