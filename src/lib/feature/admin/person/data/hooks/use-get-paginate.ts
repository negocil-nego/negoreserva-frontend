import type { IAdminPersonService } from "../contract/person.service";
import type { PaginateRequest } from "../model/person.model";
import { useQuery } from "@sveltestack/svelte-query";
import { ADMIN_PERSON_FINDALL } from "./keys";

interface AdminPersonPaginateProps {
    service: IAdminPersonService;
    request: PaginateRequest;
}

export const useAdminGetPersonPaginate = ({
    service,
    request
}: AdminPersonPaginateProps) => {
    return useQuery(
        [ADMIN_PERSON_FINDALL, request],
        () => service.paginate(request),
    );
};