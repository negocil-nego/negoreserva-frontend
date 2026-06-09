import { axiosClient } from "$lib/providers/http-cliente.provider";
import { OrgCatalogRouteNamed } from "../queries/rest";

export async function useCreateCatalog(name: string, description: string, image?: File | null) {
    const formData = new FormData();
    const catalogBlob = new Blob([JSON.stringify({ name, description })], { type: "application/json" });
    formData.append("catalog", catalogBlob);
    if (image) {
        formData.append("image", image);
    }
    const { data } = await axiosClient.post(OrgCatalogRouteNamed.PATH, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
}
