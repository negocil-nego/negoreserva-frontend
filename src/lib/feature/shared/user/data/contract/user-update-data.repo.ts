import type {
    UserUpdateDataResponse,
    SendEmailRequest,
    SendPhoneRequest,
    UpdateDataRequest
} from "../model/user-update-data.model";

export interface IUserUpdateDataRepo {
    userSendMessageEmail(request: SendEmailRequest): Promise<UserUpdateDataResponse>
    userSendMessagePhone(request: SendPhoneRequest): Promise<UserUpdateDataResponse>
    userUpdateDataReset(request: UpdateDataRequest): Promise<boolean>
    userUpdateDataFindAll(): Promise<UserUpdateDataResponse[]>
    userUpdateDataFindById(id: string): Promise<UserUpdateDataResponse>
}
