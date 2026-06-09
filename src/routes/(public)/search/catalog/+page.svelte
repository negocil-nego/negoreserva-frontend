<script lang="ts">
    import { CatalogManage } from "$lib/feature/pub/catalog/data/service/catalog.service";
    import type { CatalogResponse, SearchCatalogPaginate } from "$lib/feature/pub/catalog";
    import { organizationSelectedStore } from "$lib/stores/organization.store";
    import OrganizationSelectorPopover from "$lib/feature/pub/organization/ui/filters/organization-selector-popover.svelte";
    import Logo from "$lib/components/logo.svelte";
    import { Search01Icon } from "@hugeicons/core-free-icons";
    import Button from "$lib/components/ui/button/button.svelte";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import MenuLinks from "$lib/components/navs/menu-links.svelte";
    import { InputIcon } from "$lib/components/ui/input-icon/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    const service = new CatalogManage();

    let q = $state<string | null>(null);
    let data = $state<SearchCatalogPaginate | null>(null);
    let isLoading = $state(false);
    let pageNumber = $state(0);

    const catalogs = $derived<CatalogResponse[]>(data?.content ?? []);
    const totalPages = $derived(data?.totalPages ?? 0);
    const pageSize = $derived(data?.size ?? 10);
    const organizationUuids = $derived($organizationSelectedStore.map(o => o.uuid));

    const typeLabels: Record<string, string> = {
        NONE: "Catálogo",
        DRIK: "Bebidas",
        FOOD: "Comida"
    };

    function doSearch(page: number = 0) {
        const currentQ = q;
        const currentOrgUuids = organizationUuids;
        isLoading = true;
        pageNumber = page;
        service.searchFilter(
            { q: currentQ, organizationUuids: currentOrgUuids },
            { pageNumber: page, pageSize }
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
                <Label class="mb-1.5 ml-1">Catálogo</Label>
                <InputIcon
                    placeholder="Pesquisar por nome..."
                    bind:value={q}
                    onkeydown={(e: KeyboardEvent) => { if (e.key === "Enter") doSearch(0); }}
                >
                    {#snippet preffix()}
                        <HugeiconsIcon icon={Search01Icon} size={16} class="text-muted-foreground" />
                    {/snippet}
                </InputIcon>
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
    {:else if catalogs.length === 0}
        <div class="text-center py-16 text-muted-foreground">
            <p class="text-lg">Nenhum catálogo encontrado.</p>
            <p class="text-sm mt-1">Tente ajustar os filtros ou buscar por outro nome.</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {#each catalogs as catalog (catalog.uuid)}
                <a
                    href="/organization/{catalog.organization.slug}"
                    class="bg-card rounded-sm overflow-hidden border hover:border-green-500/50 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                >
                    <div class="relative aspect-[4/3] overflow-hidden bg-muted">
                        {#if catalog.imgUrl}
                            <img
                                src={catalog.imgUrl}
                                alt={catalog.name}
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        {:else}
                            <div class="w-full h-full flex items-center justify-center">
                                <span class="text-5xl font-bold text-muted-foreground/30">{catalog.name.charAt(0)}</span>
                            </div>
                        {/if}

                        <div class="absolute inset-x-0 top-0 flex items-center gap-1.5 px-3 py-2 bg-background/70 backdrop-blur-md">
                            {#if catalog.organization.logo}
                                <img
                                    src={catalog.organization.logo}
                                    alt={catalog.organization.name}
                                    class="size-5 rounded object-cover bg-muted"
                                />
                            {:else}
                                <span class="size-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-green-700 shrink-0">
                                    {catalog.organization.name.charAt(0)}
                                </span>
                            {/if}
                            <span class="text-foreground text-[11px] uppercase tracking-wide truncate font-medium">
                                {catalog.organization.name}
                            </span>
                            {#if catalog.organization.rating}
                                <span class="flex items-center gap-0.5 ml-auto text-amber-500 shrink-0">
                                    <span class="text-[11px] font-bold text-amber-500">★</span>
                                    <span class="text-[11px] font-bold text-muted-foreground">{catalog.organization.rating}</span>
                                </span>
                            {/if}
                        </div>

                        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <span class="inline-flex mb-1 rounded bg-white/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur">
                                {typeLabels[catalog.type] ?? typeLabels.NONE}
                            </span>
                            <h3 class="font-semibold text-lg text-white truncate">{catalog.name}</h3>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <p class="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                            {catalog.description}
                        </p>
                        <div class="mt-auto pt-3 border-t flex items-center justify-between">
                            <span class="text-xs text-muted-foreground">Ver organização →</span>
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
                {#each Array.from({ length: totalPages }, (_, i) => i) as i}
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
