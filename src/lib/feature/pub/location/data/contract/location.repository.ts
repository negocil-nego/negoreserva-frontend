export interface LocationItem {
  uuid: string;
  value: string;
  label: string;
}

export interface ILocationRepository {
  listProvinces(): Promise<LocationItem[]>;
  listMunicipalitiesByProvince(provinceValue: string): Promise<LocationItem[]>;
}
