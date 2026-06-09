<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import Button, {
    buttonVariants,
  } from "$lib/components/ui/button/button.svelte";

  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Notification01Icon } from "@hugeicons/core-free-icons";
</script>

<Drawer.Root direction="right">
  <Drawer.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
    <HugeiconsIcon icon={Notification01Icon} color="currentColor" />
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
