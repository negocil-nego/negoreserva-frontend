import type { UserResponse } from "$lib/feature/shared/user/data/model/user.model";
import { axiosClient } from "$lib/providers/http-cliente.provider";
import { UserRouteNamed } from "../queries/rest";

export async function useUpdateLogoUser(file: File): Promise<UserResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosClient.put<UserResponse>(
        UserRouteNamed.UPDATE_LOGO,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return data;
}