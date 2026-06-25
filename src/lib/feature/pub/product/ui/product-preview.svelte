<script lang="ts">
  import { useGetProductDetail } from "$lib/feature/pub/product";
  import ProductPreviewDetail from "$lib/feature/org/product/ui/detail/product-preview-detail.svelte";
  import ProductPaymentDrawer from "$lib/feature/org/product/ui/product-payment-drawer.svelte";
  import { ProductManage } from "$lib/feature/pub/product/data/service/product.service";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
  import { buttonVariants } from "$lib/components/ui/button";

  type Props = { slug: string };
  let { slug }: Props = $props();

  const productQuery = useGetProductDetail({
    service: new ProductManage(),
    get uuidOrSlug() {
      return slug;
    },
  });

  let data = $derived($productQuery?.data);
  let isLoading = $derived($productQuery?.isLoading);
</script>

<Dialog.Root>
  <Dialog.Trigger
    class={buttonVariants({
      variant: "ghost",
      size: "sm",
      class:
        "cursor-pointer rounded-sm flex items-center text-white bg-black/40 backdrop-blur-lg p-0 py-0 m-0 px-1 border border-gray-50/50",
    })}
  >
    Solicitar
    <HugeiconsIcon
      icon={ArrowRight01Icon}
      size={16}
      color="#ffffff"
      strokeWidth={1}
    />
  </Dialog.Trigger>
  <Dialog.Content
    class="sm:max-w-4xl h-[85vh] max-h-[85vh] flex flex-col p-0 overflow-hidden bg-background "
  >
    <div class="p-6 pb-4 border-b border-muted/20">
      <Dialog.Title class="text-xl font-bold tracking-tight"
        >Detalhes do Produto</Dialog.Title
      >
      <Dialog.Description class="text-xs text-muted-foreground">
        Visualize as informações do produto e confirme a sua solicitação.
      </Dialog.Description>
    </div>

    {#if isLoading}
      <div
        class="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div class="space-y-4">
          <Skeleton class="aspect-square w-full " />
        </div>
        <div class="space-y-4">
          <Skeleton class="h-8 w-3/4 " />
          <Skeleton class="h-6 w-1/4 " />
          <div class="space-y-2 pt-4">
            <Skeleton class="h-4 w-full " />
            <Skeleton class="h-4 w-full " />
            <Skeleton class="h-4 w-2/3 " />
          </div>
        </div>
      </div>
    {:else if data}
      <div class="flex-1 overflow-y-auto p-6 pb-28">
        <ProductPreviewDetail {data} />
      </div>

      <div
        class="absolute bottom-0 inset-x-0 p-4 bg-background border-t border-muted/30 flex items-center justify-between z-10"
      >
        <div class="flex flex-col">
          <span
            class="text-[10px] text-muted-foreground uppercase font-bold tracking-wider"
            >Preço Base</span
          >
          {#if data.prices && data.prices.length > 0}
            <span class="text-lg font-black text-emerald-500">
              {new Intl.NumberFormat("pt-AO", {
                style: "currency",
                currency: "AOA",
              }).format(
                data.prices.find((p) => p.isPrimary)?.value ??
                  data.prices[0].value ??
                  0,
              )}
            </span>
          {:else}
            <span class="text-sm font-semibold text-muted-foreground"
              >Sob Consulta</span
            >
          {/if}
        </div>
        <div class="w-48">
          <ProductPaymentDrawer {data} />
        </div>
      </div>
    {/if}
  </Dialog.Content>
</Dialog.Root>
