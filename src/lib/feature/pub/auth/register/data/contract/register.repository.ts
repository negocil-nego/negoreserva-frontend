import type {
    CreateAccountResponse,
    CreateAccountOrganizationInput,
    CreateAccountClientInput,
    ResendUserOtpVerificationInput,
    ConfirmUserOtpVerificationInput,
    UserAuthResponse
} from "../model/register.model";

export interface IRegisterRepository {
    createAccountOrganization(request: CreateAccountOrganizationInput): Promise<CreateAccountResponse>
    createAccountClient(request: CreateAccountClientInput): Promise<CreateAccountResponse>
    resendOtp(request: ResendUserOtpVerificationInput): Promise<CreateAccountResponse>
    confirmOtp(request: ConfirmUserOtpVerificationInput): Promise<UserAuthResponse>
}
