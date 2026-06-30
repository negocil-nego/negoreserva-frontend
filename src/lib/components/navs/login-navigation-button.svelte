<script lang="ts">
  import { browser } from "$app/environment";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Login02Icon } from "@hugeicons/core-free-icons";
  import { goto } from "$app/navigation";
  import { ROUTE_SIGNING } from "$lib/data/route";
  import { Button } from "$lib/components/ui/button";
  import { resolve } from "$app/paths";

  type Props = { isLabel?: boolean };

  let { isLabel = false }: Props = $props();

  const navigateToLogin = () => {
    if (browser) goto(resolve(ROUTE_SIGNING as any));
  };
</script>

{#if isLabel}
  <Button
    variant="outline"
    class="cursor-pointer bg-white text-black dark:text-white"
    onclick={navigateToLogin}
  >
    <HugeiconsIcon
      icon={Login02Icon}
      size={20}
      color="currentColor"
      strokeWidth={2}
    />
    <span>Entrar</span>
  </Button>
{:else}
  <Button
    class="cursor-pointer bg-white text-black dark:text-white"
    variant="outline"
    size="icon"
    onclick={navigateToLogin}
  >
    <HugeiconsIcon
      icon={Login02Icon}
      size={20}
      color="currentColor"
      strokeWidth={2}
    />
  </Button>
{/if}
