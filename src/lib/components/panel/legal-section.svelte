<script lang="ts">
  interface Props {
    number?: string;
    title: string;
    children: import("svelte").Snippet;
  }

  let { number, title, children }: Props = $props();
</script>

<section class="border-b border-gray-100 py-8 last:border-b-0">
  <div class="mb-5 flex items-baseline gap-3">
    {#if number}
      <span
        class="min-w-[2rem] font-mono text-xs font-bold uppercase tracking-widest text-green-700"
      >
        {number}
      </span>
    {/if}
    <h2 class="m-0 text-[1.05rem] font-bold tracking-tight text-[#1a2e1c]">
      {title}
    </h2>
  </div>
  <div class="pl-11 sm:pl-0">
    {@render children()}
  </div>
</section>
