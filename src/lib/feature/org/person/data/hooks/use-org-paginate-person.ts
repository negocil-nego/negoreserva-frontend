import { useQuery } from "@sveltestack/svelte-query";
import type { PersonService } from "../contract/person.service";
import { ORG_PAGINATE_PERSON } from "./keys";

interface Props {
    service: PersonService;
    filter: { pageNumber: number; pageSize: number };
}

export const useOrgPaginatePerson = ({ service, filter }: Props) => {
    return useQuery(
        [ORG_PAGINATE_PERSON, filter],
        () => service.paginate(filter.pageNumber, filter.pageSize),
    );
};
