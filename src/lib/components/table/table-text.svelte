<script lang="ts">
    type TableTextPros = { text?: string | null | undefined }

    let {
        text
    }: TableTextPros = $props()
</script>

<div>
    {#if text}
        {#if text.length > 50}
            {text.substring(0, 50)} ...
        {:else}
            {text}
        {/if}
    {:else}
        -
    {/if}
</div>