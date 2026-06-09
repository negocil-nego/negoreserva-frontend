<script lang="ts">
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {
        Search01Icon,
    } from "@hugeicons/core-free-icons";

    import Button from "$lib/components/ui/button/button.svelte";
    import {OrganizationService, useSearchOrganization} from "$lib/feature/pub/organization";
    import {ProductService, useSearchProduct} from "$lib/feature/pub/product";
    import {ORGANIZATION_SEARCH_PUB} from "$lib/feature/pub/organization/data/hooks/keys";
    import {PRODUCT_SEARCH_PUB} from "$lib/feature/pub/product/data/hooks/keys";

    let query = $state("");
    let isFocused = $state(false);
    let inputEl: HTMLInputElement | undefined = $state();
    const request = {pageNumber: 0, pageSize: 10};

    const orgService = new OrganizationService();
    const productService = new ProductService();

    const orgQuery = useSearchOrganization({
        service: orgService,
        get q() {
            return query
        },
        get request() {
            return request
        },
    });

    const productQuery = useSearchProduct({
        service: productService,
        get q() {
            return query
        },
        get request() {
            return request
        },
    });

    const orgData = $derived($orgQuery?.data);
    const productData = $derived($productQuery?.data);
    const orgIsFetching = $derived($orgQuery?.isFetching ?? false);
    const productIsFetching = $derived($productQuery?.isFetching ?? false);

    let debounceTimer: ReturnType<typeof setTimeout>;

    function triggerSearch(q: string) {
        if (q.length > 0) {
            orgQuery.setOptions(
                [ORGANIZATION_SEARCH_PUB, q],
                () => orgService.search(q, request),
                {enabled: true, keepPreviousData: true}
            );
            productQuery.setOptions(
                [PRODUCT_SEARCH_PUB, q],
                () => productService.search(q, request),
                {enabled: true, keepPreviousData: true}
            );
        } else {
            orgQuery.updateOptions({enabled: false});
            productQuery.updateOptions({enabled: false});
        }
    }

    function handleInput() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => triggerSearch(query.trim()), 400);
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            clearTimeout(debounceTimer);
            triggerSearch(query.trim());
        }
    }
</script>

<div class="flex flex-col w-full gap-4 relative">
    <div class="flex justify-center items-center gap-2 w-full px-4">
        <div class="w-full bg-white border-2 border-gray-300 dark:border-gray-800 dark:bg-slate-950/30 rounded-full">
            <div class="flex items-center gap-2 dark:bg-slate-950/30 py-1 px-2 rounded-full w-full">
                <div class="items-center gap-2 hidden md:flex text-slate-500">
                    <HugeiconsIcon
                            icon={Search01Icon}
                            size={24}
                            color="currentColor"
                            strokeWidth={1.5}
                    />
                </div>

                <input
                        type="text"
                        bind:value={query}
                        bind:this={inputEl}
                        onfocus={() => isFocused = true}
                        onblur={() => isFocused = false}
                        oninput={handleInput}
                        onkeydown={handleKeydown}
                        class="text-sm w-full bg-transparent placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                        placeholder="Pesquisa Hotel, hospedaria, restaurantes, etc..."
                />

                    <Button onclick={() => { clearTimeout(debounceTimer); triggerSearch(query.trim()); }}
                            class="flex justify-center items-center cursor-pointer bg-brand rounded-full"
                            variant="outline">
                        <HugeiconsIcon icon={Search01Icon} size={16} color="currentColor" strokeWidth={2}/>
                        <span>Pesquisar</span>
                    </Button>
            </div>
        </div>
    </div>

    <div class="absolute top-15 w-full bg-panel">
        {#if query.trim().length > 0 }
            <div class="w-full px-4 space-y-8 py-5">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-md font-semibold">
                            Organizações
                            {#if orgData}
                                <span class="text-muted-foreground">({orgData.totalElements})</span>
                            {/if}
                        </div>
                    </div>

                    {#if orgIsFetching && !orgData}
                        <div class="flex items-center gap-2 py-6 text-sm text-muted-foreground">
                            <span class="animate-pulse">A pesquisar organizações...</span>
                        </div>
                    {:else if orgData && orgData.content.length > 0}
                        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                            {#each orgData.content as org (org.uuid)}
                                <a
                                        href="/organization/{org.slug}"
                                        class="flex-shrink-0 w-20"
                                >
                                    <div class="flex flex-col items-center gap-1">
                                        {#if org.logo}
                                            <img src={org.logo} alt={org.name}
                                                 class="w-14 h-14 rounded-full object-cover shadow-sm"/>
                                        {:else}
                                            <div class="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground shadow-sm">
                                                {org.name.charAt(0)}
                                            </div>
                                        {/if}
                                        <p class="font-medium text-xs text-center truncate w-full">{org.name}</p>
                                    </div>
                                </a>
                            {/each}
                        </div>
                    {:else if orgData && orgData.content.length === 0}
                        <p class="text-sm text-muted-foreground">Nenhuma organização encontrada para "<span
                                class="font-medium">{query}</span>"</p>
                    {/if}
                </div>

                <div>
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-md font-semibold">
                            Produtos
                            {#if productData}
                                <span class="text-muted-foreground">({productData.totalElements})</span>
                            {/if}
                        </div>
                    </div>

                    {#if productIsFetching && !productData}
                        <div class="flex items-center gap-2 py-6 text-sm text-muted-foreground">
                            <span class="animate-pulse">A pesquisar produtos...</span>
                        </div>
                    {:else if productData && productData.content.length > 0}
                        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {#each productData.content as product (product.uuid)}
                                <a
                                        href="/product/{product.slug}"
                                        class="flex flex-col items-center gap-1 p-2"
                                >
                                    {#if product.image}
                                        <img src={product.image} alt={product.name}
                                             class="w-12 h-12 rounded-full object-cover shadow-sm"/>
                                    {:else}
                                        <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground shadow-sm">
                                            {product.name.charAt(0)}
                                        </div>
                                    {/if}
                                    <p class="font-medium text-xs text-center truncate w-full">{product.name}</p>
                                </a>
                            {/each}
                        </div>
                    {:else if productData && productData.content.length === 0}
                        <p class="text-sm text-muted-foreground">Nenhum produto encontrado para "<span
                                class="font-medium">{query}</span>"</p>
                    {/if}
                </div>
            </div>
        {:else if isFocused}
            <div class="w-full px-4 py-5">
                <div class="p-8 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                            <HugeiconsIcon
                                    icon={Search01Icon}
                                    size={32}
                                    color="currentColor"
                                    class="text-brand"
                                    strokeWidth={1.5}
                            />
                        </div>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">O que deseja encontrar?</h3>
                    <p class="text-sm text-muted-foreground max-w-md mx-auto">
                        Pesquise por hotéis, restaurantes, hospedarias, pensões e destinos turísticos.
                        Encontre o lugar perfeito para a sua próxima experiência e faça a sua reserva online.
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>
