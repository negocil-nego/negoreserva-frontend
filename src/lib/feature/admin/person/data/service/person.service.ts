import { IAdminPersonService } from "../contract/person.service";
import { PersonGqlRepository } from "../repository/person.gql.repository";

export class PersonService extends IAdminPersonService {
    constructor() {
        super(new PersonGqlRepository())
    }
}