import { IOrgPaymentService } from "../contract/payment.service";
import { OrgPaymentGqlRepo } from "../repository/payment.gql.repo";

export class OrgPaymentService extends IOrgPaymentService {
    constructor() {
        super(new OrgPaymentGqlRepo())
    }
}
