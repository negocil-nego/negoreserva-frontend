import { IOrgOrganizationService } from "../contract/organization.service";
import { OrgOrganizationGqlRepo } from "../repository/organization.gql.repo";

export class OrgOrganizationService extends IOrgOrganizationService {
    constructor() {
        super(new OrgOrganizationGqlRepo())
    }
}