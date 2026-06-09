<script lang="ts">
  import type { CategoryResponse } from "$lib/feature/shared/category/model/category.model";

  import * as Carousel from "$lib/components/ui/carousel/index.js";

  let { categories } = $props<{ categories: CategoryResponse[] }>();
</script>

{#if categories.length === 0}
  <p>Não há categorias</p>
{:else}
  <div class="w-full">
    <Carousel.Root class="w-full relative">
      <Carousel.Content>
        {#each categories as { uuid, name } (uuid)}
          <Carousel.Item class="basis-auto">
            <div
              class="p-1 border text-center rounded-3xl min-w-20.5 text-[11px] bg-white dark:bg-background"
            >
              {name}
            </div>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  </div>
{/if}
