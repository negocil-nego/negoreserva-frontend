import type { IAdminProvinceService } from "../contract/province.service";
import type { ProvinceFilterQueryParamInput } from "../../../../shared/location/model/location.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ADMIN_PROVINCE_FILTER } from "./keys";

interface AdminProvinceFilterPaginateProps {
    service: IAdminProvinceService;
    filter: ProvinceFilterQueryParamInput;
}

export const useAdminGetProvinceFilterPaginate = ({
    service,
    filter
}: AdminProvinceFilterPaginateProps) => {
    return useQuery(
        [ADMIN_PROVINCE_FILTER, filter],
        () => service.paginateProvinceFilter(filter),
    );
};
