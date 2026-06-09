<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { ProductPriceType } from "$lib/feature/org/product/data/enums/product-price-type";

    type PriceType = {
        label: string;
        price: number;
        type: string;
    };

    let items = $state<PriceType[]>([
        { label: "Base",  price: 0, type: ProductPriceType.BASE },
        { label: "Hora",  price: 0, type: ProductPriceType.HOUR },
        { label: "Dia",   price: 0, type: ProductPriceType.DAY },
        { label: "Noite", price: 0, type: ProductPriceType.NIGHT },
    ]);

    const gridCols = $derived(
        items.length === 1 ? "grid-cols-1" :
            items.length % 3 === 0 ? "md:grid-cols-3" :
                items.length % 2 === 0 ? "md:grid-cols-2" :
                    "md:grid-cols-2"
    );
</script>

<div class="w-full space-y-3">
    <div class="space-y-3">
        <div class="text-sm font-bold text-gray-700 dark:text-gray-300">Preços</div>
        <div class="text-[12px]">Os preços estão depende das categorias escolhida para a empresa, estando sujeito alterações</div>
    </div>
    <div class="w-full grid gap-2 {gridCols}">
        {#each items as item (item.label)}
            <div class="flex items-center justify-between gap-4">
                <Label class="text-sm text-gray-700 dark:text-gray-300">{item.label}</Label>
                <Input
                        type="number"
                        min="0"
                        step="1"
                        class="w-8/12 text-right"
                        bind:value={item.price}
                />
            </div>
        {/each}
    </div>
</div>