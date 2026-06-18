<script lang="ts">
  interface Props {
    number?: string;
    title: string;
    children: import("svelte").Snippet;
  }

  let { number, title, children }: Props = $props();
</script>

<section class="border-b border-gray-100 py-8 last:border-b-0 sm:py-6">
  <div class="mb-5 flex items-center gap-3">
    {#if number}
      <span
        class="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-green-50 font-mono text-xs font-bold text-green-700"
      >
        {number}
      </span>
    {/if}
    <h2 class="m-0 text-[1.08rem] font-bold tracking-tight text-[#1a2e1c] dark:text-green-50">
      {title}
    </h2>
  </div>
  <div class="pl-11 sm:pl-0">
    {@render children()}
  </div>
</section>
