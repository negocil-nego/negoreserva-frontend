export interface CreateAccountResponse {
    otpId: string;
    userId: string;
    token: string;
    otpExpiredAt: string;
    status: boolean;
    expiredAt: string;
}

export enum UserType {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT",
    ORGANIZATION = "ORGANIZATION",
}

export enum UserStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    BLOCKED = "BLOCKED",
}

export interface UserAuthResponse {
    token: string;
    name: string;
    email: string;
    type: UserType;
    status: UserStatus;
    logo: string;
    expiredAt: string;
}

export interface CreateAccountOrganizationInput {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
    categories: string[];
}

export interface ConfirmUserOtpVerificationInput {
    otpId: string;
    code: string;
}

export interface CreateAccountClientInput {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
}

export interface ResendUserOtpVerificationInput {
    otpId: string;
    userId: string;
}