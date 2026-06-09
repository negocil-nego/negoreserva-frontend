<script lang="ts">
  import { resolve } from "$app/paths";
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import HomeIcon from "@lucide/svelte/icons/home";
</script>

<Button
  onclick={() => goto(resolve("/"))}
  variant="ghost"
  size="icon"
  class="hidden md:flex items-center justify-center gap-2"
>
  <HomeIcon />
  <span>Página inicial</span>
</Button>
