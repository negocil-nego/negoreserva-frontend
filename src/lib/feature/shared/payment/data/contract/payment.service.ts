import type { IOrgPaymentRepo, PaginateRequest } from "./payment.repo";
import type { OrgPaymentResponse, OrgPaymentPaginate, PaymentRequest, PaymentFilterQueryParamInput } from "../model/payment.model";

export class IOrgPaymentService {
    private repo: IOrgPaymentRepo;

    constructor(repo: IOrgPaymentRepo) {
        this.repo = repo;
    }

    async paginate(request: PaginateRequest): Promise<OrgPaymentPaginate> {
        return await this.repo.paginate(request);
    }

    async paginatePaymentFilter(filter: PaymentFilterQueryParamInput): Promise<OrgPaymentPaginate> {
        return await this.repo.paginatePaymentFilter(filter);
    }

    async findByUuid(uuid: string): Promise<OrgPaymentResponse> {
        return await this.repo.findByUuid(uuid);
    }

    async save(request: PaymentRequest): Promise<OrgPaymentResponse> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: PaymentRequest): Promise<OrgPaymentResponse> {
        return await this.repo.update(uuid, request);
    }

    async validateReceipt(uuid: string): Promise<OrgPaymentResponse> {
        return await this.repo.validateReceipt(uuid);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        return await this.repo.deleteByUuid(uuid);
    }
}
