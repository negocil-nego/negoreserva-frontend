<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { MoneyBag01Icon } from "@hugeicons/core-free-icons";
</script>

<Button
  class="bg-linear-to-tl from-[#71dd4a] to-[#15803d] dark:from-[#21550e] dark:to-[#133d04] border-none hover:border-none dark:text-white"
>
  <HugeiconsIcon icon={MoneyBag01Icon} color="currentColor" />
  <div class="">Agendar</div>
</Button>
