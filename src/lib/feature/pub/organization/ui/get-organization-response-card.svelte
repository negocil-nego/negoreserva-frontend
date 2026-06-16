<script lang="ts">
  import type { OrganizationResponse } from "$lib/feature/pub/organization";
  import HeaderCardOrganization from "./header-card-organization.svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  let { item } = $props<{ item: OrganizationResponse }>();
</script>

<aside
  class="rounded-md border border-gray-50 dark:border-gray-800 relative"
>
  <div
    class="absolute p-2 flex flex-col-reverse md:flex-row justify-between z-5 w-full"
  >
    <div class="absolute inset-0 bg-linear-to-b from-black/70 to-transparent rounded-md min-h-40"></div>
    <HeaderCardOrganization {item} />
  </div>
  <div class="relative h-50 lg:min-h-56 xl:min-h-72">
    <button
      onclick={() => {
        goto(resolve(`/organization/${item.slug}`));
      }}
      class="w-full"
    >
      <img
        src={item.image}
        alt={item.name}
        class="w-full h-50 lg:min-h-56 xl:min-h-72 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer rounded-md"
      />
    </button>
  </div>
</aside>