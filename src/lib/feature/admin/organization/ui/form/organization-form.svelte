<script module>
  export type OrganizationFormAction = "create" | "update" | "delete";
  export type OrganizationFormItem = {
    organization: OrganizationResponse;
    action: OrganizationFormAction;
    open: boolean;
  };
</script>

<script lang="ts">
  import { OrganizationService } from "../../data/service/organization.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useAdminUpdateOrganization } from "../../data/hooks/use-update";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useAdminSaveOrganization } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input/index.js";
  import { superForm } from "sveltekit-superforms";
  import {
    ORGANIZATION_RESPONSE_EMPTY,
    type OrganizationResponse,
  } from "../../data/model/organization.model";

  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useAdminDeleteOrganization } from "../../data/hooks/use-delete";

  const service = new OrganizationService();
  const saveMutation = useAdminSaveOrganization({ service });
  const updateMutation = useAdminUpdateOrganization({ service });
  const deleteMutation = useAdminDeleteOrganization({ service });

  const formSchema = z.object({
    uuid: z.string(),
    name: z.string().min(2).max(100),
    email: z.email().max(100),
    phone: z.string().min(9).max(20),
    address: z.string().max(255).optional(),
    description: z.string().max(255).optional(),
  });

  const form = superForm(ORGANIZATION_RESPONSE_EMPTY, {
    validators: zod4Client(formSchema),
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: OrganizationFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: ORGANIZATION_RESPONSE_EMPTY });
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
            email: $formData.email,
            phone: $formData.phone,
            address: $formData.address ?? "",
            description: $formData.description ?? "",
          });
          break;
        case "update":
          await $updateMutation.mutateAsync({
            uuid: item.organization.uuid,
            request: {
              name: $formData.name,
              email: $formData.email,
              phone: $formData.phone,
              address: $formData.address ?? "",
              description: $formData.description ?? "",
            },
          });
          break;
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.organization.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar organização:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: ORGANIZATION_RESPONSE_EMPTY });
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.organization.uuid,
          name: item.organization.name,
          email: item.organization.email,
          phone: item.organization.phone,
          address: item.organization.address ?? "",
          description: item.organization.description ?? "",
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
          Nova Organização
        {:else if item.action === "update"}
          Editar Organização
        {:else if item.action === "delete"}
          Deletar Organização
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar uma nova organização.
        {:else if item.action === "update"}
          Atualize os campos da organização.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar a organização, esta ação não pode ser
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
        <Form.Field {form} name="email">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Email</Form.Label>
              <Input
                {...props}
                type="email"
                bind:value={$formData.email}
                disabled={item.action === "delete"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="phone">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Telefone</Form.Label>
              <Input
                {...props}
                bind:value={$formData.phone}
                disabled={item.action === "delete"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="address">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Endereço</Form.Label>
              <Input
                {...props}
                bind:value={$formData.address}
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
