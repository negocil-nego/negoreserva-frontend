import type { LoginRequest, UserAuthResponse } from "../model/login.model";

export interface ILoginRepository {
    login(request: LoginRequest): Promise<UserAuthResponse>
}
