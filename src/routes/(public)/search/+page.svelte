<script lang="ts">
    import {page} from "$app/state";
    import {goto} from "$app/navigation";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {Search01Icon} from "@hugeicons/core-free-icons";
    import Button from "$lib/components/ui/button/button.svelte";
    import {
        OrganizationService,
        useSearchOrganization,
    } from "$lib/feature/pub/organization";
    import {
        ProductService,
        useSearchProduct,
    } from "$lib/feature/pub/product";

    const PAGE_SIZE = 10;

    let q = $state("");
    let pageNumber = $state(0);

    let searchValue = $derived(page.url.searchParams.get("q") ?? "");

    $effect(() => {
        if (searchValue.length > 0) {
            q = searchValue;
        }
    });

    const paginateRequest = $derived({
        pageNumber,
        pageSize: PAGE_SIZE,
    });

    const orgService = new OrganizationService();
    const productService = new ProductService();

    const orgQuery = useSearchOrganization({
        service: orgService,
        get q() { return q },
        get request() { return paginateRequest },
    });

    const productQuery = useSearchProduct({
        service: productService,
        get q() { return q },
        get request() { return paginateRequest },
    });

    const orgData = $derived($orgQuery?.data);
    const productData = $derived($productQuery?.data);
    const isLoading = $derived(($orgQuery?.isFetching ?? false) || ($productQuery?.isFetching ?? false));

    function doSearch() {
        const query = q.trim();
        if (query.length === 0) return;
        pageNumber = 0;
        goto(`/search?q=${encodeURIComponent(query)}`, {keepFocus: true});
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") doSearch();
    }
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-8">
        <div class="flex-1 relative">
            <input
                type="text"
                bind:value={q}
                onkeydown={handleKeydown}
                placeholder="Pesquisar organizações e produtos..."
                class="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <HugeiconsIcon
                icon={Search01Icon}
                size={20}
                color="currentColor"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
        </div>
        <Button onclick={doSearch} class="h-12 px-6 rounded-xl bg-brand text-white font-medium">
            Pesquisar
        </Button>
    </div>

    {#if isLoading}
        <div class="flex justify-center py-20">
            <span class="text-gray-500">A pesquisar...</span>
        </div>
    {:else if q.length > 0}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 class="text-lg font-semibold mb-4">Organizações ({orgData?.totalElements ?? 0})</h2>
                {#if orgData && orgData.content.length > 0}
                    <div class="space-y-3">
                        {#each orgData.content as org (org.uuid)}
                            <a
                                href="/organization/{org.slug}"
                                class="block p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand transition-colors bg-white dark:bg-gray-900"
                            >
                                <div class="flex items-center gap-3">
                                    {#if org.logo}
                                        <img src={org.logo} alt={org.name} class="w-12 h-12 rounded-lg object-cover" />
                                    {/if}
                                    <div class="flex-1 min-w-0">
                                        <p class="font-medium truncate">{org.name}</p>
                                        {#if org.description}
                                            <p class="text-sm text-gray-500 truncate">{org.description}</p>
                                        {/if}
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                    {#if orgData.totalPages > 1}
                        <div class="flex justify-center gap-2 mt-4">
                            {#each Array(orgData.totalPages) as _, i}
                                <button
                                    onclick={() => { pageNumber = i }}
                                    class="w-8 h-8 rounded-lg text-sm {i === pageNumber ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800'}"
                                >
                                    {i + 1}
                                </button>
                            {/each}
                        </div>
                    {/if}
                {:else}
                    <p class="text-sm text-gray-400">Nenhuma organização encontrada</p>
                {/if}
            </div>

            <div>
                <h2 class="text-lg font-semibold mb-4">Produtos ({productData?.totalElements ?? 0})</h2>
                {#if productData && productData.content.length > 0}
                    <div class="space-y-3">
                        {#each productData.content as product (product.uuid)}
                            <a
                                href="/product/{product.slug}"
                                class="block p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand transition-colors bg-white dark:bg-gray-900"
                            >
                                <div class="flex items-center gap-3">
                                    {#if product.image}
                                        <img src={product.image} alt={product.name} class="w-12 h-12 rounded-lg object-cover" />
                                    {:else}
                                        <div class="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold shrink-0">
                                            {product.name.charAt(0)}
                                        </div>
                                    {/if}
                                    <div class="flex-1 min-w-0">
                                        <p class="font-medium truncate">{product.name}</p>
                                        <p class="text-sm text-gray-500 truncate">{product.organization.name}</p>
                                        {#if product.description}
                                            <p class="text-sm text-gray-400 truncate mt-1">{product.description}</p>
                                        {/if}
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                    {#if productData.totalPages > 1}
                        <div class="flex justify-center gap-2 mt-4">
                            {#each Array(productData.totalPages) as _, i}
                                <button
                                    onclick={() => { pageNumber = i }}
                                    class="w-8 h-8 rounded-lg text-sm {i === pageNumber ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800'}"
                                >
                                    {i + 1}
                                </button>
                            {/each}
                        </div>
                    {/if}
                {:else}
                    <p class="text-sm text-gray-400">Nenhum produto encontrado</p>
                {/if}
            </div>
        </div>
    {:else}
        <div class="flex justify-center py-20">
            <p class="text-gray-400">Digite um termo para pesquisar</p>
        </div>
    {/if}
</div>
