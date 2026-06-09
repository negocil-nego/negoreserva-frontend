<script lang="ts">
  import type { ProductTagInfoGetOrgResponse } from "../data/model/organization.model";

  import * as Carousel from "$lib/components/ui/carousel/index.js";

  let { tags } = $props<{ tags: ProductTagInfoGetOrgResponse[] }>();
</script>

{#if tags.length === 0}
  <p>Não há tags</p>
{:else}
  <div class="w-full">
    <Carousel.Root class="w-full relative">
      <Carousel.Content>
        {#each tags as { uuid, title, value, icon } (uuid)}
          <Carousel.Item class="basis-auto">
            <div
              class="p-1 border text-center rounded-3xl min-w-[82px] text-[11px] bg-white dark:bg-transparent
              flex items-center gap-1 px-2"
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
