<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
  import { LocationManage } from "../data/service/location.service";
  import { useGetProvinces } from "../data/hooks/use-get-provinces";
  import { useGetMunicipalitiesByProvince } from "../data/hooks/use-get-municipalities-by-province";
  import Label from "$lib/components/ui/label/label.svelte";

  const service = new LocationManage();
  const provincesQuery = useGetProvinces({ service });

  let provinces = $derived($provincesQuery.data ?? []);
  let isProvincesLoading = $derived($provincesQuery.isLoading);

  let {
    provinceValue = $bindable(""),
    municipalityValue = $bindable(""),
    provinceUuid = $bindable(""),
    municipalityUuid = $bindable(""),
    variant = "register",
  }: {
    provinceValue?: string;
    municipalityValue?: string;
    provinceUuid?: string;
    municipalityUuid?: string;
    variant?: "filter" | "register";
  } = $props();

  $effect(() => {
    provinceUuid = provinces.find((p) => p.value === provinceValue)?.uuid ?? "";
  });

  $effect(() => {
    municipalityUuid =
      municipalities.find((m) => m.value === municipalityValue)?.uuid ?? "";
  });

  const municipalitiesQuery = $derived(
    useGetMunicipalitiesByProvince({ service, provinceUuid }),
  );

  let municipalities = $derived(
    provinceValue ? ($municipalitiesQuery.data ?? []) : [],
  );
  let isMunicipalitiesLoading = $derived($municipalitiesQuery.isLoading);

  $effect(() => {
    if (provinceValue) municipalityValue = "";
  });
</script>

{#snippet triggerContent(
  label: string,
  isLoading: boolean,
  placeholder: string,
)}
  {#if isLoading}
    <div class="flex items-center gap-2 text-muted-foreground">
      <span class="animate-spin">◌</span>
      Carregando...
    </div>
  {:else}
    {label || placeholder}
  {/if}
{/snippet}

{#if variant == "register"}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <Select.Root
      type="single"
      value={provinceValue}
      onValueChange={(v) => (provinceValue = v)}
    >
      <Select.Trigger class="w-full">
        {@render triggerContent(
          provinces.find((p) => p.value === provinceValue)?.label ?? "",
          isProvincesLoading,
          "Província...",
        )}
      </Select.Trigger>
      <Select.Content>
        {#each provinces as p (p.value)}
          <Select.Item value={p.value} label={p.label}>{p.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>

    <Select.Root
      type="single"
      value={municipalityValue}
      onValueChange={(v) => (municipalityValue = v)}
      disabled={!provinceValue || isMunicipalitiesLoading}
    >
      <Select.Trigger class="w-full">
        {@render triggerContent(
          municipalities.find((m) => m.value === municipalityValue)?.label ??
            "",
          isMunicipalitiesLoading,
          "Município...",
        )}
      </Select.Trigger>
      <Select.Content>
        {#each municipalities as m (m.value)}
          <Select.Item value={m.value} label={m.label}>{m.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
{:else if variant == "filter"}
  <div class="grid gap-2 w-full">
    <div class="grid grid-cols-3 items-center gap-4">
      <Label for="province">Província</Label>
      <Select.Root
        type="single"
        value={provinceValue}
        onValueChange={(v) => (provinceValue = v)}
      >
        <Select.Trigger class="w-full col-span-2" id="province">
          {@render triggerContent(
            provinces.find((p) => p.value === provinceValue)?.label ?? "",
            isProvincesLoading,
            "Província...",
          )}
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
        disabled={!provinceValue || isMunicipalitiesLoading}
      >
        <Select.Trigger class="w-full col-span-2" id="municipality">
          {@render triggerContent(
            municipalities.find((m) => m.value === municipalityValue)?.label ??
              "",
            isMunicipalitiesLoading,
            "Município...",
          )}
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
