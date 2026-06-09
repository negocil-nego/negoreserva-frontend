<script lang="ts">
  import type {
    HTMLInputAttributes,
    HTMLInputTypeAttribute,
  } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { Snippet } from "svelte";

  type InputType = Exclude<HTMLInputTypeAttribute, "file">;

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, "type"> &
      (
        | { type: "file"; files?: FileList }
        | { type?: InputType; files?: undefined }
      )
  >;

  type InputIconProps = Props & { suffix?: Snippet; preffix?: Snippet };

  let {
    ref = $bindable(null),
    value = $bindable(),
    type,
    files = $bindable(),
    class: className,
    "data-slot": dataSlot = "input",
    suffix,
    preffix,
    ...restProps
  }: Props & InputIconProps = $props();
</script>

<div
  class={cn(
    "bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-4xl border px-3 py-1 text-base transition-colors file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "flex items-center gap-1",
    className,
  )}
>
  {#if preffix}
    {@render preffix()}
  {/if}
  {#if type === "file"}
    <input
      bind:this={ref}
      data-slot={dataSlot}
      class="w-full outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent"
      type="file"
      bind:files
      bind:value
      {...restProps}
    />
  {:else}
    <input
      bind:this={ref}
      data-slot={dataSlot}
      class="w-full outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent"
      {type}
      bind:value
      {...restProps}
    />
  {/if}

  {#if suffix}
    {@render suffix()}
  {/if}
</div>
