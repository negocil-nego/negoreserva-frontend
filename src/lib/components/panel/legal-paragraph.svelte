<script lang="ts">
  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<p class="mb-3 text-[0.9375rem] leading-7 text-gray-600 dark:text-gray-100">
  {@render children()}
</p>
