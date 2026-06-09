<script module>
  export type PersonFormAction = "create" | "update" | "delete";
  export type PersonFormItem = {
    person: PersonResponse;
    action: PersonFormAction;
    open: boolean;
  };
</script>

<script lang="ts">
  import { PersonService } from "../../data/service/person.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useAdminUpdatePerson } from "../../data/hooks/use-update";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useAdminSavePerson } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";
  import {
    PERSON_RESPONSE_EMPTY,
    type PersonResponse,
  } from "../../data/model/person.model";

  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useAdminDeletePerson } from "../../data/hooks/use-delete";

  const service = new PersonService();
  const saveMutation = useAdminSavePerson({ service });
  const updateMutation = useAdminUpdatePerson({ service });
  const deleteMutation = useAdminDeletePerson({ service });

  const formSchema = z.object({
    uuid: z.string(),
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(9).max(20),
    birthday: z.string(),
  });

  const form = superForm(PERSON_RESPONSE_EMPTY, {
    validators: zod4Client(formSchema),
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: PersonFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: PERSON_RESPONSE_EMPTY });
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
            birthday: $formData.birthday,
            password: "",
          });
          break;
        case "update":
          await $updateMutation.mutateAsync({
            uuid: item.person.uuid,
            request: {
              name: $formData.name,
              birthday: $formData.birthday,
            },
          });
          break;
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.person.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: PERSON_RESPONSE_EMPTY });
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.person.uuid,
          name: item.person.name,
          email: item.person.email,
          phone: item.person.phone,
          birthday: item.person.birthday,
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
          Nova Pessoa
        {:else if item.action === "update"}
          Editar Pessoa
        {:else if item.action === "delete"}
          Deletar Pessoa
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar uma nova pessoa.
        {:else if item.action === "update"}
          Atualize os campos da pessoa.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar a pessoa, esta ação não pode ser
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
        <Form.Field {form} name="birthday">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Data de Nascimento</Form.Label>
              <Input
                {...props}
                type="date"
                bind:value={$formData.birthday}
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
