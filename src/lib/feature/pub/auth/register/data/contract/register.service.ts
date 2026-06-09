import type { IRegisterRepository } from "./register.repository";
import type {
    CreateAccountResponse,
    CreateAccountOrganizationInput,
    CreateAccountClientInput,
    ResendUserOtpVerificationInput,
    ConfirmUserOtpVerificationInput,
    UserAuthResponse
} from "../model/register.model";

export class IRegisterService {
    private repo: IRegisterRepository;

    constructor(repo: IRegisterRepository) {
        this.repo = repo;
    }

    async createAccountOrganization(request: CreateAccountOrganizationInput): Promise<CreateAccountResponse> {
        return await this.repo.createAccountOrganization(request);
    }

    async createAccountClient(request: CreateAccountClientInput): Promise<CreateAccountResponse> {
        return await this.repo.createAccountClient(request);
    }

    async resendOtp(request: ResendUserOtpVerificationInput): Promise<CreateAccountResponse> {
        return await this.repo.resendOtp(request);
    }

    async confirmOtp(request: ConfirmUserOtpVerificationInput): Promise<UserAuthResponse> {
        return await this.repo.confirmOtp(request);
    }
}
