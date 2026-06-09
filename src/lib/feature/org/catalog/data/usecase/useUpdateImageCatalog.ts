import { axiosClient } from "$lib/providers/http-cliente.provider";
import { OrgCatalogRouteNamed } from "../queries/rest";

export async function useUpdateImageCatalog(uuid: string, file: File) {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axiosClient.post(
        `${OrgCatalogRouteNamed.UPDATE_IMAGE}?uuid=${uuid}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data;
}
