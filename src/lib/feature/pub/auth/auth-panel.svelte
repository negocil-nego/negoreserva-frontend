<script lang="ts">
  import Autoplay from "embla-carousel-autoplay";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type { Snippet } from "svelte";
  import { ROUTE_HOME } from "$lib/data/route";
  import { resolve } from "$app/paths";
  import { goto } from "$app/navigation";

  type Item = {
    title: string;
    image: string;
    description: string;
  };

  let { items, form, controls, breadcrumb } = $props<{
    items: Item[];
    form: Snippet;
    controls?: Snippet;
    breadcrumb?: Snippet;
  }>();

  let numbers = items?.length
    ? Array.from({ length: items.length }, (_, i) => i + 1)
    : [];
</script>

<div class="grid lg:grid-cols-2">
  <div class="flex flex-col gap-4 p-2 md:p-6 h-screen">
    <div class="flex justify-between gap-2">
      <button
        class="flex cursor-pointer"
        onclick={() => goto(resolve(ROUTE_HOME))}
      >
        <div class="text-green-800 font-extrabold">NEGO</div>
        <div class="font-extrabold text-gray-700 dark:text-white">RESERVA</div>
      </button>
      {#if breadcrumb}
        <div>
          {@render breadcrumb()}
        </div>
      {/if}
    </div>
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full md:max-w-9/12">
        {@render form()}
      </div>
    </div>
  </div>

  <div class="bg-muted relative hidden lg:block">
    <Carousel.Root
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
      opts={{ loop: true }}
      class="w-1/2 fixed "
    >
      <Carousel.Content>
        {#each numbers as i (i)}
          <Carousel.Item class="">
            <div
              class="flex aspect-square items-center justify-center relative h-[100dvh] w-full"
            >
              {#if controls}
                <div class="absolute top-4 right-4 z-10 flex gap-1.5">
                  {@render controls()}
                </div>
              {/if}
              <img
                src={items[i - 1].image}
                alt={items[i - 1].title}
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent"
              ></div>
              <div
                class="absolute bottom-4 md:bottom-10 left-4 text-white px-10 space-y-2 md:space-y-5"
              >
                <div class="text-2xl font-bold">{items[i - 1].title}</div>
                <div class="text-sm h-[100px]">{items[i - 1].description}</div>

                {#if items.length > 1}
                  <div class="flex gap-2 items-center">
                    {#each numbers as num (num)}
                      <div
                        class={`h-3 w-3 rounded-full ${
                          num === i ? "bg-brand w-5 md:w-15 lg:w-20" : "bg-white"
                        }`}
                      ></div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  </div>
</div>

<style>
  :global(body) {
    overflow-x: hidden;
  }
</style>
