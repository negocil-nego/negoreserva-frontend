<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { FileUpIcon } from "@hugeicons/core-free-icons";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  const items = [
    {
      label: "Excel",
      icon: "/img/export/excel-96.png",
      description: "Importar dados em formato Excel",
    },
    {
      label: "Json",
      icon: "/img/export/json-80.png",
      description: "Importar dados em formato Json",
    },
  ];
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger
      type="button"
      class={buttonVariants({ variant: "outline" })}
    >
      <HugeiconsIcon
        icon={FileUpIcon}
        size={24}
        color="currentColor"
        strokeWidth={1}
      />
      Importar
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[500px] md:max-w-[600px]">
      <Dialog.Header>
        <Dialog.Title>Importar dados</Dialog.Title>
        <Dialog.Description>
          Selecione o formato e clique para importar os dados.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        {#each items as item (item.label)}
          <div
            class="flex items-center gap-4 border rounded-md p-4 hover:bg-muted hover:cursor-pointer"
          >
            <img src={item.icon} alt={item.label} class="w-8 h-8" />
            <div>
              <p class="text-sm font-medium">{item.label}</p>
              <p class="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        {/each}
      </div>
      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class={buttonVariants({ variant: "outline" })}
        >
          Cancelar
        </Dialog.Close>
        <Button type="submit">Importar</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
