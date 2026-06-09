<script lang="ts">
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {Gps01Icon} from "@hugeicons/core-free-icons";

    let {
        onclick,
    }: {
        onclick?: () => void;
    } = $props();
</script>

<button
    onclick={onclick}
    class="flex items-center justify-center size-10 bg-brand rounded-full"
    title="Pesquisar pela minha localização"
>
    <HugeiconsIcon icon={Gps01Icon} size={20} color="currentColor" strokeWidth={2}/>
</button>
