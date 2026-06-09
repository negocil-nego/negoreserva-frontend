<script lang="ts">
    import PanelInfoRow from "./panel-info-row.svelte";
    import type {PanelInfoProps} from "$lib/components/panel-info-row.svelte";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {Copy01Icon, LinkSquare01Icon, Tick01Icon} from "@hugeicons/core-free-icons";

    type InfoRowProps = {
        value: string | number;
        isCopy?: boolean;
    }

    let {value, isCopy, ...rest}: InfoRowProps & PanelInfoProps = $props();

    let copied = $state(false);

    async function onCopy() {
        await navigator.clipboard.writeText(String(value));
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<PanelInfoRow {...rest}>
    <div class="flex w-full justify-between gap-2">
        <div class="min-w-0 flex-1">
            {#if rest.type === "redirect"}
                {#if typeof value === "string"}
                    <a href={value} target="_blank" rel="noopener noreferrer"
                       class="flex items-center gap-2 hover:underline">
                        <HugeiconsIcon icon={LinkSquare01Icon} size={15} strokeWidth={1} />
                        <span class="truncate">{value}</span>
                    </a>
                {/if}
            {:else}
                <span class="break-words">{value}</span>
            {/if}
        </div>

        {#if isCopy}
            <button
                    type="button"
                    onclick={onCopy}
                    class="shrink-0 cursor-pointer transition-opacity hover:opacity-70"
                    title={copied ? "Copiado!" : "Copiar"}
            >
                <HugeiconsIcon
                        icon={copied ? Tick01Icon : Copy01Icon}
                        size={20}
                        strokeWidth={1}
                />
            </button>
        {/if}
    </div>
</PanelInfoRow>