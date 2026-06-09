<script lang="ts">
    import {OrgCatalogService} from "$lib/feature/org/catalog/data/service/catalog.service";
    import type {OrgCatalogResponse} from "$lib/feature/org/catalog/data/model/catalog.model";
    import CatalogProducts from "$lib/feature/org/catalog/ui/catalog-products.svelte";
    import {page} from "$app/state";
    import CatalogEditDialog from "$lib/feature/org/catalog/ui/catalog-edit-dialog.svelte";
    import CatalogImageEditDialog from "$lib/feature/org/catalog/ui/catalog-image-edit-dialog.svelte";
    import { HugeiconsIcon } from '@hugeicons/svelte';
    import {Edit03Icon, ImageUploadIcon} from "@hugeicons/core-free-icons";

    let slug = $derived(page.params.slug ?? "");

    let editItem = $state<OrgCatalogResponse | null>(null);
    let editImageItem = $state<OrgCatalogResponse | null>(null);

    let catalog = $state<OrgCatalogResponse | null>(null);
    let isLoading = $state(true);

    let service = new OrgCatalogService();

    $effect(() => {
        if (slug) {
            isLoading = true;
            service.findByUuidOrSlug(slug).then((data) => {
                catalog = data;
            }).catch(console.error).finally(() => {
                isLoading = false;
            });
        }
    });
</script>

<div class="p-6 space-y-6">
    {#if isLoading}
        <div class="flex items-center gap-4 p-4 rounded-sm border bg-card text-card-foreground animate-pulse">
            <div class="size-20 rounded-lg bg-muted shrink-0"></div>
            <div class="space-y-2 flex-1">
                <div class="h-6 bg-muted rounded w-1/3"></div>
                <div class="h-4 bg-muted rounded w-2/3"></div>
            </div>
        </div>
    {:else if catalog}
        <div class="flex items-center gap-4 p-4 rounded-sm border bg-card text-card-foreground">
            {#if catalog.imgUrl}
                <img src={catalog.imgUrl} alt={catalog.name} class="size-20 md:size-24 lg:size-28 rounded-sm object-cover shrink-0"/>
            {:else}
                <div class="size-20 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="m21 15-5-5L5 21"/>
                    </svg>
                </div>
            {/if}
            <div>
                <h1 class="text-xl font-bold tracking-tight">{catalog.name}</h1>
                {#if catalog.description}
                    <p class="text-sm text-muted-foreground my-0.5">{catalog.description}</p>
                {/if}
                <div class="mt-3 w-full">
                    <div class="flex gap-3 md:gap-5">
                        <button class="text-[12px] cursor-pointer gap-2 flex items-center" onclick={() => { editItem = catalog; }}>
                          <HugeiconsIcon icon={Edit03Icon} size={15} color="currentColor" strokeWidth={1.5}/>
                          Dados
                        </button>
                        <button class="text-[12px] cursor-pointer gap-2 flex items-center" onclick={() => { editImageItem = catalog; }}>
                          <HugeiconsIcon icon={ImageUploadIcon} size={15} color="currentColor" strokeWidth={1.5} />
                          Imagem
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <CatalogProducts uuidOrSlug={slug}/>

    <CatalogEditDialog
            item={editItem}
            onSuccess={() => { editItem = null;  }}
            onClose={() => { editItem = null; }}
    />

    <CatalogImageEditDialog
            item={editImageItem}
            onSuccess={() => { editImageItem = null; }}
            onClose={() => { editImageItem = null; }}
    />

</div>
