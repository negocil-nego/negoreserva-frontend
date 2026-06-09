<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { Money01Icon } from "@hugeicons/core-free-icons";
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import { PRODUCT_LABEL } from "$lib/feature/pub/product/data/model/product.label";
    import type { ProductPriceGetOrgResponse } from "$lib/feature/pub/organization/data/model/organization.model";

    let {
        prices,
        selectedPrice = $bindable(""),
    }: {
        prices: ProductPriceGetOrgResponse[];
        selectedPrice: string;
    } = $props();
</script>

{#if prices.length > 0}
    <div class="mb-6 space-y-4 rounded-xl">
        <div class="flex items-center gap-2">
            <HugeiconsIcon icon={Money01Icon} size={18} class="text-muted-foreground" />
            <span class="text-sm font-semibold tracking-widest">Selecione o Preço</span>
        </div>
        <RadioGroup.RadioGroup bind:value={selectedPrice}>
            {#each prices as price (price.uuid)}
                <div class="flex items-center gap-3 px-3 py-2">
                    <RadioGroup.RadioGroupItem value={price.uuid} id={price.uuid} />
                    <Label for={price.uuid} class="flex flex-1 cursor-pointer items-center justify-between font-normal">
                        <span class="text-sm">{PRODUCT_LABEL[price.type] ?? price.type}</span>
                        <span class="text-sm font-semibold">
                            {price.value.toLocaleString("pt-AO", { style: "currency", currency: "AOA", minimumFractionDigits: 2 })}
                        </span>
                    </Label>
                </div>
            {/each}
        </RadioGroup.RadioGroup>
    </div>
{:else}
    <p class="mb-6 text-sm text-muted-foreground">Sob Consulta</p>
{/if}
