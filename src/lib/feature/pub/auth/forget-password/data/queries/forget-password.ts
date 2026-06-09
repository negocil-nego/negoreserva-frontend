import { gql } from "@apollo/client/core";

export const SEND_FORGET_PASSWORD = gql`
    mutation pubSendMessageForgetPassword($request: UserForgetPasswordRequest!) {
        pubSendMessageForgetPassword(request: $request)
    }
`;
