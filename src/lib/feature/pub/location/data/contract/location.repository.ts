export interface LocationItem {
  uuid: string;
  value: string;
  label: string;
}

export interface ILocationRepository {
  listProvinces(): Promise<LocationItem[]>;
  listMunicipalitiesByProvince(provinceUuid: string): Promise<LocationItem[]>;
}
