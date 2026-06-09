<script lang="ts">
    import { HugeiconsIcon } from "@hugeicons/svelte"
    import ProductImageGallery from "$lib/feature/pub/product/ui/product-image-gallery.svelte";
    import ProductTagsBadge from "$lib/feature/pub/product/ui/product-tags-badge.svelte";
    import { PRODUCT_LABEL } from "$lib/feature/pub/product/data/model/product.label";
    import type { ProductDetailResponse } from "$lib/feature/pub/product";
    import {InformationSquareIcon, Money01Icon, Tag01Icon} from "@hugeicons/core-free-icons";
    import GetOrganizationCategoryCarousel from "$lib/feature/pub/organization/ui/get-organization-category-carousel.svelte";
    import PanelInfoRow from "$lib/components/panel-info-row.svelte";

    let { data }: { data: ProductDetailResponse } = $props()

    let primaryPrice = $derived(
        data.prices?.find(p => p.isPrimary) ?? data.prices?.[0]
    );

    let showFullDescription = $state(false);
    let descriptionLong = $derived(data.description && data.description.length > 150);
</script>

<div class="h-full w-full pl-0 ml-0 flex flex-col gap-6">
    <div class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-0">Pré-visualização</div>

    <div>
        <ProductImageGallery files={data.files} />

        <div class="p-5 space-y-4">
            <div class="text-xl font-bold text-gray-900 dark:text-gray-100">{data.name}</div>
            {#if data.description}
                <div>
                    <p class="text-sm text-muted-foreground">
                        {#if descriptionLong && !showFullDescription}
                            {data.description.slice(0, 150)}...
                            <button
                                onclick={() => showFullDescription = true}
                                class="text-primary hover:underline font-medium ml-1"
                            >ver mais</button>
                        {:else}
                            {data.description}
                            {#if descriptionLong}
                                <button
                                    onclick={() => showFullDescription = false}
                                    class="text-primary hover:underline font-medium ml-1"
                                >ver menos</button>
                            {/if}
                        {/if}
                    </p>
                </div>
            {/if}

            {#if data.prices?.length > 0}
                <div class="space-y-2">
                    <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        <HugeiconsIcon icon={Money01Icon} size={14} />
                        <span>Preços</span>
                    </div>
                    <div class="space-y-1">
                        {#each data.prices as price (price.uuid)}
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-muted-foreground">{PRODUCT_LABEL[price.type] ?? price.type}</span>
                                <span class="font-medium">{price.value.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 })}</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}

            {#if data.tags?.length > 0}
                <PanelInfoRow label="Informações" icon={InformationSquareIcon}>
                    <!-- <ProductTagsBadge tags={data.tags} /> -->
                    <div class="flex flex-wrap gap-2">
                    {#each data.tags as tag(tag.uuid)}
                        <div class="border p-2 rounded-xl">{tag.title}</div>
                    {/each}
                    </div>
                </PanelInfoRow>
            {/if}
        </div>
    </div>
</div>
