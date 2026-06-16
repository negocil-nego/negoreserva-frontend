import { ILocationManage } from "../contract/location.service";
import { LocationGqlRepository } from "../repository/location.gql.repository";

export class LocationManage extends ILocationManage {
  constructor() {
    super(new LocationGqlRepository());
  }
}
