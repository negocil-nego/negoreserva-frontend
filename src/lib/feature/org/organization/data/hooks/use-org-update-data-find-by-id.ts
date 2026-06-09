import type { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_UPDATE_DATA_FIND_BY_ID } from "./keys";

interface OrgUpdateDataFindByIdProps {
    service: IOrgOrganizationUpdateDataService;
    id: string;
}

export const useOrgUpdateDataFindById = ({ service, id }: OrgUpdateDataFindByIdProps) => {
    return useQuery(
        [ORG_UPDATE_DATA_FIND_BY_ID, id],
        () => service.orgUpdateDataFindById(id),
    );
};
