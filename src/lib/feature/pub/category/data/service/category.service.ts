import { ICategoryManage } from "../contract/category.service";
import { CategoryGqlRepo } from "../repository/category.gql.repository";

export class CategoryManage extends ICategoryManage {
    constructor() {
        super(new CategoryGqlRepo())
    }
}
