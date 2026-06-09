<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useDeleteProduct } from "../../data/hooks/use-delete";
  import type {ProductFormItem} from "$lib/feature/org/product/data/model/product.form";
  import { ProductService } from "../../data/service/product.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useUpdateProduct } from "../../data/hooks/use-update";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useSaveProduct } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input/index.js";
  import { superForm } from "sveltekit-superforms";

  const PRODUCT_FORM_EMPTY = {
    uuid: "",
    name: "",
    price: 0,
    description: "",
    type: "",
    organizationUuid: "",
  };


  const service = new ProductService();
  const saveMutation = useSaveProduct({ service });
  const updateMutation = useUpdateProduct({ service });
  const deleteMutation = useDeleteProduct({ service });

  const formSchema = z.object({
    name: z.string().min(2).max(100),
    price: z.number().min(0),
    type: z.string().min(1).max(50),
    description: z.string().max(255).optional(),
    organizationUuid: z.string().optional(),
  });

  const form = superForm(PRODUCT_FORM_EMPTY, {
    validators: zod4Client(formSchema),
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: ProductFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: PRODUCT_FORM_EMPTY });
    onClose?.();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if ($saveMutation.isLoading || $updateMutation.isLoading) return;

    try {
      switch (item.action) {
        case "create":
          await $saveMutation.mutateAsync({
            organizationUuid: item.product.organization.uuid ?? "",
            description: $formData.description ?? "",
            price: Number($formData.price),
            name: $formData.name,
            type: $formData.type,
          });
          break;
        case "update":
          await $updateMutation.mutateAsync({
            uuid: item.product.uuid,
            request: {
              organizationUuid: item.product.organization.uuid ?? "",
              description: $formData.description ?? "",
              price: Number($formData.price),
              name: $formData.name,
              type: $formData.type,
            },
          });
          break;
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.product.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: PRODUCT_FORM_EMPTY });
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.product.uuid,
          name: item.product.name,
          price: item.product.price,
          type: item.product.type,
          description: item.product.description ?? "",
          organizationUuid: item.product.organization.uuid ?? "",
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
          Novo Produto
        {:else if item.action === "update"}
          Editar Produto
        {:else if item.action === "delete"}
          Deletar Produto
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar um novo produto.
        {:else if item.action === "update"}
          Atualize os campos do produto.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar o produto, esta ação não pode ser
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
        <Form.Field {form} name="price">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Preço</Form.Label>
              <Input
                {...props}
                type="number"
                bind:value={$formData.price}
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
