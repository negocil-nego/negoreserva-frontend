import { IOrgRoleService } from "../contract/role.service";
import { OrgRoleGqlRepo } from "../repository/role.gql.repo";

export class OrgRoleService extends IOrgRoleService {
    constructor() {
        super(new OrgRoleGqlRepo())
    }
}
