<script lang="ts">
  import LocationSelector from "$lib/feature/pub/location/ui/location-selector.svelte";
  import { SEARCH_ALL, searchItems, searchMap } from "../types.svelte";
  import { FilterHorizontalIcon } from "@hugeicons/core-free-icons";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label/index";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import * as Select from "$lib/components/ui/select/index";
  import * as Popover from "$lib/components/ui/popover";
  import { searchFilterStore } from "$lib/stores/search-filter.store";
  import ToggleSwitch from "$lib/components/input/toggle-switch.svelte";
  import { Input } from "$lib/components/ui/input";

  let search = $state(SEARCH_ALL);
  let priceMinValue = $state($searchFilterStore.priceMin);
  let priceMaxValue = $state($searchFilterStore.priceMax);
  let provinceValue = $state($searchFilterStore.province);
  let isHighlight = $state($searchFilterStore.isHighlight);
  let municipalityValue = $state($searchFilterStore.municipality);

  $effect(() => {
    searchFilterStore.setFilter({ priceMin: priceMinValue });
  });
  $effect(() => {
    searchFilterStore.setFilter({ priceMax: priceMaxValue });
  });
  $effect(() => {
    searchFilterStore.setFilter({ province: provinceValue });
  });
  $effect(() => {
    searchFilterStore.setFilter({ municipality: municipalityValue });
  });

  function handleSearchType(v: string) {
    const item = searchMap[v];
    if (item) {
      search = item;
      searchFilterStore.setFilter({ searchType: item.value });
    }
  }
</script>

<Popover.Root>
  <Popover.Trigger
    class={buttonVariants({
      variant: "outline",
      class: "flex items-center gap-2 bg-brand hover:text-white",
    })}
  >
    <HugeiconsIcon icon={FilterHorizontalIcon} size={16} />
    <span class="hidden md:block">Filtro</span>
  </Popover.Trigger>

  <Popover.Content class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <div class="font-medium leading-none">Filtro</div>
      </div>

      <LocationSelector
        variant="filter"
        bind:provinceValue
        bind:municipalityValue
      />

      <hr />

      <div class="space-y-2">
        <div class="font-medium leading-none">Filtro organização</div>
      </div>

      <div class="grid grid-cols-3 items-center gap-4">
        <Label for="grupo">Grupo</Label>
        <div class="col-span-2">
          <Select.Root
            type="single"
            value={search.value}
            onValueChange={handleSearchType}
          >
            <Select.Trigger id="grupo" class="w-full border"
              >{search.name}</Select.Trigger
            >
            <Select.Content>
              {#each searchItems as item (item.value)}
                <Select.Item value={item.value} label={item.name}
                  >{item.name}</Select.Item
                >
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <ToggleSwitch
        id="destaque"
        bind:checked={isHighlight}
        onCheckedChange={(v) => searchFilterStore.setFilter({ isHighlight: v })}
        label="Em Destaque"
      />

      <hr />

      <div class="space-y-2">
        <div class="font-medium leading-none">Filtro Produto</div>
      </div>

      <div class="grid grid-cols-3 items-center gap-4">
        <Label for="grupo">Menor</Label>
        <div class="col-span-2">
          <Input type="number" placeholder="Mín" bind:value={priceMinValue} />
        </div>
      </div>

      <div class="grid grid-cols-3 items-center gap-4">
        <Label for="grupo">Maior</Label>
        <div class="col-span-2">
          <Input type="number" placeholder="Máx" bind:value={priceMaxValue} />
        </div>
      </div>
    </div>
  </Popover.Content>
</Popover.Root>
