import type { IOrgOrganizationUpdateDataRepo } from "./organization-update-data.repo";
import type {
    OrganizationDataChangeRequestResponse,
    SendEmailRequest,
    SendPhoneRequest,
    UpdateDataRequest
} from "../model/organization-update-data.model";

export class IOrgOrganizationUpdateDataService {
    private repo: IOrgOrganizationUpdateDataRepo;

    constructor(repo: IOrgOrganizationUpdateDataRepo) {
        this.repo = repo;
    }

    async orgSendMessageEmail(request: SendEmailRequest): Promise<OrganizationDataChangeRequestResponse> {
        return await this.repo.orgSendMessageEmail(request);
    }

    async orgSendMessagePhone(request: SendPhoneRequest): Promise<OrganizationDataChangeRequestResponse> {
        return await this.repo.orgSendMessagePhone(request);
    }

    async orgUpdateDataReset(request: UpdateDataRequest): Promise<boolean> {
        return await this.repo.orgUpdateDataReset(request);
    }

    async orgUpdateDataFindAll(): Promise<OrganizationDataChangeRequestResponse[]> {
        return await this.repo.orgUpdateDataFindAll();
    }

    async orgUpdateDataFindById(id: string): Promise<OrganizationDataChangeRequestResponse> {
        return await this.repo.orgUpdateDataFindById(id);
    }
}
