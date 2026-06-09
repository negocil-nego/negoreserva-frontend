import { apolloClient } from "$lib/providers/graphql.provider";
import type { IOrgPaymentRepo, PaginateRequest } from "../contract/payment.repo";
import type { OrgPaymentResponse, OrgPaymentPaginate, PaymentRequest, PaymentFilterQueryParamInput } from "../model/payment.model";
import { ORG_PAYMENT_FILTER_PAGINATE, FIND_BY_UUID_PAYMENT, SAVE_PAYMENT, UPDATE_PAYMENT, VALIDATE_PAYMENT_RECEIPT, DELETE_PAYMENT } from "../queries/payment";

export class OrgPaymentGqlRepo implements IOrgPaymentRepo {

    async paginate(request: PaginateRequest): Promise<OrgPaymentPaginate> {
        const { data } = await apolloClient.query<{ orgPaginatePaymentFilter: OrgPaymentPaginate }>({
            query: ORG_PAYMENT_FILTER_PAGINATE,
            variables: { filter: { pageNumber: request.pageNumber, pageSize: request.pageSize } }
        });
        return data!.orgPaginatePaymentFilter;
    }

    async paginatePaymentFilter(filter: PaymentFilterQueryParamInput): Promise<OrgPaymentPaginate> {
        const { data } = await apolloClient.query<{ orgPaginatePaymentFilter: OrgPaymentPaginate }>({
            query: ORG_PAYMENT_FILTER_PAGINATE,
            variables: { filter }
        });
        return data!.orgPaginatePaymentFilter;
    }

    async findByUuid(uuid: string): Promise<OrgPaymentResponse> {
        const { data } = await apolloClient.query<{ orgFindByUuidPayment: OrgPaymentResponse }>({
            query: FIND_BY_UUID_PAYMENT,
            variables: { uuid }
        });
        return data!.orgFindByUuidPayment;
    }

    async save(request: PaymentRequest): Promise<OrgPaymentResponse> {
        const { data } = await apolloClient.mutate<{ orgSavePayment: OrgPaymentResponse }>({
            mutation: SAVE_PAYMENT,
            variables: { request }
        });
        return data!.orgSavePayment;
    }

    async update(uuid: string, request: PaymentRequest): Promise<OrgPaymentResponse> {
        const { data } = await apolloClient.mutate<{ orgUpdatePayment: OrgPaymentResponse }>({
            mutation: UPDATE_PAYMENT,
            variables: { uuid, request }
        });
        return data!.orgUpdatePayment;
    }

    async validateReceipt(uuid: string): Promise<OrgPaymentResponse> {
        const { data } = await apolloClient.mutate<{ orgValidatePaymentReceipt: OrgPaymentResponse }>({
            mutation: VALIDATE_PAYMENT_RECEIPT,
            variables: { uuid }
        });
        return data!.orgValidatePaymentReceipt;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ orgDeleteByUuidPayment: boolean }>({
            mutation: DELETE_PAYMENT,
            variables: { uuid }
        });
        return data!.orgDeleteByUuidPayment;
    }
}
