import { gql } from "@apollo/client/core";

export const CREATE_ACCOUNT_ORGANIZATION = gql`
    mutation pubCreateAccountOrganization($request: CreateAccountOrganizationInput!) {
        pubCreateAccountOrganization(request: $request) {
            otpId
            userId
            token
            otpExpiredAt
            status
            expiredAt
        }
    }
`;

export const CREATE_ACCOUNT_CLIENT = gql`
    mutation pubCreateAccountClient($request: CreateAccountClientInput!) {
        pubCreateAccountClient(request: $request) {
            otpId
            userId
            token
            otpExpiredAt
            status
            expiredAt
        }
    }
`;

export const RESEND_OTP = gql`
    mutation pubResendOtp($request: ResendUserOtpVerificationInput!) {
        pubResendOtp(request: $request) {
            otpId
            userId
            token
            otpExpiredAt
            status
            expiredAt
        }
    }
`;

export const CONFIRM_OTP = gql`
    mutation pubConfirmOtp($request: ConfirmUserOtpVerificationInput!) {
        pubConfirmOtp(request: $request) {
            token
            name
            email
            type
            status
            logo
            expiredAt
        }
    }
`;