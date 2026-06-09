export interface UserUpdateDataResponse {
    id: string;
    userId?: string | null;
    input?: string | null;
    code?: string | null;
    type?: string | null;
    expiredAt?: string | null;
}

export interface SendEmailRequest {
    input: string;
}

export interface SendPhoneRequest {
    input: string;
}

export interface UpdateDataRequest {
    id: string;
    otp: string;
}
