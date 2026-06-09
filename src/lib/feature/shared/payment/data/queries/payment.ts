import { gql } from "@apollo/client/core";

export const PAYMENT_FILE_RECEIPT_FIELDS = gql`
  fragment PaymentFileReceiptFields on PaymentFileReceiptResponse {
    uuid
    fileUrl
    type
    size
  }
`;

export const PRODUCT_ORG_FIELDS = gql`
  fragment ProductOrgFields on TransactionResponse {
    uuid
    code
    product {
      uuid
      name
      slug
      description
      organization {
        uuid
        name
        email
        description
        phone
        address
        rating
        logo
        image
        video
      }
    }
    user {
      uuid
      name
      email
      phone
    }
    amount
    price
  }
`;

export const PAYMENT_CONTENT_FIELDS = gql`
  fragment PaymentContentFields on OrgPaymentResponse {
    uuid
    transaction {
      ...ProductOrgFields
    }
    status
    type
    paymentFileReceipt {
      ...PaymentFileReceiptFields
    }
  }
  ${PRODUCT_ORG_FIELDS}
  ${PAYMENT_FILE_RECEIPT_FIELDS}
`;

export const ORG_PAYMENT_FILTER_PAGINATE = gql`
  query orgPaginatePaymentFilter($filter: PaymentFilterQueryParamInput) {
    orgPaginatePaymentFilter(filter: $filter) {
      content {
        ...PaymentContentFields
      }
      empty
      first
      last
      number
      numberOfElements
      size
      totalElements
      totalPages
    }
  }
  ${PAYMENT_CONTENT_FIELDS}
`;

export const FIND_BY_UUID_PAYMENT = gql`
  query orgFindByUuidPayment($uuid: ID!) {
    orgFindByUuidPayment(uuid: $uuid) {
      ...PaymentContentFields
    }
  }
  ${PAYMENT_CONTENT_FIELDS}
`;

export const SAVE_PAYMENT = gql`
  mutation orgSavePayment($request: PaymentRequest!) {
    orgSavePayment(request: $request) {
      ...PaymentContentFields
    }
  }
  ${PAYMENT_CONTENT_FIELDS}
`;

export const UPDATE_PAYMENT = gql`
  mutation orgUpdatePayment($uuid: ID!, $request: PaymentRequest!) {
    orgUpdatePayment(uuid: $uuid, request: $request) {
      ...PaymentContentFields
    }
  }
  ${PAYMENT_CONTENT_FIELDS}
`;

export const DELETE_PAYMENT = gql`
  mutation orgDeleteByUuidPayment($uuid: ID!) {
    orgDeleteByUuidPayment(uuid: $uuid)
  }
`;

export const VALIDATE_PAYMENT_RECEIPT = gql`
  mutation orgValidatePaymentReceipt($uuid: ID!) {
    orgValidatePaymentReceipt(uuid: $uuid) {
      ...PaymentContentFields
    }
  }
  ${PAYMENT_CONTENT_FIELDS}
`;
