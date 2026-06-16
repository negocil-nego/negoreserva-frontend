<script module>
  export type ProvinceFormAction = "create" | "update" | "delete";
  export type ProvinceFormItem = {
    province: ProvinceResponse;
    action: ProvinceFormAction;
    open: boolean;
  };
</script>

<script lang="ts">
  import { ProvinceService } from "../../data/service/province.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useAdminUpdateProvince } from "../../data/hooks/use-update";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useAdminSaveProvince } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input/index.js";
  import { superForm } from "sveltekit-superforms";
  import {
    PROVINCE_RESPONSE_EMPTY,
    type ProvinceResponse,
  } from "../../../../shared/location/model/location.model";

  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useAdminDeleteProvince } from "../../data/hooks/use-delete";

  const service = new ProvinceService();
  const saveMutation = useAdminSaveProvince({ service });
  const updateMutation = useAdminUpdateProvince({ service });
  const deleteMutation = useAdminDeleteProvince({ service });

  const formSchema = z.object({
    uuid: z.string(),
    value: z.string().min(2).max(50),
    label: z.string().min(2).max(100),
  });

  const form = superForm(PROVINCE_RESPONSE_EMPTY, {
    validators: zod4Client(formSchema),
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: ProvinceFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: PROVINCE_RESPONSE_EMPTY });
    onClose?.();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if ($saveMutation.isLoading || $updateMutation.isLoading) return;

    try {
      switch (item.action) {
        case "create":
          await $saveMutation.mutateAsync({
            value: $formData.value,
            label: $formData.label,
          });
          break;
        case "update":
          await $updateMutation.mutateAsync({
            uuid: item.province.uuid,
            request: {
              value: $formData.value,
              label: $formData.label,
            },
          });
          break;
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.province.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar província:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: PROVINCE_RESPONSE_EMPTY });
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.province.uuid,
          value: item.province.value,
          label: item.province.label,
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
          Nova Província
        {:else if item.action === "update"}
          Editar Província
        {:else if item.action === "delete"}
          Deletar Província
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar uma nova província.
        {:else if item.action === "update"}
          Atualize os campos da província.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar a província, esta ação não pode ser
          desfeita.
        {/if}
      </Dialog.Description>
    </Dialog.Header>
    <form method="POST" onsubmit={onSubmit}>
      <div class="grid gap-4">
        <Form.Field {form} name="value">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Valor</Form.Label>
              <Input
                {...props}
                bind:value={$formData.value}
                disabled={item.action === "delete"}
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="label">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Nome</Form.Label>
              <Input
                {...props}
                bind:value={$formData.label}
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
