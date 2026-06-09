import { IProductService } from "../contract/product.service";
import { ProductGqlRepository } from "../repository/product.gql.repository";

export class ProductService extends IProductService {
    constructor() {
        super(new ProductGqlRepository())
    }
}