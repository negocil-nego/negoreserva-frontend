import { IProductManage } from "../contract/product.service";
import { ProductGqlRepo } from "../repository/product.gql.repository";

export class ProductManage extends IProductManage {
    constructor() {
        super(new ProductGqlRepo());
    }
}
