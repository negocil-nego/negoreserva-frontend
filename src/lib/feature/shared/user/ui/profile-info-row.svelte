<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    PencilEdit02Icon,
    PlusSignSquareIcon,
  } from "@hugeicons/core-free-icons";
  import ProfileInfoLoader from "$lib/components/spinner/profile-info-loader.svelte";

  let {
    label,
    subLabel,
    value,
    type = "text",
    isLoading = false,
    icon,
    onSubmit,
  }: {
    label: string;
    subLabel?: string;
    value: string | null | undefined;
    type?: "text" | "textarea";
    icon?: any;
    onSubmit?: (value: string) => void;
    isLoading?: boolean;
  } = $props();

  let isEditing = $state(false);
  let text = $state("");

  $effect(() => {
    if (value) text = value;
  });
</script>

<div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
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
      <div class="text-xs/6 text-muted-foreground">{subLabel}</div>
    {/if}
  </dt>
  <dd class="mt-1 text-sm/6 text-foreground sm:mt-0">
    {#if isEditing}
      {#if type === "text"}
        <input bind:value={text} class="rounded-xl w-full md:w-8/12 bg-input/30" />
      {:else if type === "textarea"}
        <textarea
          bind:value
          class="rounded-xl w-full md:w-8/12 md:min-h-16 bg-input/30"
        ></textarea>
      {/if}
    {:else}
      {value ?? "-"}
    {/if}
  </dd>

  {#if isLoading}
    <ProfileInfoLoader />
  {:else if !isEditing}
    <button
      class="flex items-center justify-end gap-1 cursor-pointer text-sm sm:col-start-4 text-blue-800 dark:text-blue-200 mt-2 sm:mt-0"
      onclick={() => (isEditing = !isEditing)}
    >
      <HugeiconsIcon
        icon={PencilEdit02Icon}
        size={14}
        color="currentColor"
        strokeWidth={1}
      />
      <span>Editar</span>
    </button>
  {:else}
    <div class="flex items-center justify-start sm:justify-end gap-5 sm:col-start-4 mt-2 sm:mt-0">
      <button
        class="flex items-center gap-1 cursor-pointer text-sm text-red-800 dark:text-red-200"
        onclick={() => (isEditing = !isEditing)}
      >
        <HugeiconsIcon
          icon={PencilEdit02Icon}
          size={14}
          color="currentColor"
          strokeWidth={1}
        />
        <span>Cancelar</span>
      </button>
      <button
        class="flex items-center gap-1 cursor-pointer text-sm text-green-800 dark:text-green-200"
        onclick={() => {
          if (onSubmit && text.trim()) onSubmit(text);
          isEditing = !isEditing;
        }}
      >
        <HugeiconsIcon
          icon={PlusSignSquareIcon}
          size={14}
          color="currentColor"
          strokeWidth={1}
        />
        <span>Salvar</span>
      </button>
    </div>
  {/if}
</div>
