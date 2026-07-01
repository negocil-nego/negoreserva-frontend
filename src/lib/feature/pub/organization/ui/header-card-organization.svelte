<script lang="ts">
  import type { OrganizationResponse } from "$lib/feature/pub/organization";
  import {
    Chat01Icon,
    MapsGlobal01Icon,
    MapsIcon,
    TelephoneIcon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  import { Button } from "$lib/components/ui/button";
  import RatingGenerator from "$lib/components/rating-generator.svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  let { item }: { item: OrganizationResponse } = $props();
</script>

<div class="relative w-full">
  <aside>
    <div class="flex items-center gap-3">
      <img
        src={item.logo}
        alt={item.name}
        class="w-10 h-10 border-2 border-white/50 shadow-xs object-cover"
      />
      <div class="flex flex-col">
        <span class="text-white text-sm font-bold drop-shadow-xs"
          >{item.name}</span
        >
        <RatingGenerator rating={item.rating} />
      </div>
    </div>
    <div
      class="flex text-white text-sm gap-3 overflow-x-auto my-1 md:my-2 md:justify-between"
    >
      <div class="flex gap-1 items-center">
        <HugeiconsIcon
          icon={MapsGlobal01Icon}
          size={16}
          color="#ffffff"
          strokeWidth={1}
        />
        <span>Província: {item.province}</span>
      </div>
      <div class="flex gap-1 items-center">
        <HugeiconsIcon
          icon={MapsIcon}
          size={16}
          color="#ffffff"
          strokeWidth={1}
        />
        <span>Estado: {item.municipality}</span>
      </div>
    </div>
  </aside>
  <aside class="absolute top-0 right-1 flex gap-2 z-30 backdrop-blur-md">
    <Button
      variant="outline"
      class="cursor-pointer rounded-sm"
      onclick={() => goto(resolve(`/organization/${item.slug}/chat`))}
    >
      <HugeiconsIcon icon={Chat01Icon} size={10} strokeWidth={1} />
    </Button>

    <Button variant="outline" class="cursor-pointer rounded-sm">
      <HugeiconsIcon icon={TelephoneIcon} size={10} strokeWidth={1} />
    </Button>
  </aside>
</div>
