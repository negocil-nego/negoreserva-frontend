import type {
    OrganizationDataChangeRequestResponse,
    SendEmailRequest,
    SendPhoneRequest,
    UpdateDataRequest
} from "../model/organization-update-data.model";

export interface IOrgOrganizationUpdateDataRepo {
    orgSendMessageEmail(request: SendEmailRequest): Promise<OrganizationDataChangeRequestResponse>
    orgSendMessagePhone(request: SendPhoneRequest): Promise<OrganizationDataChangeRequestResponse>
    orgUpdateDataReset(request: UpdateDataRequest): Promise<boolean>
    orgUpdateDataFindAll(): Promise<OrganizationDataChangeRequestResponse[]>
    orgUpdateDataFindById(id: string): Promise<OrganizationDataChangeRequestResponse>
}
