<script lang="ts">
  import { onMount } from "svelte";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import ProductPaymentDetail from "$lib/feature/org/product/ui/detail/product-payment-detail.svelte";
  import type { ProductDetailResponse } from "$lib/feature/pub/product";
  import { buttonVariants } from "$lib/components/ui/button";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Payment01Icon } from "@hugeicons/core-free-icons";

  let { data }: { data: ProductDetailResponse } = $props();

  let isDesktop = $state(false);

  onMount(() => {
    const media = window.matchMedia("(min-width: 768px)");
    isDesktop = media.matches;
    const listener = (e: MediaQueryListEvent) => {
      isDesktop = e.matches;
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  });
</script>

<Drawer.Root direction={isDesktop ? "right" : "bottom"}>
  <Drawer.Trigger
    class={buttonVariants({
      variant: "default",
      class:
        "w-full cursor-pointer flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 text-white font-bold py-3 shadow-md transition-all duration-300",
    })}
  >
    <HugeiconsIcon icon={Payment01Icon} size={16} />
    Confirmar Pagamento
  </Drawer.Trigger>
  <Drawer.Content
    class="max-h-[85vh] md:max-h-screen md:h-screen flex flex-col bg-background data-[vaul-drawer-direction=right]:md:max-w-xl md:ml-auto md:mr-0 rounded-none before:rounded-none"
  >
    <Drawer.Header class="text-center shrink-0">
      <Drawer.Title class="text-xl font-bold tracking-tight"
        >Efectuar Pagamento</Drawer.Title
      >
      <Drawer.Description class="text-sm text-muted-foreground">
        Escolha o seu método de pagamento e preencha os dados necessários.
      </Drawer.Description>
    </Drawer.Header>
    <div class="px-6 pb-8 overflow-y-auto flex-1">
      <ProductPaymentDetail {data} isMarginTop={false} isTitleShow={false} />
    </div>
  </Drawer.Content>
</Drawer.Root>
