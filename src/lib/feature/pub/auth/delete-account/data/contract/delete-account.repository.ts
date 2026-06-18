import type {
  UserDeleteAccountConfirmRequest,
  UserDeleteAccountRequest,
  UserDeleteAccountResponse,
} from "../model/delete-account.model";

export interface IDeleteAccountRepository {
  sendMessageDeleteAccount(request: UserDeleteAccountRequest): Promise<UserDeleteAccountResponse>;
  confirmDeleteAccount(request: UserDeleteAccountConfirmRequest): Promise<boolean>;
}
