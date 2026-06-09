import type { OrganizationResponse } from "$lib/feature/pub/organization/data/model/organization.model";
import { axiosClient } from "$lib/providers/http-cliente.provider";
import { OrgOrganizationRouteNamed } from "../queries/rest";

export async function useUpdateImageOrganization(file: File): Promise<OrganizationResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosClient.post<OrganizationResponse>(
        OrgOrganizationRouteNamed.UPDATE_IMAGE,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return data;
}