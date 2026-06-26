import type { PersonService } from "../contract/person.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_PAGINATE_PERSON } from "./keys";

interface Props {
    service: PersonService;
    userUuid: string;
    enabled?: boolean;
}

export const useOrgGetPersonRoles = ({ service, userUuid, enabled = true }: Props) => {
    return useQuery(
        [ORG_PAGINATE_PERSON, "roles", userUuid],
        () => service.getPersonRoles(userUuid),
        { enabled },
    );
};