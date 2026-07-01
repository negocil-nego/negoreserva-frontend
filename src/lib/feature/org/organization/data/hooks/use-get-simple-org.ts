import { useQuery } from "@sveltestack/svelte-query";
import { apolloClient } from "$lib/providers/graphql.provider";
import { ORGANIZATION_DETAIL } from "$lib/feature/pub/organization/data/queries/organization";
import type { OrganizationDetailResponse } from "$lib/feature/pub/organization/data/model/organization.model";

export interface OrgSimpleResponse {
    uuid: string;
    name: string;
    logo: string | null;
}

export const useOrgSimpleInfo = (slug: string, options?: { enabled?: boolean }) => {
    return useQuery<OrgSimpleResponse>(
        ["orgSimpleInfo", slug],
        async () => {
            const { data } = await apolloClient.query<{ pubOrganizationDetail: OrganizationDetailResponse }>({
                query: ORGANIZATION_DETAIL,
                variables: { uuidOrSlug: slug },
                fetchPolicy: "cache-first",
            });
            const org = data!.pubOrganizationDetail;
            return { uuid: org.uuid, name: org.name, logo: org.logo };
        },
        {
            refetchOnWindowFocus: false,
            enabled: options?.enabled,
        }
    );
};

