import { useQuery } from "@sveltestack/svelte-query";
import { ORGANIZATION_DETAIL_PUB } from "./keys";
import type { IOrganizationManage } from "../contract/organization.service";

interface UseOrganizationDetailProps {
    service: IOrganizationManage;
    uuidOrSlug: string;
}

export const useGetOrganizationDetail = ({
    service, uuidOrSlug
}: UseOrganizationDetailProps) => {
    return useQuery(
        [ORGANIZATION_DETAIL_PUB, uuidOrSlug],
        () => service.detail(uuidOrSlug),
        {
            onError: (error) => {
                console.error('Failed to fetch organization detail:', error);
            }
        }
    );
};
