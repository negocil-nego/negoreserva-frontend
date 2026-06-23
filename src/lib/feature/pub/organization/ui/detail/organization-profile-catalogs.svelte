<script lang="ts">
    import CatalogResponseCard from "../catalog-response-card.svelte";
    import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";
    import EmptyNotFound from "$lib/components/empty-not-found.svelte";

    let {data, url}: { data: OrganizationDetailResponse, url?: string } = $props();

    const catalogs = $derived(data.catalogs ?? []);
</script>

<section id="organization-section-catalogs" class="bg-panel p-6 border relative w-full">
    {#if catalogs.length > 0}
        <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-3" role="region" aria-label="Catalogs">
            {#each catalogs as catalog (catalog.uuid)}
                <CatalogResponseCard catalog={catalog} orgSlug={data.slug} orgName={data.name} orgImage={data.image}/>
            {/each}
        </div>
    {:else}
        <EmptyNotFound />
    {/if}
</section>