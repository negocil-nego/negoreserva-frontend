<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import ProductImageGallery from "$lib/feature/pub/product/ui/product-image-gallery.svelte";
  import type { ProductDetailResponse } from "$lib/feature/pub/product";
  import { InformationSquareIcon } from "@hugeicons/core-free-icons";
  import PanelInfoRow from "$lib/components/panel/panel-info-row.svelte";

  let { data }: { data: ProductDetailResponse } = $props();

  let showFullDescription = $state(false);
  let descriptionLong = $derived(
    data.description && data.description.length > 150,
  );
</script>

<div class="w-full">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
    <!-- Left column: Image Gallery -->
    <div class="w-full space-y-4">
      <ProductImageGallery files={data.files} />
    </div>

    <!-- Right column: Product Details -->
    <div class="w-full space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
          {data.name}
        </h2>
      </div>

      {#if data.description}
        <div class="space-y-2">
          <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
            <HugeiconsIcon icon={InformationSquareIcon} size={14} class="text-muted-foreground" />
            Descrição
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {#if descriptionLong && !showFullDescription}
              {data.description.slice(0, 200)}...
              <button
                onclick={() => (showFullDescription = true)}
                class="text-brand hover:underline font-semibold ml-1 cursor-pointer"
              >
                ver mais
              </button>
            {:else}
              {data.description}
              {#if descriptionLong}
                <button
                  onclick={() => (showFullDescription = false)}
                  class="text-brand hover:underline font-semibold ml-1 cursor-pointer"
                >
                  ver menos
                </button>
              {/if}
            {/if}
          </p>
        </div>
      {/if}

      {#if data.tags?.length > 0}
        <div class="border-t border-muted/20 pt-5 space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
            Características do Produto
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each data.tags as tag (tag.uuid)}
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-muted/40 text-foreground border border-muted/25 shadow-xs">
                {tag.title}
              </span>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
