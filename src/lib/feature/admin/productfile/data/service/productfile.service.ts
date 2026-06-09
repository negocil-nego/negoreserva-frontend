import { IProductFileService } from "../contract/productfile.service";
import { ProductFileGqlRepository } from "../repository/productfile.gql.repository";

export class ProductFileService extends IProductFileService {
    constructor() {
        super(new ProductFileGqlRepository())
    }
}