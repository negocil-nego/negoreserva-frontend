import type { UserAuthResponse } from "$lib/feature/pub/auth/register/data/model/register.model";

export interface LoginRequest {
    username: string;
    password: string;
}

export type { UserAuthResponse };
