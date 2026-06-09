import { ILoginService } from "../contract/login.service";
import { LoginGqlRepository } from "../repository/login.gql.repository";

export class LoginService extends ILoginService {
    constructor() {
        super(new LoginGqlRepository())
    }
}
