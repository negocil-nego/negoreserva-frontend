import { IPlanService } from "../contract/plan.service";
import { PlanGqlRepository } from "../repository/plan.gql.repository";

export class PlanService extends IPlanService {
    constructor() {
        super(new PlanGqlRepository())
    }
}