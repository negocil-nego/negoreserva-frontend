<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { File02Icon } from "@hugeicons/core-free-icons";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  const items = [
    {
      label: "PDF",
      icon: "/img/export/pdf-96.png",
      description: "Exportar dados em formato PDF",
    },
    {
      label: "Excel",
      icon: "/img/export/excel-96.png",
      description: "Exportar dados em formato Excel",
    },
    {
      label: "Word",
      icon: "/img/export/word-96.png",
      description: "Exportar dados em formato Word",
    },
    {
      label: "Json",
      icon: "/img/export/json-80.png",
      description: "Exportar dados em formato Json",
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
        icon={File02Icon}
        size={24}
        color="currentColor"
        strokeWidth={1}
      />
      Exportar
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[500px] md:max-w-[700px]">
      <Dialog.Header>
        <Dialog.Title>Exportar dados</Dialog.Title>
        <Dialog.Description>
          Selecione o formato e clique em exportar para baixar os dados.
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
        <Button type="submit">Exportar</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
