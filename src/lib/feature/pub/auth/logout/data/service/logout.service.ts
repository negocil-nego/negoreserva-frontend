import { ILogoutService } from "../contract/logout.service";
import { LogoutGqlRepository } from "../repository/logout.gql.repository";

export class LogoutService extends ILogoutService {
    constructor() {
        super(new LogoutGqlRepository())
    }
}
