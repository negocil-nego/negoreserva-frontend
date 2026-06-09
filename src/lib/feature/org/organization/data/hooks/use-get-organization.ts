import type { IOrgOrganizationService } from "../contract/organization.service";
import { useQuery } from "@sveltestack/svelte-query";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrgOrganizationProps {
    service: IOrgOrganizationService;
}

export const useOrgGetOrganization = ({
    service
}: OrgOrganizationProps) => {
    return useQuery(
        [ORG_GET_ORGANIZATION_PROFILE],
        () => service.orgProfileOrganization(),
        { refetchOnWindowFocus: false },
    );
};