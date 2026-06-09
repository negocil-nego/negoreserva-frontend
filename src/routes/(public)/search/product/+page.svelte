<script lang="ts">
    import {ProductManage} from "$lib/feature/pub/product/data/service/product.service";
    import type {ProductResponse, SearchProductPaginate} from "$lib/feature/pub/product";
    import {organizationSelectedStore} from "$lib/stores/organization.store";
    import OrganizationSelectorPopover from "$lib/feature/pub/organization/ui/filters/organization-selector-popover.svelte";
    import Logo from "$lib/components/logo.svelte";
    import {Search01Icon} from "@hugeicons/core-free-icons";
    import Button from "$lib/components/ui/button/button.svelte";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import MenuLinks from "$lib/components/navs/menu-links.svelte";
    import {Input} from "$lib/components/ui/input/index.js";
    import {InputIcon} from "$lib/components/ui/input-icon/index.js";
    import {Label} from "$lib/components/ui/label/index.js";
    import * as Select from "$lib/components/ui/select/index.js";

    const service = new ProductManage();

    let q = $state<string | null>(null);
    let priceMin = $state<string | null>(null);
    let priceMax = $state<string | null>(null);
    let data = $state<SearchProductPaginate | null>(null);
    let isLoading = $state(false);
    let pageNumber = $state(0);
    let sortBy = $state("Recommended");

    const products = $derived<ProductResponse[]>(data?.content ?? []);
    const totalPages = $derived(data?.totalPages ?? 0);
    const pageSize = $derived(data?.size ?? 10);
    const organizationUuids = $derived($organizationSelectedStore.map(o => o.uuid));

    function doSearch(page: number = 0) {
        const currentQ = q;
        const currentMin = priceMin ? Number(priceMin) : null;
        const currentMax = priceMax ? Number(priceMax) : null;
        const currentOrgUuids = organizationUuids;
        isLoading = true;
        pageNumber = page;
        service.searchFilter(
            {q: currentQ, priceMin: currentMin, priceMax: currentMax, organizationUuids: currentOrgUuids},
            {pageNumber: page, pageSize: pageSize}
        ).then((result) => {
            data = result;
        }).catch(() => {
            data = null;
        }).finally(() => {
            isLoading = false;
        });
    }

    function resetFilters() {
        q = null;
        priceMin = null;
        priceMax = null;
        sortBy = "Recommended";
        organizationSelectedStore.clear();
        doSearch(0);
    }

    $effect(() => {
        doSearch(0);
    });
</script>

<nav class="h-14 w-full fixed top-0 z-40 bg-background/95 backdrop-blur-md flex items-center justify-between px-5 md:px-10 border-b">
    <Logo />
    <MenuLinks />
</nav>

<main class="pt-20 pb-8 mx-auto px-5">
    <section class="mb-6 bg-card p-4 rounded-sm border shadow-sm">
        <div class="flex flex-col md:flex-row md:flex-wrap items-end gap-4">
            <div class="w-full md:w-auto min-w-[50px] flex-1">
                <Label class="mb-1.5 ml-1">Organização</Label>
                <OrganizationSelectorPopover />
            </div>

            <div class="flex-[1.5] w-full md:w-auto min-w-[200px]">
                <Label class="mb-1.5 ml-1">Produto</Label>
                <InputIcon
                    placeholder="Pesquisar por nome..."
                    bind:value={q}
                    onkeydown={(e: KeyboardEvent) => { if (e.key === 'Enter') doSearch(0); }}
                >
                    {#snippet preffix()}
                        <HugeiconsIcon icon={Search01Icon} size={16} class="text-muted-foreground" />
                    {/snippet}
                </InputIcon>
            </div>

            <div class="flex-1 w-full md:w-auto min-w-[30px]">
                <Label class="mb-1.5 ml-1">Ordenar</Label>
                <Select.Root type="single" bind:value={sortBy}>
                    <Select.Trigger class="w-full">
                        {sortBy === "Recommended" ? "Recomendado" : sortBy === "highest" ? "Maior Preço" : "Menor Preço"}
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="Recommended">Recomendado</Select.Item>
                        <Select.Item value="highest">Maior Preço</Select.Item>
                        <Select.Item value="lowest">Menor Preço</Select.Item>
                    </Select.Content>
                </Select.Root>
            </div>

            <div class="flex-[1.5] min-w-[30px]">
                <Label class="mb-1.5 ml-1">Intervalo</Label>
                <div class="flex gap-1.5">
                    <Input type="number" placeholder="Mín" bind:value={priceMin} />
                    <Input type="number" placeholder="Máx" bind:value={priceMax} />
                </div>
            </div>

            <div class="flex items-center gap-2 h-[40px]">
                <Button onclick={() => doSearch(0)} class="bg-brand text-white border-0 shadow-sm">
                    Aplicar
                </Button>
                <button
                    onclick={resetFilters}
                    class="px-3 py-2 text-muted-foreground hover:text-green-700 text-sm font-medium transition-colors cursor-pointer"
                >
                    Limpar
                </button>
            </div>
        </div>
    </section>

    {#if isLoading}
        <div class="flex justify-center py-16">
            <div class="size-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    {:else if products.length === 0}
        <div class="text-center py-16 text-muted-foreground">
            <p class="text-lg">Nenhum produto encontrado.</p>
            <p class="text-sm mt-1">Tente ajustar os filtros ou buscar por outro termo.</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {#each products as product (product.uuid)}
                <a
                    href="/product/{product.slug}"
                    class="bg-card rounded-sm overflow-hidden border hover:border-green-500/50 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                >

                    <div class="relative aspect-[4/3] overflow-hidden bg-muted">
                        {#if product.image}
                            <img
                                src={product.image}
                                alt={product.name}
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        {:else}
                            <div class="w-full h-full flex items-center justify-center">
                                <span class="text-5xl font-bold text-muted-foreground/30">{product.name.charAt(0)}</span>
                            </div>
                        {/if}

                        <div class="absolute inset-x-0 top-0 flex items-center gap-1.5 px-3 py-2 bg-background/70 backdrop-blur-md">
                            {#if product.organization.logo}
                                <img
                                    src={product.organization.logo}
                                    alt={product.organization.name}
                                    class="size-5 rounded object-cover bg-muted"
                                />
                            {:else}
                                <span class="size-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-green-700 shrink-0">
                                    {product.organization.name.charAt(0)}
                                </span>
                            {/if}
                            <span class="text-foreground text-[11px] uppercase tracking-wide truncate font-medium">
                                {product.organization.name}
                            </span>
                            {#if product.organization.rating}
                                <span class="flex items-center gap-0.5 ml-auto text-amber-500 shrink-0">
                                    <span class="text-[11px] font-bold text-amber-500">★</span>
                                    <span class="text-[11px] font-bold text-muted-foreground">{product.organization.rating}</span>
                                </span>
                            {/if}
                        </div>

                        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 class="font-semibold text-lg text-white truncate">{product.name}</h3>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <p class="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                            {product.description}
                        </p>
                        <div class="mt-auto pt-3 border-t flex items-center justify-between">
                            <span class="text-xs text-muted-foreground">Ver detalhes →</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>

        {#if totalPages > 1}
            <div class="mt-8 flex items-center justify-center gap-1.5">
                <button
                    onclick={() => doSearch(pageNumber - 1)}
                    disabled={pageNumber === 0}
                    class="size-9 flex items-center justify-center rounded-lg border border-border hover:border-green-600 text-muted-foreground hover:text-green-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                    ‹
                </button>
                {#each Array.from({length: totalPages}, (_, i) => i) as i}
                    {#if i === pageNumber}
                        <span class="size-9 flex items-center justify-center rounded-lg bg-green-700 text-white text-sm font-medium">
                            {i + 1}
                        </span>
                    {:else if i === 0 || i === totalPages - 1 || (i >= pageNumber - 1 && i <= pageNumber + 1)}
                        <button
                            onclick={() => doSearch(i)}
                            class="size-9 flex items-center justify-center rounded-lg border border-border hover:border-green-600 text-muted-foreground hover:text-green-700 transition-all text-sm cursor-pointer"
                        >
                            {i + 1}
                        </button>
                    {:else if i === pageNumber - 2 || i === pageNumber + 2}
                        <span class="px-1 text-muted-foreground text-sm">…</span>
                    {/if}
                {/each}
                <button
                    onclick={() => doSearch(pageNumber + 1)}
                    disabled={pageNumber >= totalPages - 1}
                    class="size-9 flex items-center justify-center rounded-lg border border-border hover:border-green-600 text-muted-foreground hover:text-green-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                    ›
                </button>
            </div>
        {/if}
    {/if}
</main>
