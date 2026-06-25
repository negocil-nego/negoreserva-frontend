import { useQuery } from "@sveltestack/svelte-query";
import type { PersonService } from "../contract/person.service";
import { ORG_PAGINATE_PERSON } from "./keys";

interface Props {
    service: PersonService;
    pageNumber: number;
    pageSize: number;
}

export const useOrgPaginatePerson = ({ service, pageNumber, pageSize }: Props) => {
    return useQuery(
        [ORG_PAGINATE_PERSON, pageNumber, pageSize],
        () => service.paginate(pageNumber, pageSize),
        { refetchOnWindowFocus: false },
    );
};
