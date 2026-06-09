<script lang="ts">
    import CategoryCarouselBadge from "$lib/feature/pub/category/ui/category-carousel-badge.svelte";
    import {OrganizationManage} from "$lib/feature/pub/organization/data/service/organization.service";
    import type {OrganizationResponse, SearchOrganizationPaginate} from "$lib/feature/pub/organization";
    import {categorySelectedStore} from "$lib/stores/category.store";
    import Logo from "$lib/components/logo.svelte";
    import {Search01Icon, ArrowRight01Icon, Location01Icon} from "@hugeicons/core-free-icons";
    import Button from "../../../../lib/components/ui/button/button.svelte";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import ProvinceSelect from "$lib/feature/pub/organization/ui/filters/province-select.svelte";
    import MunicipalitySelect from "$lib/feature/pub/organization/ui/filters/municipality-select.svelte";
    import LocationSearchButton from "$lib/feature/pub/organization/ui/filters/location-search-button.svelte";
    import MenuLinks from "$lib/components/navs/menu-links.svelte";

    const service = new OrganizationManage();

    let q = $state<string | null>(null);
    let province = $state<string>("");
    let municipality = $state<string>("");
    let data = $state<SearchOrganizationPaginate | null>(null);
    let isLoading = $state(false);

    const categoriesUuid = $derived($categorySelectedStore.map(c => c.uuid));

    const organizations = $derived<OrganizationResponse[]>(data?.content ?? []);
    const totalElements = $derived(data?.totalElements ?? 0);

    function loadMore() {
        if (!data || data.last) return;
        isLoading = true;
        service.searchFilter(
            {q, categoriesUuid},
            {pageNumber: data.number + 1, pageSize: 10}
        ).then((result) => {
            if (data) {
                data = {
                    ...result,
                    content: [...data.content, ...result.content]
                };
            } else {
                data = result;
            }
        }).catch(() => {
            // ignore
        }).finally(() => {
            isLoading = false;
        });
    }

    $effect(() => {
        const currentQ = q;
        const currentCategories = categoriesUuid;
        isLoading = true;
        service.searchFilter(
            {q: currentQ, categoriesUuid: currentCategories},
            {pageNumber: 0, pageSize: 10}
        ).then((result) => {
            data = result;
        }).catch(() => {
            data = null;
        }).finally(() => {
            isLoading = false;
        });
    });
</script>

<nav class="flex items-center justify-between h-full px-5 md:px-10 py-2 border-b">
    <Logo/>
    <MenuLinks />
</nav>

<header class="px-5 md:px-10 py-5 bg-linear-to-b from-secondary/50 to-background">
    <div class="max-w-4xl mx-auto text-center space-y-6">
        <div class="flex flex-col items-center gap-4">
            <div class="relative w-full max-w-2xl">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <HugeiconsIcon icon={Search01Icon} size={20} color="currentColor" class="text-muted-foreground"/>
                </div>
                <input
                        type="text"
                        placeholder="Pesquise por nome, setor ou localização..."
                        class="w-full pl-12 pr-14 py-4 bg-card border border-border rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-sm shadow-sm"
                        bind:value={q}
                />
                <div class="absolute inset-y-0 right-2 flex items-center">
                    <LocationSearchButton onclick={() => {}}/>
                </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <ProvinceSelect bind:value={province} onValueChange={(v) => { province = v; municipality = ''; }}/>
                <MunicipalitySelect {province} bind:value={municipality}/>
            </div>
        </div>
    </div>
</header>

<section class="flex justify-center items-center px-5 md:px-10 w-full py-2 overflow-x-auto m-auto">
    <CategoryCarouselBadge isInline/>
</section>

<section class="w-full px-5 md:px-10 pb-16">
    {#if isLoading && !organizations.length}
        <p class="text-center py-8 text-muted-foreground">Carregando...</p>
    {:else if !isLoading && organizations.length === 0}
        <p class="text-center py-8 text-muted-foreground">Nenhuma organização encontrada.</p>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
            {#each organizations as org (org.uuid)}
                <a
                        href="/organization/{org.slug}"
                        class="group bg-card border border-border hover:border-primary rounded-sm overflow-hidden transition-all duration-300 flex flex-col hover:shadow-lg"
                >
                    <div class="w-full overflow-hidden bg-muted relative">
                        {#if org.image}
                            <img src={org.image} alt={org.name}
                                 class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"/>
                        {:else if org.logo}
                            <div class="w-full h-48 flex items-center justify-center p-6">
                                <img src={org.logo} alt={org.name} class="max-w-20 max-h-20 object-contain"/>
                            </div>
                        {:else}
                            <div class="w-full h-48 flex items-center justify-center">
                                <span class="text-5xl font-bold text-muted-foreground">{org.name.charAt(0)}</span>
                            </div>
                        {/if}
                    </div>
                    <div class="p-4 flex-grow space-y-2">
                        <h3 class="font-semibold text-base text-foreground line-clamp-1">{org.name}</h3>
                        {#if org.description}
                            <p class="text-sm text-muted-foreground line-clamp-2">
                                {org.description}
                            </p>
                        {/if}
                    </div>
                    <div class="px-4 pb-4 pt-3 border-t border-border/50 flex items-center justify-between mt-auto">
                        <span class="text-xs text-muted-foreground flex items-center gap-1">
                            <HugeiconsIcon icon={Location01Icon} size={14} color="currentColor"/>
                            {org.address ? org.address.split(',')[0].trim() : 'Localização'}
                        </span>
                        <span class="bg-brand text-sm font-medium flex justify-between items-center gap-1 rounded-full  min-w-[50px] lg:min-w-[70px] p-2">
                            Perfil
                            <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="currentColor"/>
                        </span>
                    </div>
                </a>
            {/each}
        </div>

        <!-- Load More -->
        {#if data && !data.last}
            <div class="mt-12 flex flex-col items-center gap-4">
                <Button
                        onclick={loadMore}
                        variant="default"
                        class="px-8 py-3"
                        disabled={isLoading}
                >
                    {isLoading ? 'Carregando...' : 'Carregar Mais Organizações'}
                </Button>
                <p class="text-xs text-muted-foreground">
                    Mostrando {organizations.length} de {totalElements} resultados
                </p>
            </div>
        {/if}
    {/if}
</section>
