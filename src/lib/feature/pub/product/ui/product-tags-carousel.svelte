<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type { ProductTagInfoGetOrgResponse } from "../../organization";

  let { tags } = $props<{ tags: ProductTagInfoGetOrgResponse[] }>();
</script>

{#if tags.length === 0}
  <p>Não há tags</p>
{:else}
  <div class="w-full">
    <Carousel.Root class="w-full relative">
      <Carousel.Content>
        {#each tags as { uuid, icon, title, value } (uuid)}
          <Carousel.Item class="basis-auto">
            <div
              class="p-1 text-center rounded-3xl min-w-[82px] text-[11px] bg-gray-50 dark:bg-transparent"
            >
              {#if icon}
                <i class={icon}></i>
              {/if}
              <span>{title}: {value}</span>
            </div>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  </div>
{/if}
