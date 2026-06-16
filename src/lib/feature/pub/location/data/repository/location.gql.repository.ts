import { apolloClient } from "$lib/providers/graphql.provider";
import {
  PUB_LIST_PROVINCE,
  PUB_LIST_MUNICIPALITY_BY_PROVINCE
} from "../queries/location";
import type { ILocationRepository, LocationItem } from "../contract/location.repository";

export class LocationGqlRepository implements ILocationRepository {
  async listProvinces(): Promise<LocationItem[]> {
    const { data } = await apolloClient.query<{ pubListProvince: LocationItem[] }>({
      query: PUB_LIST_PROVINCE,
      fetchPolicy: "cache-first",
    });
    return data?.pubListProvince ?? [];
  }

  async listMunicipalitiesByProvince(provinceValue: string): Promise<LocationItem[]> {
    const { data } = await apolloClient.query<{ pubListMunicipalityByProvince: LocationItem[] }>({
      query: PUB_LIST_MUNICIPALITY_BY_PROVINCE,
      variables: { provinceValue },
      fetchPolicy: "cache-first",
    });
    return data?.pubListMunicipalityByProvince ?? [];
  }
}
