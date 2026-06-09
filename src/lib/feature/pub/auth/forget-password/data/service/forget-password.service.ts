import { IForgetPasswordService } from "../contract/forget-password.service";
import { ForgetPasswordGqlRepository } from "../repository/forget-password.gql.repository";

export class ForgetPasswordService extends IForgetPasswordService {
    constructor() {
        super(new ForgetPasswordGqlRepository())
    }
}
