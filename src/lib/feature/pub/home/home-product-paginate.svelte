<script lang="ts">
    import {ProductManage} from "$lib/feature/pub/product/data/service/product.service";
    import type { PaginateRequest } from "$lib/feature/pub/organization";
    import { searchFilterStore } from "$lib/stores/search-filter.store";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import EmptyNotFound from "$lib/components/empty-not-found.svelte";
    import {useSearchProductFilter} from "$lib/feature/pub/product";
    import ProductResponseCard from "../product/ui/product-response-card.svelte";

    const service = new ProductManage();
    const request = $state<PaginateRequest>({ pageNumber: 0, pageSize: 12 });

    let storeValues = $state({ ...$searchFilterStore });

    $effect(() => {
        storeValues = { ...$searchFilterStore };
    });

    let query = $state(
        useSearchProductFilter({
            service,
            request,
            q: null,
            priceMax: null,
            priceMin: null,
        }),
    );

    $effect(() => {
        const { isSearching, q, priceMin, priceMax } = storeValues;
        query = useSearchProductFilter({
            service,
            request,
            q: isSearching ? q || null : null,
            priceMax: isSearching ? priceMax || null : null,
            priceMin: isSearching ? priceMin || null : null,
        });
    });

    const isLoading = $derived($query.isLoading);
    const items = $derived($query.data?.content ?? []);
    const isEmpty = $derived($query.isFetched && items.length === 0);
</script>

<div class="container p-2 md:p-4 rounded-md bg-panel">
    <div
        class="flex md:flex-row flex-col mx-3 md:mx-0 md:justify-between md:items-center mb-5"
    >
        <div class="space-y-2">
            <div class="text-xl font-extrabold">
                Encontra os melhores, produtos e serviços das empresa
            </div>
            <div
                class="text-[13px] text-gray-700 dark:text-gray-200 max-w-75 md:max-w-125 lg:max-w-80 text-wrap"
            >
                Pesquisa os produtos que procura seja para melhor hospedagem, ou melhor comidas para exprementar
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
            class="w-full grid grid-cols-1 md:grid-cols-4 gap-3 container px-4 md:px-0"
            role="region"
            aria-label="Products"
        >
            {#each items as item (item.uuid)}
                <ProductResponseCard product={item} />
            {/each}
        </div>
    {/if}
</div>
