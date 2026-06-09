import { gql } from "@apollo/client/core";

export const LOGIN = gql`
    mutation pubLogin($request: LoginRequest!) {
        pubLogin(request: $request) {
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
