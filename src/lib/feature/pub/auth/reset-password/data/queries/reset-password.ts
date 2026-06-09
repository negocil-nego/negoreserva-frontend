import { gql } from "@apollo/client/core";

export const SEND_FORGET_RESET_PASSWORD = gql`
    mutation pubResetPassword($request: UserResetPasswordRequest!) {
        pubResetPassword(request: $request)
    }
`;

export const SEND_RESET_PASSWORD_LOGGED = gql`
    mutation userResetPassword($request: UserResetPasswordLoggedInput!) {
        userResetPassword(request: $request)
    }
`;