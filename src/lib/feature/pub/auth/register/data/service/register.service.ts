import { IRegisterService } from "../contract/register.service";
import { RegisterGqlRepository } from "../repository/register.gql.repository";

export class RegisterService extends IRegisterService {
    constructor() {
        super(new RegisterGqlRepository())
    }
}
