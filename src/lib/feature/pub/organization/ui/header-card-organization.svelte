<script lang="ts">
  import type { OrganizationResponse } from "$lib/feature/pub/organization";

  let { item }: { item: OrganizationResponse } = $props();
</script>

<div class="flex items-center gap-3">
  <img
    src={item.logo}
    alt={item.name}
    class="w-10 h-10 rounded-full border-2 border-white/70 shadow-xs object-cover"
  />
  <div class="flex flex-col">
    <span class="text-white text-sm font-bold drop-shadow-xs">{item.name}</span>
    <div class="flex items-center gap-1">
      <span class="text-yellow-400 text-xs drop-shadow-xs">★</span>
      <span class="text-white text-[10px] drop-shadow-xs">
        {item.rating ?? "0.0"}
      </span>
    </div>
  </div>
</div>
