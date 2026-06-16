<script lang="ts">
  import type { OrganizationResponse } from "$lib/feature/pub/organization";
  import HeaderCardOrganization from "./header-card-organization.svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

  let { item } = $props<{ item: OrganizationResponse }>();
</script>

<aside class="rounded-md border border-gray-50 dark:border-gray-800 relative">
  <div
    class="absolute p-2 flex flex-col-reverse items-center md:flex-row justify-between z-5 w-full"
  >
    <div
      class="absolute inset-0 bg-linear-to-b from-black/80 to-transparent rounded-md min-h-40 md:min-h-52"
    ></div>
    <HeaderCardOrganization {item} />
  </div>
  <div class="relative h-50 lg:min-h-56 xl:min-h-72">
    <button class="w-full">
      <img
        src={item.image}
        alt={item.name}
        class="w-full h-50 lg:min-h-56 xl:min-h-72 object-cover group-hover:scale-105 transition-transform duration-500 rounded-md"
      />
    </button>

    <button
      class="absolute bottom-1 right-1 md:bottom-2 md:right-2 md:px-5 bg-black/40 backdrop-blur-lg rounded-full min-w-20 p-1 flex gap-2 items-center justify-center cursor-pointer text-white"
      onclick={() => {
        goto(resolve(`/organization/${item.slug}`));
      }}
    >
      Perfil
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={16}
        color="#ffffff"
        strokeWidth={1}
      />
    </button>
  </div>
</aside>
