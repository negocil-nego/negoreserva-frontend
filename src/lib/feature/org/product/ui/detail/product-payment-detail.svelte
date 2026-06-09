<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { Payment01Icon } from "@hugeicons/core-free-icons";
    import type { ProductDetailResponse } from "$lib/feature/pub/product";
    import { page } from "$app/state";
    import ProductPaymentPriceSelector from "./product-payment-price-selector.svelte";
    import ProductPaymentNacional from "./product-payment-nacional.svelte";
    import ProductPaymentInternacional from "./product-payment-internacional.svelte";

    let {
        data,
        isMarginTop = true,
        isTitleShow = true,
    }: {
        data: ProductDetailResponse,
        isMarginTop?: boolean
        isTitleShow?: boolean
    } = $props();

    let selectedPrice = $state("");
    let selectedPriceObj = $derived(data.prices?.find(p => p.uuid === selectedPrice));

    let quantity = $state(1);
    let total = $derived(selectedPriceObj ? selectedPriceObj.value * quantity : 0);

    let paymentTab = $state("nacional");
    let productSlug = $derived(page.params.slug ?? "");
    let primaryImageUrl = $derived(data.files?.find(f => f.isPrimary)?.url ?? data.files?.[0]?.url);

    $effect(() => {
        if (data.prices?.length > 0 && !selectedPrice) {
            selectedPrice = (data.prices.find(p => p.isPrimary) ?? data.prices[0]).uuid;
        }
    });
</script>

<div
        class="flex h-full w-full flex-col"
        class:mt-15={isMarginTop}
>
    {#if isTitleShow }
        <p class="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">Pagamento</p>
    {/if}

    <ProductPaymentPriceSelector prices={data.prices ?? []} bind:selectedPrice />

    <div class="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-border p-3">
        <div class="flex items-center gap-3 justify-between w-full md:block md:w-auto">
            <span class="text-sm font-semibold">Quantidade</span>
            <Input type="number" min={1} bind:value={quantity} class="w-20 rounded-xl text-center" />
        </div>
        {#if selectedPriceObj && quantity > 0}
            <div class="text-lg font-bold text-primary flex justify-between w-full md:block md:w-auto">
                <span>Total</span>
                <span>
                    {total.toLocaleString("pt-AO", { style: "currency", currency: "AOA", minimumFractionDigits: 2 })}
                </span>
            </div>
        {/if}
    </div>

    <div class="space-y-4">
        <div class="flex items-center gap-2">
            <HugeiconsIcon icon={Payment01Icon} size={18} class="text-muted-foreground" />
            <span class="text-sm font-semibold">Método de Pagamento</span>
        </div>
        <Tabs.Tabs bind:value={paymentTab}>
            <Tabs.TabsList class="w-full gap-2 bg-gray-50 dark:bg-gray-900">
                {#each ["nacional", "internacional"] as tab}
                    <Tabs.TabsTrigger value={tab} class="flex-1 capitalize data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                        {tab === "nacional" ? "Nacional" : "Internacional"}
                    </Tabs.TabsTrigger>
                {/each}
            </Tabs.TabsList>
            <Tabs.TabsContent value="nacional">
                <ProductPaymentNacional
                    productUuid={data.uuid}
                    {productSlug}
                    productName={data.name}
                    {primaryImageUrl}
                    {selectedPrice}
                    {selectedPriceObj}
                    {quantity}
                />
            </Tabs.TabsContent>
            <Tabs.TabsContent value="internacional">
                <ProductPaymentInternacional />
            </Tabs.TabsContent>
        </Tabs.Tabs>
    </div>
</div>