import type { IAdminProvinceRepository } from "./province.repository";
import type {
    ProvinceResponse,
    ProvincePaginate,
    ProvinceRequest,
    ProvinceFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/location/model/location.model";

export class IAdminProvinceService {
    private repo: IAdminProvinceRepository;

    constructor(repo: IAdminProvinceRepository) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<ProvincePaginate> {
        return await this.repo.paginate(request);
    }

    async paginateProvinceFilter(filter: ProvinceFilterQueryParamInput): Promise<ProvincePaginate> {
        return await this.repo.paginateProvinceFilter(filter);
    }

    async findByUuid(uuid: string): Promise<ProvinceResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async findByValue(value: string): Promise<ProvinceResponse> {
        return await this.repo.findByValue(value);
    }

    async save(request: ProvinceRequest): Promise<ProvinceResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: ProvinceRequest): Promise<ProvinceResponse> {
        return await this.repo.update(uuid, request);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}
