import { IAdminPermissionService } from "../contract/permission.service";
import { AdminPermissionGqlRepo } from "../repository/permission.gql.repo";

export class AdminPermissionService extends IAdminPermissionService {
    constructor() {
        super(new AdminPermissionGqlRepo())
    }
}
