<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    Building03Icon,
    ShareIcon,
    Copy01Icon,
    BlockedIcon,
  } from "@hugeicons/core-free-icons";
  import Button from "$lib/components/ui/button/button.svelte";

  type Props = {
    name: string;
    logo?: string | null | undefined;
    image?: string | null | undefined;
  };

  let { image, name, logo }: Props = $props();
</script>

<section class="relative w-full">
  <div class="relative w-full flex items-center justify-center">
    <section
      class="relative flex items-end justify-center h-32 md:h-40 w-full overflow-hidden bg-linear-to-r from-green-400 via-green-500 to-green-600 dark:from-green-700 dark:via-green-800 dark:to-green-900"
    >
      {#if image}
        <img
          src={image}
          alt="banner"
          class="absolute z-10 h-full w-full object-cover"
        />
      {/if}

      <aside class="absolute top-1 right-2 p-4 flex gap-2 md:gap-3 z-10">
        <Button
          variant="outline"
          class="w-10 h-10 bg-white dark:bg-slate-900 cursor-pointer"
        >
          <HugeiconsIcon icon={Copy01Icon} size={20} />
        </Button>
        <Button
          variant="outline"
          class="w-10 h-10 bg-white dark:bg-slate-900 cursor-pointer"
        >
          <HugeiconsIcon icon={ShareIcon} size={20} />
        </Button>
        <Button
          variant="outline"
          class="w-10 h-10 border-0  bg-red-400 hover:bg-red-600 dark:bg-slate-900 dark:border dark:border-gray-50/20 cursor-pointer"
        >
          <HugeiconsIcon icon={BlockedIcon} size={20} />
        </Button>
      </aside>

      <aside class="absolute left-2 bottom-2 z-10">
        <aside class="bg-white">
          {#if logo}
            <img
              src={logo}
              alt={name}
              class="size-24 md:size-32 border-4 border-gray-300 dark:border-slate-600 object-cover"
            />
          {:else}
            <Avatar.Root class="size-24 border-4 border-background bg-muted">
              <Avatar.Fallback class="">
                <HugeiconsIcon icon={Building03Icon} size={36} />
              </Avatar.Fallback>
            </Avatar.Root>
          {/if}
        </aside>
      </aside>
    </section>
  </div>
</section>
