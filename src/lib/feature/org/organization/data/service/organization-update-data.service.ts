import { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import { OrgOrganizationUpdateDataGqlRepo } from "../repository/organization-update-data.gql.repo";

export class OrgOrganizationUpdateDataService extends IOrgOrganizationUpdateDataService {
    constructor() {
        super(new OrgOrganizationUpdateDataGqlRepo())
    }
}
