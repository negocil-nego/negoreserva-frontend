<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: TabsPrimitive.ContentProps = $props();
</script>

<TabsPrimitive.Content
  bind:ref
  class={cn("mt-4 outline-none", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</TabsPrimitive.Content>
