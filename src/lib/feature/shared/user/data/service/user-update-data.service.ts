import { IUserUpdateDataService } from "../contract/user-update-data.service";
import { UserUpdateDataGqlRepo } from "../repository/user-update-data.gql.repo";

export class UserUpdateDataService extends IUserUpdateDataService {
    constructor() {
        super(new UserUpdateDataGqlRepo())
    }
}
