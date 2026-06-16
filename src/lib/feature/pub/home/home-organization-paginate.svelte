<script lang="ts">
    import { useSearchOrganizationFilter } from "../organization/data/hooks/use-search-organization-filter";
    import { OrganizationManage } from "../organization/data/service/organization.service";
    import type { PaginateRequest } from "$lib/feature/pub/organization";
    import { searchFilterStore } from "$lib/stores/search-filter.store";
    import GetOrganizationResponseCard from "../organization/ui/get-organization-response-card.svelte";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import EmptyNotFound from "$lib/components/empty-not-found.svelte";

    const service = new OrganizationManage();
    const request = $state<PaginateRequest>({ pageNumber: 0, pageSize: 10 });

    let storeValues = $state({ ...$searchFilterStore });

    $effect(() => {
        storeValues = { ...$searchFilterStore };
    });

    let query = $state(
        useSearchOrganizationFilter({
            service,
            q: null,
            categoriesUuid: [],
            request,
            isHighlight: null,
            province: null,
            municipality: null,
            enabled: true,
        }),
    );

    $effect(() => {
        const { isSearching, q, province, municipality, isHighlight } =
            storeValues;
        query = useSearchOrganizationFilter({
            service,
            q: isSearching ? q || null : null,
            categoriesUuid: [],
            request,
            isHighlight: isSearching ? isHighlight || null : null,
            province: isSearching ? province || null : null,
            municipality: isSearching ? municipality || null : null,
            enabled: true,
        });
    });

    const isLoading = $derived($query.isLoading);
    const items = $derived($query.data?.content ?? []);
    const isEmpty = $derived($query.isFetched && items.length === 0);
</script>

<div class="container p-2 md:p-4 shadow-sm border rounded-md bg-panel">
    <div
        class="flex md:flex-row flex-col mx-3 md:mx-0 md:justify-between md:items-center mb-5"
    >
        <div class="space-y-2">
            <div class="text-xl font-extrabold">
                Descubra os melhores lugares
            </div>
            <div
                class="text-[13px] text-gray-700 dark:text-gray-200 max-w-75 md:max-w-125 lg:max-w-80 text-wrap"
            >
                Encontre as melhores opções de hospedagem, restaurantes e pontos
                turísticos para explorar Angola.
            </div>
        </div>
    </div>
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
    {:else}
        <div
            class="w-full grid grid-cols-1 md:grid-cols-3 gap-3 container px-4 md:px-0"
            role="region"
            aria-label="Organizations"
        >
            {#each items as item (item.uuid)}
                <GetOrganizationResponseCard {item} />
            {/each}
        </div>
    {/if}
</div>
