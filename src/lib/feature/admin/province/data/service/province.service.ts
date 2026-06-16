import { IAdminProvinceService } from "../contract/province.service";
import { ProvinceGqlRepository } from "../repository/province.gql.repository";

export class ProvinceService extends IAdminProvinceService {
    constructor() {
        super(new ProvinceGqlRepository())
    }
}
