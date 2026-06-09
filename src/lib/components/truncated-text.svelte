<script lang="ts">
  interface Props {
    text: string;
    className?: string;
    maxChars?: number;
    showLabel?: string;
    hideLabel?: string;
  }

  let {
    text,
    className,
    maxChars = 80,
    showLabel = "",
    hideLabel = "",
  }: Props = $props();

  let expanded = $state(false);
  let windowWidth = $state(0);

  const effectiveMaxChars = $derived(windowWidth <= 1920 ? 30 : maxChars);

  const isLong = $derived(text?.length > effectiveMaxChars);
  const displayText = $derived(
    isLong && !expanded ? text.slice(0, effectiveMaxChars).trimEnd() : text,
  );
</script>

<svelte:window bind:innerWidth={windowWidth} />

<span class={`truncated-text text-nowrap ${className ?? ""}`}>
  {displayText}{#if isLong && !expanded}...{/if}
  {#if isLong}
    <button
      type="button"
      class="toggle-btn"
      onclick={() => (expanded = !expanded)}
    >
      {expanded ? hideLabel : showLabel}
    </button>
  {/if}
</span>

<style>
  .truncated-text {
    font-size: inherit;
    color: inherit;
    line-height: inherit;
  }

  .toggle-btn {
    background: none;
    border: none;
    padding: 0;
    margin-left: 2px;
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;
    color: #3b82f6;
    white-space: nowrap;
  }

  .toggle-btn:hover {
    text-decoration: underline;
  }

  :global(.dark) .toggle-btn {
    color: #60a5fa;
  }
</style>
