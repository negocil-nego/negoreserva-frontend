<script lang="ts">
  import type {
    ProductDetailResponse,
    ProductResponse,
  } from "$lib/feature/pub/product";
  import type {
    ProductFileGetOrgResponse,
    ProductPriceGetOrgResponse,
  } from "$lib/feature/pub/organization/data/model/organization.model";
  import ProductPreview from "./product-preview.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    HeartAddFreeIcons,
    ShoppingCart01Icon,
  } from "@hugeicons/core-free-icons";
  import { shopStore } from "$lib/stores/shop.store";
  import { favoriteStore } from "$lib/stores/favorite.store";

  type Props = {
    product?: ProductResponse;
    detail: ProductDetailResponse;
  };

  let { detail }: Props = $props();

  const displayName = $derived(detail.name);
  const displayDescription = $derived(detail.description);
  const displayImage = $derived(
    detail.image ||
      detail.files?.find((f: ProductFileGetOrgResponse) => f.isPrimary && f.url)
        ?.url ||
      detail.files?.find((f: ProductFileGetOrgResponse) => f.url)?.url ||
      null,
  );
  const displayOrg = $derived(detail.organization);
  const displaySlug = $derived(detail?.slug ?? "");

  const displayPrice = $derived(
    (
      detail.prices?.find((p: ProductPriceGetOrgResponse) => p.isPrimary) ??
      [...(detail.prices ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      )[0]
    )?.value ?? 0,
  );

  function formatPrice(value: number): string {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(value);
  }

  let isFav = $derived(favoriteStore.isFavorite(detail.uuid));

  function toggleFavorite() {
    favoriteStore.toggle({
      productUuid: detail.uuid,
      productName: displayName,
      productImage: displayImage,
      organizationName: displayOrg.name,
      organizationSlug: displayOrg.slug,
    });
  }

  function addToShop() {
    shopStore.addItem({
      productUuid: detail.uuid,
      productName: displayName,
      price: displayPrice,
      organizationName: displayOrg.name,
      organizationSlug: displayOrg.slug,
      image: displayImage,
    });
  }
</script>

<div
  class="overflow-hidden border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
>
  <div class="relative aspect-[4/3] overflow-hidden bg-muted">
    {#if displayImage}
      <img
        src={displayImage}
        alt={displayName}
        class="h-full w-full object-cover"
      />
    {:else}
      <div
        class="flex h-full w-full items-center justify-center text-5xl font-bold text-muted-foreground/25"
      >
        {displayName.charAt(0)}
      </div>
    {/if}

    <button
      class="absolute top-2 right-2 z-10 flex size-8 cursor-pointer items-center justify-center bg-black/40 text-white backdrop-blur-lg transition-colors hover:bg-black/60"
      onclick={toggleFavorite}
      title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <HugeiconsIcon
        icon={HeartAddFreeIcons}
        size={16}
        color={isFav ? "#ef4444" : "currentColor"}
        strokeWidth={isFav ? 2 : 1}
      />
    </button>
  </div>

  <div class="flex flex-col p-2">
    <div class="text-[15px] mt-1 font-semibold leading-tight">
      {displayName.substring(0, 100)}
    </div>
    <p class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
      {displayDescription}
    </p>

    <div class="mt-auto">
      <p class="text-2xl font-extrabold text-green-700">
        {formatPrice(displayPrice)}
        <span class="text-sm font-medium text-foreground">kz</span>
      </p>
      <div class="mt-3 flex items-center justify-between">
        <ProductPreview slug={displaySlug} />
        <button
          type="button"
          class="flex cursor-pointer items-center gap-1.5 bg-green-700 px-3 py-2 text-xs font-bold text-white hover:bg-green-800 transition-colors"
          onclick={addToShop}
        >
          <HugeiconsIcon
            icon={ShoppingCart01Icon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
          Add
        </button>
      </div>
    </div>
  </div>
</div>
