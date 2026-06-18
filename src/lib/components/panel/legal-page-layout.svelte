<script lang="ts">
  import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
  import HomeNavbar from "$lib/feature/pub/home/home-navbar.svelte";

  interface Props {
    title: string;
    subtitle?: string;
    updatedAt: string;
    children: import("svelte").Snippet;
    footerActions?: import("svelte").Snippet;
  }

  let { title, subtitle, updatedAt, children, footerActions }: Props = $props();
</script>

<div class="bg-brand fixed w-full">
  <HomeNavbar />
</div>

<div class="min-h-screen bg-background px-6 py-12 pb-20 sm:px-4 sm:py-6">
  <div class="mx-auto max-w-[720px] pt-20">
    <header class="mb-12 border-b-2 border-green-700 pb-8">
      <h1
        class="mt-0 text-3xl font-extrabold tracking-tight text-[#1a2e1c] sm:text-2xl"
        style="line-height:1.15"
      >
        {title}
      </h1>
      {#if subtitle}
        <p class="mt-2 text-base leading-relaxed text-gray-500">{subtitle}</p>
      {/if}
      <p class="mt-3 font-mono text-xs text-gray-400">
        Última atualização: {updatedAt}
      </p>
    </header>

    <div
      class="rounded-xl border bg-panel px-10 py-10 shadow-sm sm:px-5 sm:py-6"
    >
      {@render children()}
    </div>

    <footer class="mt-10 pt-8">
      {#if footerActions}
        <div class="mb-8 flex flex-wrap gap-3">
          {@render footerActions()}
        </div>
      {/if}
    </footer>
  </div>
</div>

<div class="w-full">
  <HomeFooter />
</div>
