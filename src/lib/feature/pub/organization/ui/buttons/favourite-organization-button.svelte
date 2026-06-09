<script lang="ts">
  import Button, {
    buttonVariants,
    type ButtonSize,
  } from "$lib/components/ui/button/button.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { HeartAddFreeIcons } from "@hugeicons/core-free-icons";

  let { size = "sm" }: { size?: ButtonSize } = $props();
</script>

<Button
  variant="ghost"
  {size}
  class={buttonVariants({
    variant: "outline",
    size: size,
    class: "bg-white text-green-800 dark:bg-slate-900",
  })}
>
  <HugeiconsIcon icon={HeartAddFreeIcons} color="currentColor" />
</Button>
