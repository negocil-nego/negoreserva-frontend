<script lang="ts">
    import { usePubGetOrganizationPaginate } from "../organization/data/hooks/use-get-paginate";
    import { useSearchOrganizationFilter } from "../organization/data/hooks/use-search-organization-filter";
    import { OrganizationManage } from "../organization/data/service/organization.service";
    import type { PaginateRequest } from "$lib/feature/pub/organization";
    import { searchFilterStore } from "$lib/stores/search-filter.store";
    import GetOrganizationResponseCard from "../organization/ui/get-organization-response-card.svelte";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import EmptyNotFound from "$lib/components/empty-not-found.svelte";
    import { goto } from "$app/navigation";

    const service = new OrganizationManage();
    const request = $state<PaginateRequest>({ pageNumber: 0, pageSize: 10 });

    let storeValues = $state({ ...$searchFilterStore });

    $effect(() => {
        storeValues = { ...$searchFilterStore };
    });

    let normalQuery = $state(usePubGetOrganizationPaginate({ service, request }));
    let filteredQuery = $state<ReturnType<typeof useSearchOrganizationFilter> | null>(null);

    $effect(() => {
        const { isSearching: s, q, province, municipality, isHighlight: h } = storeValues;
        if (s) {
            filteredQuery = useSearchOrganizationFilter({
                service,
                q: q || null,
                categoriesUuid: [],
                request,
                isHighlight: h || null,
                province: province || null,
                municipality: municipality || null,
                enabled: true,
            });
        } else {
            filteredQuery = null;
        }
    });

    const isLoading = $derived(
        storeValues.isSearching ? ($filteredQuery?.isLoading ?? false) : $normalQuery.isLoading
    );

    const items = $derived(
        storeValues.isSearching
            ? ($filteredQuery?.data?.content ?? [])
            : ($normalQuery.data?.content ?? [])
    );

    const isEmpty = $derived(
        storeValues.isSearching
            ? ($filteredQuery?.isFetched && items.length === 0)
            : (items.length === 0)
    );
</script>

<div class="container p-2 md:p-4 bg-panel">
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
    {:else if isEmpty}
        <EmptyNotFound />
    {:else if storeValues.isSearching}
        <div
            class="w-full grid grid-cols-1 md:grid-cols-3 gap-3 container px-4 md:px-0"
            role="region"
            aria-label="Search results"
        >
            {#each items as item (item.uuid)}
                <button
                    onclick={() => goto(`/organization/${item.slug}`)}
                    class="w-full text-left rounded-md border border-gray-50 dark:border-gray-800 dark:bg-slate-950/30 overflow-hidden cursor-pointer"
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        class="w-full h-50 lg:min-h-56 xl:min-h-72 object-fill"
                    />
                    <div class="p-3">
                        <h3 class="font-bold text-sm truncate">{item.name}</h3>
                        {#if item.description}
                            <p class="text-[12px] text-gray-600 dark:text-gray-400 truncate mt-1">{item.description}</p>
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
    {:else}
        <div
            class="w-full grid grid-cols-1 md:grid-cols-3 gap-3 container px-4 md:px-0"
            role="region"
            aria-label="Organizations"
        >
            {#each items as item (item.organization.uuid)}
                <GetOrganizationResponseCard {item} />
            {/each}
        </div>
    {/if}
</div>
