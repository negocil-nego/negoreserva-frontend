<script lang="ts">
  import Button, {
    buttonVariants,
  } from "$lib/components/ui/button/button.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { HeartAddFreeIcons } from "@hugeicons/core-free-icons";
</script>

<Button
  variant="ghost"
  size="icon-sm"
  class={buttonVariants({
    variant: "outline",
    size: "sm",
    class: "bg-white text-green-800 dark:bg-slate-900",
  })}
>
  <HugeiconsIcon icon={HeartAddFreeIcons} color="currentColor" />
</Button>
