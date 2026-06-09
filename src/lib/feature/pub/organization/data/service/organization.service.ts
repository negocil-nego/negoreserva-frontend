import { IOrganizationManage } from "../contract/organization.service";
import { OrganizationGqlRepo } from "../repository/organization.gql.repository";

export class OrganizationManage extends IOrganizationManage {
    constructor() {
        super(new OrganizationGqlRepo());
    }
}

