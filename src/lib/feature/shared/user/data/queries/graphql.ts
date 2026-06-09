import { gql } from "@apollo/client/core";

export const UPDATE_USER = gql`
  mutation userUpdate($request: UserEditProfileRequest!) {
    userUpdate(request: $request) {
      uuid
      name
      email
      phone
    }
  }
`;

export const USER_RESET_PASSWORD_CURRENT = gql`
  mutation userRestPassword($request: UserResetPasswordCurrentRequest!) {
    userRestPassword(request: $request) {
      uuid
      name
      email
      phone
    }
  }
`;