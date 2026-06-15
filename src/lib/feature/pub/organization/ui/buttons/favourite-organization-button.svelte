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
    size: size,
    class: "bg-black/10 backdrop-blur-2xl text-white font-extrabold hover:bg-red-200 cursor-pointer",
  })}
>
  <HugeiconsIcon icon={HeartAddFreeIcons} color="currentColor" />
</Button>
