<script module>
  export type ProductFileFormAction = "create" | "update" | "delete";
  export type ProductFileFormItem = {
    productfile: ProductFileResponse;
    action: ProductFileFormAction;
    open: boolean;
  };
</script>

<script lang="ts">
  import { ProductFileService } from "../../data/service/productfile.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useUpdateProductFile } from "../../data/hooks/use-update";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useSaveProductFile } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";
  import { type ProductFileResponse } from "../../data/model/productfile.model";

  const PRODUCTFILE_FORM_EMPTY = {
    uuid: "",
    title: "",
    description: "",
    url: "",
    type: "",
    product: {
      uuid: "",
    },
  };

  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useDeleteProductFile } from "../../data/hooks/use-delete";

  const service = new ProductFileService();
  const saveMutation = useSaveProductFile({ service });
  const updateMutation = useUpdateProductFile({ service });
  const deleteMutation = useDeleteProductFile({ service });

  const formSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    product: z
      .object({
        uuid: z.string(),
      })
      .optional(),
    url: z.string(),
    type: z.string(),
  });

  const form = superForm(PRODUCTFILE_FORM_EMPTY, {
    validators: zod4Client(formSchema),
    dataType: "json",
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: ProductFileFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: PRODUCTFILE_FORM_EMPTY });
    onClose?.();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if ($saveMutation.isLoading || $updateMutation.isLoading) return;

    try {
      switch (item.action) {
        case "create":
          await $saveMutation.mutateAsync({
            title: $formData.title ?? "",
            description: $formData.description ?? "",
            productUuid: $formData.product.uuid ?? "",
            url: $formData.url,
            type: $formData.type,
          });
          break;
        case "update":
          await $updateMutation.mutateAsync({
            uuid: item.productfile.uuid,
            request: {
              title: $formData.title ?? "",
              description: $formData.description ?? "",
              productUuid: item.productfile.product.uuid ?? "",
              url: $formData.url,
              type: $formData.type,
            },
          });
          break;
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.productfile.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar arquivo de produto:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: PRODUCTFILE_FORM_EMPTY });
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.productfile.uuid,
          title: item.productfile.title ?? "",
          description: item.productfile.description ?? "",
          product: {
            uuid: item.productfile.product.uuid ?? "",
          },
          url: item.productfile.url,
          type: item.productfile.type,
        },
      });
    }
  });
</script>

<Dialog.Root open={item.open} onOpenChange={(open) => !open && handleClose()}>
  <Dialog.Trigger
    type="button"
    class={buttonVariants({
      variant: "default",
      class: "bg-primary text-white dark:bg-primary/80",
    })}
    disabled={isLoading}
  >
    <TableLabelCreate />
  </Dialog.Trigger>
  <Dialog.Content
    class={[
      "sm:max-w-[425px]",
      item.action === "delete" && "border border-red-400",
    ]}
  >
    <Dialog.Header>
      <Dialog.Title class={[item.action === "delete" && "text-red-400"]}>
        {#if item.action === "create"}
          Novo Arquivo de Produto
        {:else if item.action === "update"}
          Editar Arquivo de Produto
        {:else if item.action === "delete"}
          Deletar Arquivo de Produto
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar um novo arquivo.
        {:else if item.action === "update"}
          Atualize os campos do arquivo.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar o arquivo, esta ação não pode ser
          desfeita.
        {/if}
      </Dialog.Description>
    </Dialog.Header>
    <form method="POST" onsubmit={onSubmit}>
      <div class="grid gap-4">
        <Form.Field {form} name="title">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Título</Form.Label>
              <Input
                {...props}
                bind:value={$formData.title}
                disabled={item.action === "delete"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="description">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Descrição</Form.Label>
              <Input
                {...props}
                bind:value={$formData.description}
                disabled={item.action === "delete"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="url">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>URL</Form.Label>
              <Input
                {...props}
                bind:value={$formData.url}
                disabled={item.action === "delete"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="type">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Tipo</Form.Label>
              <Input
                {...props}
                bind:value={$formData.type}
                disabled={item.action === "delete"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class={buttonVariants({ variant: "outline" })}
        >
          Cancelar
        </Dialog.Close>
        <Form.Button
          disabled={isLoading}
          class={buttonVariants({
            variant: item.action === "delete" ? "destructive" : "default",
          })}
        >
          {#if item.action === "create"}
            Criar
          {:else if item.action === "update"}
            Editar
          {:else if item.action === "delete"}
            Eliminar
          {/if}
        </Form.Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
