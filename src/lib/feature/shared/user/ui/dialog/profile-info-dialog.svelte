<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { Snippet } from "svelte";
  import UpdateDataCountdown from "../update-data-countdown.svelte";

  let {
    label,
    subLabel,
    value,
    type = "text",
    icon,
    children,
    isExpired,
    expiredAt,
  }: {
    label: string;
    subLabel?: string;
    value: string | null | undefined;
    type?: "text" | "textarea" | "email";
    icon?: any;
    children: Snippet;
    onSubmit?: (value: string) => void;
    isExpired?: boolean;
    expiredAt?: string | null;
  } = $props();

  let isEditing = $state(false);
  let text = $state("");

  $effect(() => {
    if (value) text = value;
  });
</script>

<div
  class={`py-6 sm:grid sm:grid-cols-3 items-center w-full 
  ${isExpired ? "bg-alert-600/30 animate-pulse" : ""}`}
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
        <span class="font-extrabold">{label}</span>
      </div>
    </div>
    {#if subLabel}
      <div class="text-xs/6 text-muted-foreground lg:w-11/12">{subLabel}</div>
    {/if}
  </dt>
  <dd class="sm:-ml-4 p-0 mt-1 text-sm/6 text-foreground sm:mt-0">
    {#if isEditing}
      {#if type === "text"}
        <input bind:value={text} class="rounded-xl md:w-8/12 bg-input/30" />
      {:else if type === "textarea"}
        <textarea
          bind:value
          class="rounded-xl md:w-8/12 md:min-h-16 bg-input/30"
        ></textarea>
      {/if}
    {:else}
      {value ?? "-"}
    {/if}
  </dd>
  <div class="flex justify-start sm:justify-end">
    {@render children()}
  </div>
</div>

{#if expiredAt}
  <UpdateDataCountdown {expiredAt} />
{/if}
