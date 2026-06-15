<script lang="ts">
  interface Props {
    text: string;
    className?: string;
    maxChars?: number;
  }

  let {
    text,
    className = "",
    maxChars = 80,
  }: Props = $props();

  let expanded = $state(false);
  let windowWidth = $state(0);

  const limit = $derived(windowWidth < 768 ? 50 : maxChars);
  const isLong = $derived(text?.length > limit);
  
  const displayText = $derived(
    isLong && !expanded ? text.slice(0, limit).trimEnd() : text
  );
</script>

<svelte:window bind:innerWidth={windowWidth} />

<span 
  class="cursor-pointer transition-colors duration-200 {className}"
  onclick={() => { if (isLong) expanded = !expanded; }}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === 'Enter') expanded = !expanded; }}
>
  {displayText}{#if isLong && !expanded}<span class="text-blue-500 font-medium">...</span>{/if}
</span>