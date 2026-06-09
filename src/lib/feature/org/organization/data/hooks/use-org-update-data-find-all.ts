import type { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_UPDATE_DATA_FIND_ALL } from "./keys";

interface OrgUpdateDataFindAllProps {
    service: IOrgOrganizationUpdateDataService;
}

export const useOrgUpdateDataFindAll = ({ service }: OrgUpdateDataFindAllProps) => {
    return useQuery(
        [ORG_UPDATE_DATA_FIND_ALL],
        () => service.orgUpdateDataFindAll(),
    );
};
