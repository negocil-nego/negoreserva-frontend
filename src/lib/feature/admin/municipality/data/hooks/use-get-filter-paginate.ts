import type { IAdminMunicipalityService } from "../contract/municipality.service";
import type { MunicipalityFilterQueryParamInput } from "../../../../shared/location/model/location.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ADMIN_MUNICIPALITY_FILTER } from "./keys";

interface AdminMunicipalityFilterPaginateProps {
    service: IAdminMunicipalityService;
    filter: MunicipalityFilterQueryParamInput;
}

export const useAdminGetMunicipalityFilterPaginate = ({
    service,
    filter
}: AdminMunicipalityFilterPaginateProps) => {
    return useQuery(
        [ADMIN_MUNICIPALITY_FILTER, filter],
        () => service.paginateMunicipalityFilter(filter),
    );
};
