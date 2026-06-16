import { IAdminMunicipalityService } from "../contract/municipality.service";
import { MunicipalityGqlRepository } from "../repository/municipality.gql.repository";

export class MunicipalityService extends IAdminMunicipalityService {
    constructor() {
        super(new MunicipalityGqlRepository())
    }
}
