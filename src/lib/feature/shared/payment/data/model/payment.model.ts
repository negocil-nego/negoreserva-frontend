export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELED = "CANCELED",
    RECEIPT_VALID = "RECEIPT_VALID",
}

export enum PaymentMethod {
    NONE = "NONE",
    RECEIPT = "RECEIPT",
    MULTICAIXA_EXPRESS = "MULTICAIXA_EXPRESS",
    REFERENCIA = "REFERENCIA",
}

export interface OrganizationResponse {
    uuid: string;
    name: string;
    email: string;
    description?: string | null;
    phone: string;
    address?: string | null;
    rating?: number | null;
    logo?: string | null;
    image?: string | null;
    video?: string | null;
}

export interface TransactionResponse {
    uuid: string;
    code: string;
    product: {
        uuid: string;
        name: string;
        slug: string;
        description?: string | null;
        organization: OrganizationResponse;
    };
    user: {
        uuid: string;
        name: string;
        email: string;
        phone: string;
    };
    amount: number;
    price: number;
}

export interface PaymentFileReceiptResponse {
    uuid: string;
    fileUrl: string;
    type?: string | null;
    size?: number | null;
}

export interface OrgPaymentResponse {
    uuid: string;
    transaction: TransactionResponse;
    status: PaymentStatus;
    type: PaymentMethod;
    paymentFileReceipt: PaymentFileReceiptResponse | null;
}

export interface OrgPaymentPaginate {
    content: OrgPaymentResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface PaymentRequest {
    transactionUuid: string;
    type: PaymentMethod;
}

export interface PaymentFilterQueryParamInput {
    field?: string;
    search?: string;
    pageSize?: number;
    pageNumber?: number;
}

export interface PaginateRequest {
    pageNumber: number;
    pageSize: number;
}

export const ORG_PAYMENT_RESPONSE_EMPTY: OrgPaymentResponse = {
    uuid: "",
    transaction: {
        uuid: "",
        code: "",
        product: {
            uuid: "",
            name: "",
            slug: "",
            description: "",
            organization: {
                uuid: "",
                name: "",
                email: "",
                phone: "",
            },
        },
        user: {
            uuid: "",
            name: "",
            email: "",
            phone: "",
        },
        amount: 0,
        price: 0,
    },
    status: PaymentStatus.PENDING,
    type: PaymentMethod.RECEIPT,
    paymentFileReceipt: null,
};
