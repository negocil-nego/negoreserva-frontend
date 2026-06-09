import { ITenantService } from "../contract/tenant.service";
import { TenantGqlRepository } from "../repository/tenant.gql.repository";

export class TenantService extends ITenantService {
    constructor() {
        super(new TenantGqlRepository())
    }
}