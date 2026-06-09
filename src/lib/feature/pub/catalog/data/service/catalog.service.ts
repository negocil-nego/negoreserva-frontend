import { ICatalogManage } from "../contract/catalog.service";
import { CatalogGqlRepo } from "../repository/catalog.gql.repository";

export class CatalogManage extends ICatalogManage {
    constructor() {
        super(new CatalogGqlRepo());
    }
}
