<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
  import { LocationManage } from "../data/service/location.service";
  import { useGetProvinces } from "../data/hooks/use-get-provinces";
  import { useGetMunicipalitiesByProvince } from "../data/hooks/use-get-municipalities-by-province";
  import Label from "$lib/components/ui/label/label.svelte";

  const service = new LocationManage();
  const provincesQuery = useGetProvinces({ service });

  let provinces = $derived($provincesQuery.data ?? []);

  let {
    provinceValue = $bindable(""),
    municipalityValue = $bindable(""),
    varient = "register",
  }: {
    provinceValue?: string;
    municipalityValue?: string;
    varient?: "filter" | "register";
  } = $props();

  const municipalitiesQuery = $derived(
    useGetMunicipalitiesByProvince({ service, provinceValue }),
  );

  let municipalities = $derived(
    provinceValue ? ($municipalitiesQuery.data ?? []) : [],
  );

  $effect(() => {
    if (provinceValue) municipalityValue = "";
  });
</script>

{#if varient == "register"}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div class="grid gap-2">
      <Select.Root
        type="single"
        value={provinceValue}
        onValueChange={(v) => (provinceValue = v)}
      >
        <Select.Trigger class="w-full">
          {provinces.find((p) => p.value === provinceValue)?.label ||
            "Província..."}
        </Select.Trigger>
        <Select.Content>
          {#each provinces as p (p.value)}
            <Select.Item value={p.value} label={p.label}>{p.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <div class="grid gap-2">
      <Select.Root
        type="single"
        value={municipalityValue}
        onValueChange={(v) => (municipalityValue = v)}
        disabled={!provinceValue}
      >
        <Select.Trigger class="w-full">
          {municipalities.find((m) => m.value === municipalityValue)?.label ||
            "Município..."}
        </Select.Trigger>
        <Select.Content>
          {#each municipalities as m (m.value)}
            <Select.Item value={m.value} label={m.label}>{m.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
  </div>
{:else if varient == "filter"}
  <div class="grid gap-2">
    <div class="grid grid-cols-3 items-center gap-4">
      <Label for="province">Província</Label>
      <Select.Root
        type="single"
        value={provinceValue}
        onValueChange={(v) => (provinceValue = v)}
      >
        <Select.Trigger class="w-full" id="province">
          {provinces.find((p) => p.value === provinceValue)?.label ||
            "Província..."}
        </Select.Trigger>
        <Select.Content>
          {#each provinces as p (p.value)}
            <Select.Item value={p.value} label={p.label}>{p.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <div class="grid grid-cols-3 items-center gap-4">
      <Label for="municipality">Município</Label>
      <Select.Root
        type="single"
        value={municipalityValue}
        onValueChange={(v) => (municipalityValue = v)}
        disabled={!provinceValue}
      >
        <Select.Trigger class="w-full" id="municipality">
          {municipalities.find((m) => m.value === municipalityValue)?.label ||
            "Município..."}
        </Select.Trigger>
        <Select.Content>
          {#each municipalities as m (m.value)}
            <Select.Item value={m.value} label={m.label}>{m.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
  </div>
{/if}
