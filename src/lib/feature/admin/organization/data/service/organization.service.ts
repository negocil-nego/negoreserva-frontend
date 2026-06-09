import { IAdminOrganizationService } from "../contract/organization.service";
import { AdminOrganizationGqlRepo } from "../repository/organization.gql.repository";

export class OrganizationService extends IAdminOrganizationService {
    constructor() {
        super(new AdminOrganizationGqlRepo())
    }
}