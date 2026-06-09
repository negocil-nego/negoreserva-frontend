import { gql } from "@apollo/client/core";

export const USER_SEND_MESSAGE_EMAIL = gql`
  mutation userSendMessageEmail($request: SendEmailRequest!) {
    userSendMessageEmail(request: $request) {
      id
      userId
      input
      code
      type
      expiredAt
    }
  }
`;

export const USER_SEND_MESSAGE_PHONE = gql`
  mutation userSendMessagePhone($request: SendPhoneRequest!) {
    userSendMessagePhone(request: $request) {
      id
      userId
      input
      code
      type
      expiredAt
    }
  }
`;

export const USER_UPDATE_DATA_RESET = gql`
  mutation userUpdateDataReset($request: UpdateDataRequest!) {
    userUpdateDataReset(request: $request)
  }
`;

export const USER_UPDATE_DATA_FIND_ALL = gql`
  query userUpdateDataFindAll {
    userUpdateDataFindAll {
      id
      userId
      input
      code
      type
      expiredAt
    }
  }
`;

export const USER_UPDATE_DATA_FIND_BY_ID = gql`
  query userUpdateDataFindById($id: ID!) {
    userUpdateDataFindById(id: $id) {
      id
      userId
      input
      code
      type
      expiredAt
    }
  }
`;
