<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    Building03Icon,
    Copy01Icon,
    ShareIcon,
  } from "@hugeicons/core-free-icons";
  import { Button } from "$lib/components/ui/button";
  import RatingGenerator from "$lib/components/rating-generator.svelte";
  import {
    PHOTO_SOCIAL_NETWORK_FACEBOOK,
    PHOTO_SOCIAL_NETWORK_INSTAGRAM,
    PHOTO_SOCIAL_NETWORK_LINKEDIN,
    PHOTO_SOCIAL_NETWORK_TIKTOK,
    PHOTO_SOCIAL_NETWORK_YOUTUBE,
  } from "$lib/data/variables";
  import type { OrgOrganizationProfile } from "../data/model/organization";

  let { data }: { data: OrgOrganizationProfile } = $props();

  const org = $derived(data.organization);
  const socialMedia = $derived(data.socialMedia);

  const socials = $derived([
    {
      href: socialMedia?.facebook,
      src: PHOTO_SOCIAL_NETWORK_FACEBOOK,
      alt: "Facebook",
    },
    {
      href: socialMedia?.tiKtok,
      src: PHOTO_SOCIAL_NETWORK_TIKTOK,
      alt: "TikTok",
    },
    {
      href: socialMedia?.instagram,
      src: PHOTO_SOCIAL_NETWORK_INSTAGRAM,
      alt: "Instagram",
    },
    {
      href: socialMedia?.linkedin,
      src: PHOTO_SOCIAL_NETWORK_LINKEDIN,
      alt: "LinkedIn",
    },
    {
      href: socialMedia?.youtube,
      src: PHOTO_SOCIAL_NETWORK_YOUTUBE,
      alt: "YouTube",
    },
  ]);

  const descSize = $derived(org.description?.length ?? 0);
</script>

{#snippet socialLink(href: string | null | undefined, src: string, alt: string)}
  {#if href}
    <a
      {href}
      target="_blank"
      rel="noopener noreferrer"
      class="bg-white flex flex-col justify-center items-center p-1 h-6 w-6 md:w-8 md:h-8"
    >
      <img {src} {alt} class="h-full w-full object-cover" />
    </a>
  {/if}
{/snippet}

<section class="relative w-full">
  <div
    class="relative flex flex-col md:flex-row items-end justify-center md:h-48 w-full overflow-hidden bg-linear-to-r from-green-400 via-green-500 to-green-600 dark:from-green-700 dark:via-green-800 dark:to-green-900"
  >
    {#if org.image}
      <img
        src={org.image}
        alt="banner"
        class="absolute z-10 h-full w-full object-cover"
      />
    {/if}

    <aside class="z-20 md:absolute top-1 right-2 p-4 flex gap-2 md:gap-3">
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
    </aside>

    <section
      class="z-20 left-5 bottom-5 flex justify-center md:justify-between flex-col md:flex-row w-full items-end p-2"
    >
      <aside
        class="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-1 w-full lg:h-37.5 lg:gap-5"
      >
        {#if org.logo}
          <div class="bg-white w-25 lg:w-37.5 h-full">
            <img
              src={org.logo}
              alt={org.name}
              class="size-24 md:size-28 lg:h-full m-auto object-cover"
            />
          </div>
        {:else}
          <Avatar.Root class="size-24 border-4 border-background bg-muted">
            <Avatar.Fallback class="">
              <HugeiconsIcon icon={Building03Icon} size={36} />
            </Avatar.Fallback>
          </Avatar.Root>
        {/if}
        <div
          class="bg-black/5 p-1 flex flex-col items-center md:items-start md:h-full"
        >
          <div class="text-white font-bold text-xl">{org.name}</div>
          {#if org.rating}
            <RatingGenerator
              rating={org.rating}
              className="text-[20px] md:text-xl"
            />
          {/if}
          <div
            class="text-white text-center md:text-left md:w-100 lg:w-150 lg:my-2"
          >
            {#if descSize > 90}
              {org.description?.substring(0, 90)} ...
            {:else}
              {org.description}
            {/if}
          </div>
          {#if org.address}
            <div class="text-gray-300 lg:flex lg:flex-row lg:gap-2">
              <div class="text-sm font-semibold mb-1">Endereço Principal:</div>
              <p class="text-sm">{org.address}</p>
            </div>
          {/if}
        </div>
      </aside>

      <aside
        class="flex gap-3 w-full justify-center md:justify-end md:w-auto mt-2 md:mt-0"
      >
        {#each socials as { href, src, alt } (alt)}
          {@render socialLink(href, src, alt)}
        {/each}
      </aside>
    </section>
  </div>
  <div class="absolute z-10 inset-0 bg-black/50 to-transparent h-full"></div>
</section>
