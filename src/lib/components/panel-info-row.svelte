<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type {Snippet} from "svelte";

  export type PanelInfoProps = {
    label: string;
    subLabel?: string;
    type?: "text" | "textarea" | "link" | "redirect" | "copy";
    icon?: any;
    isWrap?: boolean;
    image?: string;
    style?: string;
  }

  type PanelInfoLocalProps  = {
    children: Snippet;
  }  & PanelInfoProps

  let {
    label,
    subLabel,
    children,
    icon,
    image,
    isWrap,
    style = "col",
  }: PanelInfoLocalProps  = $props();
</script>

<div
        class="py-3 items-cente relative {style === 'col' ? 'sm:grid sm:grid-cols-2 sm:gap-3 flex-wrap' : 'sm:grid sm:grid-cols-1 sm:gap-1'}"
        class:flex-wrap={isWrap}
>
  <dt class="text-sm font-medium text-muted-foreground">
    <div class="flex items-center gap-2">
      <div class="italic flex items-center gap-3">
        {#if icon}
          <HugeiconsIcon
            {icon}
            size={15}
            color="currentColor"
            strokeWidth={1}
          />
        {/if}
        {#if image}
          <img src={image}
               alt="banner"
               class="h-[30px] w-[30px] object-cover"
          />
        {/if}
        <span class="font-extrabold">{label}</span>
      </div>
    </div>
    {#if subLabel}
      <div class="text-xs/6 text-muted-foreground">{subLabel}</div>
    {/if}
  </dt>
  <dd class="mt-1 text-sm/6 text-foreground sm:mt-0">
      {@render children?.() }
  </dd>
</div>
