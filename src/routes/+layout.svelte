<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import { ModeWatcher } from "mode-watcher";
  import { QueryClientProvider } from "@sveltestack/svelte-query";
  import { queryClient } from "$lib/providers/use-query.provider";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="stylesheet" href="/animate.min.css" />
  <link rel="stylesheet" href="/hugeicons.css" />
</svelte:head>
<ModeWatcher />
<Toaster />
<QueryClientProvider client={queryClient}>
  {@render children()}
</QueryClientProvider>
