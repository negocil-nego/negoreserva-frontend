import type { OrgPaymentResponse, OrgPaymentPaginate, PaymentRequest, PaymentFilterQueryParamInput } from "../model/payment.model";

export interface IOrgPaymentRepo {
    paginate(request: PaginateRequest): Promise<OrgPaymentPaginate>
    paginatePaymentFilter(filter: PaymentFilterQueryParamInput): Promise<OrgPaymentPaginate>
    findByUuid(uuid: string): Promise<OrgPaymentResponse>
    save(request: PaymentRequest): Promise<OrgPaymentResponse>
    update(uuid: string, request: PaymentRequest): Promise<OrgPaymentResponse>
    validateReceipt(uuid: string): Promise<OrgPaymentResponse>
    deleteByUuid(uuid: string): Promise<boolean>
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}
