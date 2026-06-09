import type { IAdminPersonService } from "../contract/person.service";
import type { PersonFilterQueryParamInput } from "../model/person.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ADMIN_PERSON_FILTER } from "./keys";

interface AdminPersonFilterPaginateProps {
    service: IAdminPersonService;
    filter: PersonFilterQueryParamInput;
}

export const useAdminGetPersonFilterPaginate = ({
    service,
    filter
}: AdminPersonFilterPaginateProps) => {
    return useQuery(
        [ADMIN_PERSON_FILTER, filter],
        () => service.paginatePersonFilter(filter),
    );
};