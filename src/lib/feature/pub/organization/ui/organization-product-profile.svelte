<script lang="ts">

    import type {ProductDetailResponse} from "$lib/feature/pub/product";

    let { data }: { data: ProductDetailResponse } = $props();

    const primaryImage = $derived(
        data.image ? { url: data.image, title: data.name } :
            data.files?.find((f) => f.isPrimary && f.url) ??
            data.files?.find((f) => f.url),
    );

    const primaryPrice = $derived(
        data.prices?.find((p) => p.isPrimary) ??
        [...(data.prices ?? [])].sort((a, b) => a.order - b.order)[0],
    );

    function formatPrice(value: number): string {
        return new Intl.NumberFormat("pt-AO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    }
</script>

<div class="w-full max-w-[180px] overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
    <!-- Image -->
    <div class="aspect-[4/3] w-full overflow-hidden bg-muted/40">
        {#if primaryImage?.url}
            <img
                    src={primaryImage.url}
                    alt={primaryImage.title ?? data.name}
                    class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
        {:else}
            <div class="flex h-full w-full items-center justify-center bg-muted/30">
                <span class="text-4xl opacity-20">🖼️</span>
            </div>
        {/if}
    </div>

    <!-- Body -->
    <div class="flex flex-col gap-1.5 p-3">
        <p class="truncate text-xs font-semibold text-foreground">{data.name}</p>

        {#if data.description}
            <p class="truncate text-[11px] text-muted-foreground">{data.description}</p>
        {/if}

        {#if primaryPrice}
            <p class="text-sm font-extrabold tracking-tight text-primary">
                {formatPrice(primaryPrice.value)}
                <span class="text-[10px] font-medium opacity-60">kz</span>
            </p>
        {/if}
    </div>
</div>