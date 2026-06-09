<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import ProductPaymentDetail from "$lib/feature/org/product/ui/detail/product-payment-detail.svelte";
  import type {ProductDetailResponse} from "$lib/feature/pub/product";

  let {
    data
  }: { data: ProductDetailResponse } = $props()
</script>

<Drawer.Root>
    <Drawer.Trigger class="bg-brand w-full rounded-md">
      Confirma pagamento
    </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Faça o pagamento</Drawer.Title>
      <Drawer.Description>
        Faça a tua escolha do método
      </Drawer.Description>
    </Drawer.Header>
    <div class="px-5 overflow-y-auto">
      <ProductPaymentDetail {data} isMarginTop={false} isTitleShow={false} />
    </div>
  </Drawer.Content>
</Drawer.Root>
