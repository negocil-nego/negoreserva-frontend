import { IUserService } from "../contract/user.service";
import { UserGqlRepo } from "../repository/user.gql.repo";

export class UserService extends IUserService {
    constructor() {
        super(new UserGqlRepo())
    }
}