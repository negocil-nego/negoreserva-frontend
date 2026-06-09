<!-- product-card.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import type {GetOrganizationProductResponse} from "$lib/feature/pub/organization";

  let {
    data,
    selected,
    onclick,
  }: {
    data: GetOrganizationProductResponse;
    selected: boolean;
    onclick?: () => void;
  } = $props();

  const item = $derived(data.product);
  const primaryImage = $derived(
    item.image ? { url: item.image } :
      (data.files?.find((f) => f.isPrimary) ?? data.files?.[0]),
  );
</script>

<button onclick={onclick} class={cn(
    "group relative w-[50px] h-[50px] rounded-lg overflow-hidden border-2 transition-all duration-300",
    selected ? "border-green-500" : "border-gray-300 hover:border-gray-400",
  )}
>
  {#if primaryImage?.url}
    <img
            src={primaryImage.url}
            alt={item.name}
            class="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-110"
    />
  {:else}
    <div class="h-full w-full bg-muted flex items-center justify-center cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  {/if}

  {#if selected}
    <span class="absolute inset-0 bg-green-500/20 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  {/if}
</button>