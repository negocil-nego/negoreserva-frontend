import type { ILocationRepository, LocationItem } from "./location.repository";

export abstract class ILocationManage {
  protected repo: ILocationRepository;

  constructor(repo: ILocationRepository) {
    this.repo = repo;
  }

  async listProvinces(): Promise<LocationItem[]> {
    return this.repo.listProvinces();
  }

  async listMunicipalitiesByProvince(provinceValue: string): Promise<LocationItem[]> {
    return this.repo.listMunicipalitiesByProvince(provinceValue);
  }
}
