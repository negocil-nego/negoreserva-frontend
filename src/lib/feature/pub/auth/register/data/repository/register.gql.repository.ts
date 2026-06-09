import { apolloClient } from "$lib/providers/graphql.provider";
import {
    CONFIRM_OTP,
    CREATE_ACCOUNT_CLIENT,
    CREATE_ACCOUNT_ORGANIZATION,
    RESEND_OTP
} from "$lib/feature/pub/auth/register/data/queries/register";
import type { IRegisterRepository } from "../contract/register.repository";
import type {
    CreateAccountResponse,
    CreateAccountOrganizationInput,
    CreateAccountClientInput,
    ResendUserOtpVerificationInput,
    ConfirmUserOtpVerificationInput,
    UserAuthResponse
} from "../model/register.model";

export class RegisterGqlRepository implements IRegisterRepository {
    async createAccountOrganization(request: CreateAccountOrganizationInput): Promise<CreateAccountResponse> {
        const { data } = await apolloClient.mutate<{ pubCreateAccountOrganization: CreateAccountResponse }>({
            mutation: CREATE_ACCOUNT_ORGANIZATION,
            variables: { request }
        });
        return data!.pubCreateAccountOrganization;
    }

    async createAccountClient(request: CreateAccountClientInput): Promise<CreateAccountResponse> {
        const { data } = await apolloClient.mutate<{ pubCreateAccountClient: CreateAccountResponse }>({
            mutation: CREATE_ACCOUNT_CLIENT,
            variables: { request }
        });
        return data!.pubCreateAccountClient;
    }

    async resendOtp(request: ResendUserOtpVerificationInput): Promise<CreateAccountResponse> {
        const { data } = await apolloClient.mutate<{ pubResendOtp: CreateAccountResponse }>({ mutation: RESEND_OTP, variables: { request } });
        return data!.pubResendOtp;
    }

    async confirmOtp(request: ConfirmUserOtpVerificationInput): Promise<UserAuthResponse> {
        const { data } = await apolloClient.mutate<{ pubConfirmOtp: UserAuthResponse }>({ mutation: CONFIRM_OTP, variables: { request } });
        return data!.pubConfirmOtp;
    }
}
