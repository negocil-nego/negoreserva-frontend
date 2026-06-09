import { IOrgCatalogService } from "../contract/catalog.service";
import { OrgCatalogGqlRepo } from "../repository/catalog.gql.repo";

export class OrgCatalogService extends IOrgCatalogService {
    constructor() {
        super(new OrgCatalogGqlRepo())
    }
}
