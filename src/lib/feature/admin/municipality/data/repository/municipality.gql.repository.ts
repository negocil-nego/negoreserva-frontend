import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_MUNICIPALITY,
    PAGINATE_MUNICIPALITY_FILTER,
    FIND_BY_UUID_MUNICIPALITY,
    SAVE_MUNICIPALITY,
    UPDATE_MUNICIPALITY,
    DELETE_BY_UUID_MUNICIPALITY,
    LIST_PROVINCES
} from "$lib/feature/admin/municipality/data/queries/municipality";
import type { IAdminMunicipalityRepository } from "../contract/municipality.repository";
import type {
    MunicipalityResponse,
    MunicipalityPaginate,
    MunicipalityRequest,
    MunicipalityFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/location/model/location.model";

export class MunicipalityGqlRepository implements IAdminMunicipalityRepository {

    async paginate(request: PaginateRequest): Promise<MunicipalityPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateMunicipality: MunicipalityPaginate }>({
            query: PAGINATE_MUNICIPALITY,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginateMunicipality;
    }

    async paginateMunicipalityFilter(filter: MunicipalityFilterQueryParamInput): Promise<MunicipalityPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateMunicipalityFilter: MunicipalityPaginate }>({
            query: PAGINATE_MUNICIPALITY_FILTER,
            variables: { filter }
        });
        return data!.adminPaginateMunicipalityFilter;
    }

    async findByUuid(uuid: string): Promise<MunicipalityResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidMunicipality: MunicipalityResponse }>({
            query: FIND_BY_UUID_MUNICIPALITY,
            variables: { uuid }
        });
        return data!.adminFindByUuidMunicipality;
    }

    async listProvinces(): Promise<{ uuid: string; value: string; label: string }[]> {
        const { data } = await apolloClient.query<{ pubListProvince: { uuid: string; value: string; label: string }[] }>({
            query: LIST_PROVINCES,
        });
        return data!.pubListProvince;
    }

    async save(request: MunicipalityRequest): Promise<MunicipalityResponse> {
        const { data } = await apolloClient.mutate<{ adminSaveMunicipality: MunicipalityResponse }>({
            mutation: SAVE_MUNICIPALITY,
            variables: { municipalityRequest: request }
        });
        return data!.adminSaveMunicipality;
    }

    async update(uuid: string, request: MunicipalityRequest): Promise<MunicipalityResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdateMunicipality: MunicipalityResponse }>({
            mutation: UPDATE_MUNICIPALITY,
            variables: { uuid, municipalityRequest: request }
        });
        return data!.adminUpdateMunicipality;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidMunicipality: boolean }>({
            mutation: DELETE_BY_UUID_MUNICIPALITY,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidMunicipality;
    }
}
