<script lang="ts">
  interface Props {
    children: import("svelte").Snippet;
    spacing?: "default" | "relaxed";
  }

  let { children, spacing = "default" }: Props = $props();

  const spacingClass = $derived(spacing === "relaxed" ? "space-y-2" : "space-y-1.5");
</script>

<ul
  class="mb-3 ml-5 list-disc {spacingClass} text-[0.9375rem] leading-7 text-gray-600 dark:text-gray-50 marker:text-green-700"
>
  {@render children()}
</ul>
