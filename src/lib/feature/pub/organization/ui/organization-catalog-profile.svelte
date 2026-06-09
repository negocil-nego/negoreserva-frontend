<script lang="ts">

    import type {CatalogResponse} from "$lib/feature/pub/organization/data/model/organization.model";

    let {data}: { data: CatalogResponse } = $props();
</script>

<div class=" w-full overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
    <div class="h-[200px] w-full overflow-hidden bg-muted/40">
        {#if data.imgUrl}
            <img src={data.imgUrl} alt={data.name} class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"/>
        {:else}
            <div class="flex h-full w-full items-center justify-center bg-muted/30">
                <span class="text-3xl opacity-20">📁</span>
            </div>
        {/if}
    </div>

    <div class="flex flex-col gap-1.5 p-3 max-h-[150px]">
        <p class="truncate text-xs font-semibold text-foreground">{data.name}</p>
        {#if data.description}
            <p class="truncate text-[11px] text-muted-foreground">{data.description}</p>
        {/if}
    </div>
</div>
