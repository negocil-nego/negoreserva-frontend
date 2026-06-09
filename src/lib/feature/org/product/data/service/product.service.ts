import { IOrgProductService } from "../contract/product.service";
import { OrgProductGqlRepo } from "../repository/product.gql.repo";

export class OrgProductService extends IOrgProductService {
    constructor() {
        super(new OrgProductGqlRepo())
    }
}
