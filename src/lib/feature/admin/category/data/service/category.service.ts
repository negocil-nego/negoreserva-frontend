import { IAdminCategoryService } from "../contract/category.service";
import { CategoryGqlRepository } from "../repository/category.gql.repository";

export class CategoryService extends IAdminCategoryService {
    constructor() {
        super(new CategoryGqlRepository())
    }
}
