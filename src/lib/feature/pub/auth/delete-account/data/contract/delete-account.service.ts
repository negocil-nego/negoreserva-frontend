import type {
  UserDeleteAccountConfirmRequest,
  UserDeleteAccountRequest,
  UserDeleteAccountResponse,
} from "../model/delete-account.model";
import type { IDeleteAccountRepository } from "./delete-account.repository";

export class IDeleteAccountService {
  private repo: IDeleteAccountRepository;

  constructor(repo: IDeleteAccountRepository) {
    this.repo = repo;
  }

  async sendMessageDeleteAccount(request: UserDeleteAccountRequest): Promise<UserDeleteAccountResponse> {
    return await this.repo.sendMessageDeleteAccount(request);
  }

  async confirmDeleteAccount(request: UserDeleteAccountConfirmRequest): Promise<boolean> {
    return await this.repo.confirmDeleteAccount(request);
  }
}
