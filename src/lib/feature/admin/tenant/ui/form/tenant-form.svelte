<script module>
  export type TenantFormAction = "create" | "update" | "delete";
  export type TenantFormItem = {
    tenant: TenantResponse;
    action: TenantFormAction;
    open: boolean;
  };
</script>

<script lang="ts">
  import { TenantService } from "../../data/service/tenant.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useUpdateTenant } from "../../data/hooks/use-update";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useSaveTenant } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";
  import {
    TENANT_RESPONSE_EMPTY,
    type TenantResponse,
  } from "../../data/model/tenant.model";

  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useDeleteTenant } from "../../data/hooks/use-delete";

  const service = new TenantService();
  const saveMutation = useSaveTenant({ service });
  const updateMutation = useUpdateTenant({ service });
  const deleteMutation = useDeleteTenant({ service });

  const formSchema = z.object({
    uuid: z.string(),
    code: z.string().min(1).max(50),
    name: z.string().min(1).max(100),
  });

  const form = superForm(TENANT_RESPONSE_EMPTY, {
    validators: zod4Client(formSchema),
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: TenantFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: TENANT_RESPONSE_EMPTY });
    onClose?.();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if ($saveMutation.isLoading || $updateMutation.isLoading) return;

    try {
      switch (item.action) {
        case "create":
          await $saveMutation.mutateAsync({
            code: $formData.code,
            name: $formData.name,
          });
          break;
        case "update":
          await $updateMutation.mutateAsync({
            uuid: item.tenant.uuid,
            request: {
              name: $formData.name,
            },
          });
          break;
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.tenant.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar inquilino:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: TENANT_RESPONSE_EMPTY });
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.tenant.uuid,
          code: item.tenant.code,
          name: item.tenant.name,
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
          Novo Inquilino
        {:else if item.action === "update"}
          Editar Inquilino
        {:else if item.action === "delete"}
          Deletar Inquilino
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar um novo inquilino.
        {:else if item.action === "update"}
          Atualize os campos do inquilino.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar o inquilino, esta ação não pode ser desfeita.
        {/if}
      </Dialog.Description>
    </Dialog.Header>
    <form method="POST" onsubmit={onSubmit}>
      <div class="grid gap-4">
        <Form.Field {form} name="code">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Código</Form.Label>
              <Input
                {...props}
                bind:value={$formData.code}
                disabled={item.action === "delete" || item.action === "update"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
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