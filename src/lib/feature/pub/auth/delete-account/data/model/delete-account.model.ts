export interface UserDeleteAccountRequest {
  input: string;
}

export interface UserDeleteAccountConfirmRequest {
  input: string;
  code: string;
  password: string;
}

export interface UserDeleteAccountResponse {
  input: string;
  expiredAt: string;
}
