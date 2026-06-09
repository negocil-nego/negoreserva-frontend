import { gql } from "@apollo/client/core";

export const ORG_SEND_MESSAGE_EMAIL = gql`
  mutation orgSendMessageEmail($request: SendEmailRequest!) {
    orgSendMessageEmail(request: $request) {
      id
      organizationId
      input
      code
      type
      expiredAt
    }
  }
`;

export const ORG_SEND_MESSAGE_PHONE = gql`
  mutation orgSendMessagePhone($request: SendPhoneRequest!) {
    orgSendMessagePhone(request: $request) {
      id
      organizationId
      input
      code
      type
      expiredAt
    }
  }
`;

export const ORG_UPDATE_DATA_RESET = gql`
  mutation orgUpdateDataReset($request: UpdateDataRequest!) {
    orgUpdateDataReset(request: $request)
  }
`;

export const ORG_UPDATE_DATA_FIND_ALL = gql`
  query orgUpdateDataFindAll {
    orgUpdateDataFindAll {
      id
      organizationId
      input
      code
      type
      expiredAt
    }
  }
`;

export const ORG_UPDATE_DATA_FIND_BY_ID = gql`
  query orgUpdateDataFindById($id: ID!) {
    orgUpdateDataFindById(id: $id) {
      id
      organizationId
      input
      code
      type
      expiredAt
    }
  }
`;
