<script lang="ts">
    let { rating } : { rating: number | null | undefined } = $props();
</script>
<div class="flex items-center gap-1">
  {#each Array.from({ length: rating ?? 0 }) as n, i (i)}
    <span class="text-yellow-400 text-[10px] drop-shadow-xs">★</span>
    <span class="hidden">{n}</span>
  {/each}
</div>
