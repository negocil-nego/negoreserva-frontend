<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type { OrganizationResponse } from "$lib/feature/pub/organization";
  import HeaderCardOrganization from "./header-card-organization.svelte";
  import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  let { item } = $props<{ item: OrganizationResponse }>();
</script>

<aside class="border border-gray-50 dark:border-gray-800 relative">
  <div
    class="absolute p-2 flex flex-col-reverse items-center md:flex-row justify-between z-5 w-full"
  >
    <div
      class="absolute inset-0 bg-linear-to-b from-black/80 to-transparent min-h-40 md:min-h-52"
    ></div>
    <HeaderCardOrganization {item} />
  </div>
  <div class="relative h-50 lg:min-h-56 xl:min-h-72">
    <button class="w-full">
      <img
        src={item.image}
        alt={item.name}
        class="w-full h-50 lg:min-h-56 xl:min-h-72 object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </button>

    <div
      class="absolute bottom-1 md:bottom-2 w-full flex items-center justify-between px-2"
    >
      <Carousel.Root class="w-2/3 relative group" opts={{ dragFree: true }}>
        <Carousel.Content class="-ml-2">
          {#each item.categories as category (category.uuid)}
            <Carousel.Item class="pl-2 basis-auto">
              <div
                class="bg-black/60 text-white px-4 py-1 flex gap-2 items-center cursor-pointer hover:bg-black/75 transition-colors"
              >
                <i class={category.icon ?? "hgi-a-access"}></i>
                <span class="whitespace-nowrap text-sm font-medium"
                  >{category.name}</span
                >
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
      </Carousel.Root>
      <button
        class="bg-black/40 backdrop-blur-lg p-1 flex px-2 gap-2 items-center justify-between cursor-pointer text-white border border-gray-50/50"
        onclick={() => {
          goto(resolve(`/detail/organization/${item.slug}`));
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
  </div>
</aside>
