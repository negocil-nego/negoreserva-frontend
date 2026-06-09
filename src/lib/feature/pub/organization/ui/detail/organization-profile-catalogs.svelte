<script lang="ts">
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {Folder01Icon} from "@hugeicons/core-free-icons";
    import OrganizationCatalogProfile from "../organization-catalog-profile.svelte";
    import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";

    let {data, url}: { data: OrganizationDetailResponse, url?: string } = $props();
</script>

<section id="organization-section-catalogs" class="mt-10 bg-panel p-6 border relative">
    <div class="flex items-center gap-2 mb-6">
        <HugeiconsIcon icon={Folder01Icon} size={24} color="currentColor" strokeWidth={1}/>
        <h2 class="text-xl font-bold">Catálogos</h2>
    </div>

    {#if url }
        <div class="absolute top-8 right-5 z-10">
          <a href="{url}">ver mais</a>
        </div>
    {/if}

    {#if data.catalogs && data.catalogs.length > 0}
        <Carousel.Root class="w-full relative md:px-10">
            <Carousel.Content class="w-full">
                {#each data.catalogs as catalog (catalog.uuid)}
                    <Carousel.Item class="h-full basis-auto">
                        <OrganizationCatalogProfile data={catalog}/>
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
            <Carousel.Previous class="ml-0 inset-s-0"/>
            <Carousel.Next class="mr-0 inset-e-0"/>
        </Carousel.Root>
    {:else}
        <p class="text-sm text-muted-foreground">Nenhum catálogo disponível.</p>
    {/if}
</section>
