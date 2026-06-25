import { IOrgPermissionService } from "../contract/permission.service";
import { OrgPermissionGqlRepo } from "../repository/permission.gql.repo";

export class OrgPermissionService extends IOrgPermissionService {
    constructor() {
        super(new OrgPermissionGqlRepo())
    }
}
