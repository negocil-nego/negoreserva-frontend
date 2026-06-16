import type { IAdminMunicipalityRepository } from "./municipality.repository";
import type {
    MunicipalityResponse,
    MunicipalityPaginate,
    MunicipalityRequest,
    MunicipalityFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/location/model/location.model";

export class IAdminMunicipalityService {
    private repo: IAdminMunicipalityRepository;

    constructor(repo: IAdminMunicipalityRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<MunicipalityPaginate> {
        return await this.repo.paginate(request);
    }

    async paginateMunicipalityFilter(filter: MunicipalityFilterQueryParamInput): Promise<MunicipalityPaginate> {
        return await this.repo.paginateMunicipalityFilter(filter);
    }

    async findByUuid(uuid: string): Promise<MunicipalityResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async save(request: MunicipalityRequest): Promise<MunicipalityResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: MunicipalityRequest): Promise<MunicipalityResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }

    async listProvinces(): Promise<{ uuid: string; value: string; label: string }[]> {
        return await this.repo.listProvinces();
    }
}
