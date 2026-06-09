<script lang="ts">
  import { page } from '$app/state';
  import { ProductService, useGetProductDetail } from "$lib/feature/pub/product";
  import ProductFullForm from "$lib/feature/org/product/ui/form/product-full-form.svelte";

  let slug = $derived(page.params.slug ?? "");

  const productQuery = useGetProductDetail({
    service: new ProductService(),
    uuidOrSlug: slug,
  });

  let product = $derived($productQuery.data);
  let isLoading = $derived($productQuery.isFetching);

  let mappedProduct = $derived(
    product
      ? {
          uuid: product.uuid,
          name: product.name,
          description: product.description,
          prices: product.prices,
          tags: product.tags,
          files: product.files?.map((f) => ({
            uuid: f.uuid,
            title: f.title,
            description: f.description,
            url: f.url ?? "",
            type: f.type ?? "",
            isPrimary: f.isPrimary,
          })),
        }
      : null
  );
</script>

<div class="p-6 bg-slate-50/30 dark:bg-slate-950/20 rounded-3xl border border-slate-100/50 dark:border-slate-900/50 backdrop-blur-md">
  {#if isLoading}
    <div class="flex items-center justify-center h-64">
      <span class="text-sm text-slate-550 dark:text-slate-400 animate-pulse">Carregando produto...</span>
    </div>
  {:else if mappedProduct}
    <ProductFullForm readOnly={true} product={mappedProduct} />
  {:else}
    <div class="flex items-center justify-center h-64">
      <span class="text-sm text-red-500">Produto não encontrado.</span>
    </div>
  {/if}
</div>
