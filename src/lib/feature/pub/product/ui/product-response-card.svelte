<script lang="ts">
    import type {ProductResponse} from "$lib/feature/pub/product";

    type Props = { product: ProductResponse }

    let {product}: Props = $props()

</script>
<div class="relative aspect-4/3 overflow-hidden bg-muted">
    <div class="absolute inset-0 bg-linear-to-b from-black/80 to-transparent rounded-md min-h-10"></div>
    {#if product.image}
        <img src={product.image} alt={product.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md"/>
    {:else}
        <div class="w-full h-full flex items-center justify-center">
            <span class="text-5xl font-bold text-muted-foreground/30">{product.name.charAt(0)}</span>
        </div>
    {/if}

    <div class="absolute inset-x-0 top-0 flex items-center gap-1.5 px-3 py-2 ">
        {#if product.organization.logo}
            <img src={product.organization.logo} alt={product.organization.name} class="size-5 rounded object-cover bg-muted"/>
        {:else}
            <span class="size-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-green-700 shrink-0">
                {product.organization.name.charAt(0)}
            </span>
        {/if}
            <span class="text-white text-[11px] uppercase tracking-wide truncate font-medium">
                {product.organization.name}
            </span>
        {#if product.organization.rating}
            <span class="flex items-center gap-0.5 ml-auto text-amber-500 shrink-0">
                <span class="text-[11px] font-bold text-amber-500">★</span>
                <span class="text-white text-[11px] font-bold">{product.organization.rating}</span>
            </span>
        {/if}
    </div>

    <div class="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between gap-2 bg-linear-to-t from-black/95 via-black/40 to-transparent pt-8 rounded-b-md">
        <div class="font-semibold text-base text-white truncate" title={product.name}>{product.name}</div>
        <span class="text-xs font-bold text-emerald-400 bg-black/50 px-2 py-0.5 rounded-sm shrink-0">
            {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(product.price ?? 0)}
        </span>
    </div>
</div>