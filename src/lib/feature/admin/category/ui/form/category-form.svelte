<script module>
  export type CategoryFormAction = "create" | "update" | "delete";
  export type CategoryFormItem = {
    category: CategoryResponse;
    action: CategoryFormAction;
    open: boolean;
  };
</script>

<script lang="ts">
  import { CategoryService } from "../../data/service/category.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useAdminUpdateCategory } from "../../data/hooks/use-update";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useAdminSaveCategory } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input/index.js";
  import { superForm } from "sveltekit-superforms";
  import {
    CATEGORY_RESPONSE_EMPTY,
    type CategoryResponse,
  } from "../../../../shared/category/model/category.model";

  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useAdminDeleteCategory } from "../../data/hooks/use-delete";

  const service = new CategoryService();
  const saveMutation = useAdminSaveCategory({ service });
  const updateMutation = useAdminUpdateCategory({ service });
  const deleteMutation = useAdminDeleteCategory({ service });

  const formSchema = z.object({
    uuid: z.string(),
    name: z.string().min(2).max(100),
    description: z.string().max(255).optional(),
  });

  const form = superForm(CATEGORY_RESPONSE_EMPTY, {
    validators: zod4Client(formSchema),
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: CategoryFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: CATEGORY_RESPONSE_EMPTY });
    onClose?.();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if ($saveMutation.isLoading || $updateMutation.isLoading) return;

    try {
      switch (item.action) {
        case "create":
          await $saveMutation.mutateAsync({
            name: $formData.name,
            description: $formData.description ?? "",
          });
          break;
        case "update":
          await $updateMutation.mutateAsync({
            uuid: item.category.uuid,
            request: {
              name: $formData.name,
              description: $formData.description ?? "",
            },
          });
          break;
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.category.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: CATEGORY_RESPONSE_EMPTY });
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.category.uuid,
          name: item.category.name,
          description: item.category.description ?? "",
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
          Nova Categoria
        {:else if item.action === "update"}
          Editar Categoria
        {:else if item.action === "delete"}
          Deletar Categoria
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar uma nova categoria.
        {:else if item.action === "update"}
          Atualize os campos da categoria.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar a categoria, esta ação não pode ser
          desfeita.
        {/if}
      </Dialog.Description>
    </Dialog.Header>
    <form method="POST" onsubmit={onSubmit}>
      <div class="grid gap-4">
        <Form.Field {form} name="name">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Nome</Form.Label>
              <Input
                {...props}
                bind:value={$formData.name}
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
              <Textarea
                {...props}
                bind:value={$formData.description}
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
