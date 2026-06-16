import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_PROVINCE,
    PAGINATE_PROVINCE_FILTER,
    FIND_BY_UUID_PROVINCE,
    FIND_BY_VALUE_PROVINCE,
    SAVE_PROVINCE,
    UPDATE_PROVINCE,
    DELETE_BY_UUID_PROVINCE
} from "$lib/feature/admin/province/data/queries/province";
import type { IAdminProvinceRepository } from "../contract/province.repository";
import type {
    ProvinceResponse,
    ProvincePaginate,
    ProvinceRequest,
    ProvinceFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/location/model/location.model";

export class ProvinceGqlRepository implements IAdminProvinceRepository {

    async paginate(request: PaginateRequest): Promise<ProvincePaginate> {
        const { data } = await apolloClient.query<{ adminPaginateProvince: ProvincePaginate }>({
            query: PAGINATE_PROVINCE,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginateProvince;
    }

    async paginateProvinceFilter(filter: ProvinceFilterQueryParamInput): Promise<ProvincePaginate> {
        const { data } = await apolloClient.query<{ adminPaginateProvinceFilter: ProvincePaginate }>({
            query: PAGINATE_PROVINCE_FILTER,
            variables: { filter }
        });
        return data!.adminPaginateProvinceFilter;
    }

    async findByUuid(uuid: string): Promise<ProvinceResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidProvince: ProvinceResponse }>({
            query: FIND_BY_UUID_PROVINCE,
            variables: { uuid }
        });
        return data!.adminFindByUuidProvince;
    }

    async findByValue(value: string): Promise<ProvinceResponse> {
        const { data } = await apolloClient.query<{ adminFindByValueProvince: ProvinceResponse }>({
            query: FIND_BY_VALUE_PROVINCE,
            variables: { value }
        });
        return data!.adminFindByValueProvince;
    }

    async save(request: ProvinceRequest): Promise<ProvinceResponse> {
        const { data } = await apolloClient.mutate<{ adminSaveProvince: ProvinceResponse }>({
            mutation: SAVE_PROVINCE,
            variables: { provinceRequest: request }
        });
        return data!.adminSaveProvince;
    }

    async update(uuid: string, request: ProvinceRequest): Promise<ProvinceResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdateProvince: ProvinceResponse }>({
            mutation: UPDATE_PROVINCE,
            variables: { uuid, provinceRequest: request }
        });
        return data!.adminUpdateProvince;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidProvince: boolean }>({
            mutation: DELETE_BY_UUID_PROVINCE,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidProvince;
    }
}
