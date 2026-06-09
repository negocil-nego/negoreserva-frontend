<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    let {
        value = $bindable(""),
        onValueChange,
    }: {
        value?: string;
        onValueChange?: (v: string) => void;
    } = $props();

    function handleValueChange(v: string) {
        value = v;
        onValueChange?.(v);
    }

    const provinces = [
        { value: "bengo", label: "Bengo" },
        { value: "benguela", label: "Benguela" },
        { value: "bie", label: "Bié" },
        { value: "cabinda", label: "Cabinda" },
        { value: "cuando-cubango", label: "Cuando-Cubango" },
        { value: "cuanza-norte", label: "Cuanza-Norte" },
        { value: "cuanza-sul", label: "Cuanza-Sul" },
        { value: "cunene", label: "Cunene" },
        { value: "huambo", label: "Huambo" },
        { value: "huila", label: "Huíla" },
        { value: "luanda", label: "Luanda" },
        { value: "lunda-norte", label: "Lunda-Norte" },
        { value: "lunda-sul", label: "Lunda-Sul" },
        { value: "malanje", label: "Malanje" },
        { value: "moxico", label: "Moxico" },
        { value: "namibe", label: "Namibe" },
        { value: "uige", label: "Uíge" },
        { value: "zaire", label: "Zaire" },
    ];
</script>

<Select.Root type="single" bind:value onValueChange={handleValueChange}>
    <Select.Trigger class="w-full bg-white dark:bg-background">
        {value ? provinces.find(p => p.value === value)?.label : "Todas as Províncias"}
    </Select.Trigger>
    <Select.Content class="max-h-75">
        <Select.Item value="">Todas as Províncias</Select.Item>
        {#each provinces as province (province.value)}
            <Select.Item value={province.value}>{province.label}</Select.Item>
        {/each}
    </Select.Content>
</Select.Root>
