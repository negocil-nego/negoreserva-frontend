<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ShoppingBasket01Icon, Folder01Icon } from "@hugeicons/core-free-icons";
  import { OrganizationService } from "$lib/feature/pub/organization";
  import type { CatalogResponse, ProductPriceGetOrgResponse, ProductFileGetOrgResponse } from "$lib/feature/pub/organization/data/model/organization.model";
  import type { ProductDetailResponse } from "$lib/feature/pub/product";
  import { catalogStore } from "$lib/stores/catalog.store";

  type Props = {
    catalog: CatalogResponse;
    orgSlug: string;
    orgName: string;
    orgImage?: string | null;
  };

  let { catalog, orgSlug, orgName, orgImage }: Props = $props();

  const organizationService = new OrganizationService();
  let products = $state<ProductDetailResponse[]>([]);
  let isLoadingProducts = $state(false);
  let quantities = $state<Record<string, number>>({});
  let open = $state(false);

  function productImage(product: ProductDetailResponse): string | null {
    return product.image ||
      product.files?.find((f: ProductFileGetOrgResponse) => f.isPrimary && f.url)?.url ||
      product.files?.find((f: ProductFileGetOrgResponse) => f.url)?.url ||
      null;
  }

  function productPrice(product: ProductDetailResponse): ProductPriceGetOrgResponse | null {
    return product.prices?.find((p: ProductPriceGetOrgResponse) => p.isPrimary) ??
      [...(product.prices ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0] ??
      null;
  }

  function formatPrice(value?: number | null): string {
    return new Intl.NumberFormat("pt-AO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value ?? 0);
  }

  function quantityOf(product: ProductDetailResponse): number {
    return quantities[product.uuid] ?? 1;
  }

  function setQuantity(product: ProductDetailResponse, value: number) {
    quantities = { ...quantities, [product.uuid]: Math.max(1, value) };
  }

  function decrease(product: ProductDetailResponse) {
    setQuantity(product, quantityOf(product) - 1);
  }

  function increase(product: ProductDetailResponse) {
    setQuantity(product, quantityOf(product) + 1);
  }

  function addToCatalogCart(product: ProductDetailResponse) {
    catalogStore.addProduct({
      catalog: catalog as CatalogResponse,
      product,
      quantity: quantityOf(product),
      image: productImage(product),
      price: productPrice(product),
    });
  }

  async function loadProducts() {
    if (products.length > 0 || isLoadingProducts) return;
    isLoadingProducts = true;
    try {
      products = await organizationService.catalogProducts(catalog.slug);
    } catch (error) {
      console.error("Failed to fetch catalog products:", error);
      products = [];
    } finally {
      isLoadingProducts = false;
    }
  }

  function handleOpen() {
    open = true;
    loadProducts();
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger class="w-full text-left" onclick={handleOpen}>
    <div class="w-full overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
      <div class="h-[200px] w-full overflow-hidden bg-muted/40">
        {#if catalog.imgUrl}
          <img src={catalog.imgUrl} alt={catalog.name} class="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        {:else if orgImage}
          <img src={orgImage} alt={catalog.name} class="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        {:else}
          <div class="flex h-full w-full items-center justify-center bg-muted/30">
            <HugeiconsIcon icon={Folder01Icon} size={48} class="opacity-20" />
          </div>
        {/if}
      </div>
      <div class="flex flex-col gap-1.5 p-3 max-h-[150px]">
        <p class="truncate text-xs font-semibold text-foreground">{catalog.name}</p>
        {#if catalog.description}
          <p class="truncate text-[11px] text-muted-foreground">{catalog.description}</p>
        {/if}
      </div>
    </div>
  </Dialog.Trigger>

  <Dialog.Content class="sm:max-w-5xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-background rounded-xl">
    <div class="p-6 pb-4 border-b">
      <Dialog.Title class="text-xl font-bold tracking-tight">{catalog.name}</Dialog.Title>
      <Dialog.Description class="text-xs text-muted-foreground">
        Explore os produtos do catálogo {catalog.name} de {orgName}
      </Dialog.Description>
    </div>

    <div class="flex-1 overflow-y-auto p-6">
      {#if isLoadingProducts}
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {#each Array.from({ length: 4 }) as _, i (i)}
            <div class="h-[28rem] animate-pulse rounded-lg border bg-background"></div>
          {/each}
        </div>
      {:else if products.length > 0}
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {#each products as product (product.uuid)}
            {@const image = productImage(product)}
            {@const price = productPrice(product)}
            <article class="overflow-hidden rounded-sm border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div class="relative aspect-[4/3] overflow-hidden bg-muted">
                {#if image}
                  <img src={image} alt={product.name} class="h-full w-full object-cover" />
                {:else}
                  <div class="flex h-full w-full items-center justify-center text-5xl font-bold text-muted-foreground/25">
                    {product.name.charAt(0)}
                  </div>
                {/if}
              </div>
              <div class="flex flex-col p-2">
                <div class="text-[15px] mt-1 font-semibold leading-tight">{product.name.substring(0, 100)}</div>
                <p class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <div class="mt-auto">
                  <p class="text-2xl font-extrabold text-green-700">
                    {formatPrice(price?.value)}
                    <span class="text-sm font-medium text-foreground">kz</span>
                  </p>
                  <div class="mt-5 grid grid-cols-[1fr_1.1fr] gap-3">
                    <div class="grid h-11 grid-cols-3 overflow-hidden rounded-md border border-green-700/25 bg-muted/30">
                      <button type="button" class="text-xl cursor-pointer" onclick={() => decrease(product)}>−</button>
                      <span class="flex items-center justify-center text-sm font-semibold">{quantityOf(product)}</span>
                      <button type="button" class="text-xl cursor-pointer" onclick={() => increase(product)}>+</button>
                    </div>
                    <button
                      type="button"
                      class="flex h-11 items-center justify-center gap-2 rounded-md bg-green-700 px-4 font-bold text-white hover:bg-green-800 cursor-pointer"
                      onclick={() => addToCatalogCart(product)}
                    >
                      <HugeiconsIcon icon={ShoppingBasket01Icon} size={18} color="currentColor" strokeWidth={2} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <p class="rounded-lg border border-dashed bg-background p-8 text-center text-sm text-muted-foreground">
          Nenhum produto disponível neste catálogo.
        </p>
      {/if}
    </div>
  </Dialog.Content>
</Dialog.Root>