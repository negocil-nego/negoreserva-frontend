import { IResetPasswordService } from "../contract/reset-password.service";
import { ResetPasswordGqlRepository } from "../repository/reset-password.gql.repository";

export class ResetPasswordService extends IResetPasswordService {
    constructor() {
        super(new ResetPasswordGqlRepository());
    }
}
