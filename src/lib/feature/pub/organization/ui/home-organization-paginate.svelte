<script lang="ts">
    import { usePubGetOrganizationPaginate } from "../data/hooks/use-get-paginate";
    import { OrganizationManage } from "../data/service/organization.service";
    import type { PaginateRequest } from "$lib/feature/pub/organization";
    import GetOrganizationResponseCard from "./get-organization-response-card.svelte";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import EmptyNotFound from "$lib/components/empty-not-found.svelte";

    const service = new OrganizationManage();
    const request = $state<PaginateRequest>({pageNumber: 0, pageSize: 10,});
    const query = usePubGetOrganizationPaginate({ service, request });
    const organizations = $derived($query.data?.content ?? []);
    const isLoading = $derived($query.isLoading);
</script>

{#if isLoading}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 container mb-2">
        {#each Array.from({ length: 3 }, (_, i) => i) as i (i)}
            <div class="flex flex-col space-y-3">
                <Skeleton class="h-31.25 w-62.5 rounded-xl" />
                <div class="space-y-2">
                    <Skeleton class="h-4 w-62.5" />
                    <Skeleton class="h-4 w-50" />
                </div>
            </div>
        {/each}
    </div>
{:else if organizations.length == 0}
    <EmptyNotFound />
{:else}
    <div
        class="w-full grid grid-cols-1 md:grid-cols-3 gap-3 container px-4 md:px-0"
        role="region"
        aria-label="Organizations carousel"
    >
        {#each organizations as item (item.organization.uuid)}
            <GetOrganizationResponseCard {item} />
        {/each}
    </div>
{/if}
