import { API_VERSION } from "$lib/data/variables";
import { axiosClient } from "$lib/providers/http-cliente.provider";
import type { AccountSituationResponse } from "../model/account-situation.model";

export class MeService {
    async accountSituations(): Promise<AccountSituationResponse[]> {
        const { data } = await axiosClient.get<AccountSituationResponse[]>(`${API_VERSION}/me`);
        return data;
    }
}
