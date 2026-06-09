import type { IUserUpdateDataRepo } from "./user-update-data.repo";
import type {
    UserUpdateDataResponse,
    SendEmailRequest,
    SendPhoneRequest,
    UpdateDataRequest
} from "../model/user-update-data.model";

export class IUserUpdateDataService {
    private repo: IUserUpdateDataRepo;

    constructor(repo: IUserUpdateDataRepo) {
        this.repo = repo;
    }

    async userSendMessageEmail(request: SendEmailRequest): Promise<UserUpdateDataResponse> {
        return await this.repo.userSendMessageEmail(request);
    }

    async userSendMessagePhone(request: SendPhoneRequest): Promise<UserUpdateDataResponse> {
        return await this.repo.userSendMessagePhone(request);
    }

    async userUpdateDataReset(request: UpdateDataRequest): Promise<boolean> {
        return await this.repo.userUpdateDataReset(request);
    }

    async userUpdateDataFindAll(): Promise<UserUpdateDataResponse[]> {
        return await this.repo.userUpdateDataFindAll();
    }

    async userUpdateDataFindById(id: string): Promise<UserUpdateDataResponse> {
        return await this.repo.userUpdateDataFindById(id);
    }
}
