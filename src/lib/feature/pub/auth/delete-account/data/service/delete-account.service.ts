import { IDeleteAccountService } from "../contract/delete-account.service";
import { DeleteAccountGqlRepository } from "../repository/delete-account.gql.repository";

export class DeleteAccountService extends IDeleteAccountService {
  constructor() {
    super(new DeleteAccountGqlRepository());
  }
}
