<script lang="ts">
  import InputIcon from "$lib/components/ui/input-icon/input-icon.svelte";
  import {
    SquareLockPasswordIcon,
    ViewOffSlashIcon,
    ViewIcon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  let { value = $bindable(), props } = $props<{
    value?: any;
    props?: any;
  }>();

  let type = $state<"password" | "text">("password");

  function togglePassword() {
    type = type === "password" ? "text" : "password";
  }
</script>

<InputIcon
  bind:value
  {...props}
  placeholder="****************"
  class="md:p-5 text-sm"
  {type}
>
  {#snippet preffix()}
    <HugeiconsIcon
      icon={SquareLockPasswordIcon}
      size={20}
      color="currentColor"
      strokeWidth={1}
    />
  {/snippet}

  {#snippet suffix()}
    {#if type === "password"}
      <HugeiconsIcon
        icon={ViewOffSlashIcon}
        size={20}
        color="currentColor"
        strokeWidth={1}
        onclick={togglePassword}
        class="cursor-pointer"
      />
    {:else}
      <HugeiconsIcon
        icon={ViewIcon}
        size={20}
        color="currentColor"
        strokeWidth={1}
        onclick={togglePassword}
        class="cursor-pointer"
      />
    {/if}
  {/snippet}
</InputIcon>
