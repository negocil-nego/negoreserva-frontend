<script module>
  export type MunicipalityFormAction = "create" | "update" | "delete";
  export type MunicipalityFormItem = {
    municipality: MunicipalityResponse;
    action: MunicipalityFormAction;
    open: boolean;
  };
</script>

<script lang="ts">
  import { MunicipalityService } from "../../data/service/municipality.service";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { useAdminUpdateMunicipality } from "../../data/hooks/use-update";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { useAdminSaveMunicipality } from "../../data/hooks/use-save";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input/index.js";
  import { superForm } from "sveltekit-superforms";
  import {
    MUNICIPALITY_RESPONSE_EMPTY,
    type MunicipalityResponse,
  } from "../../../../shared/location/model/location.model";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import z from "zod";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { useAdminDeleteMunicipality } from "../../data/hooks/use-delete";
  import { onMount } from "svelte";

  const service = new MunicipalityService();
  const saveMutation = useAdminSaveMunicipality({ service });
  const updateMutation = useAdminUpdateMunicipality({ service });
  const deleteMutation = useAdminDeleteMunicipality({ service });

  let provinces = $state<{ uuid: string; value: string; label: string }[]>([]);
  let selectedProvinceId = $state<string>("");
  let provincesLoaded = $state(false);

  onMount(async () => {
    try {
      provinces = await service.listProvinces();
      provincesLoaded = true;
    } catch (e) {
      console.error("Erro ao carregar províncias:", e);
      provincesLoaded = true;
    }
  });

  const formSchema = z.object({
    uuid: z.string(),
    value: z.string().min(2).max(50),
    label: z.string().min(2).max(100),
  });

  const form = superForm(MUNICIPALITY_RESPONSE_EMPTY, {
    validators: zod4Client(formSchema),
  });

  const {
    item,
    onClose,
    onSuccess,
  }: {
    item: MunicipalityFormItem;
    onClose?: () => void;
    onSuccess?: () => void;
  } = $props();

  const { form: formData, reset } = form;

  const handleClose = () => {
    reset({ data: MUNICIPALITY_RESPONSE_EMPTY });
    selectedProvinceId = "";
    onClose?.();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if ($saveMutation.isLoading || $updateMutation.isLoading) return;

    try {
      switch (item.action) {
        case "create": {
          const province = provinces.find(p => p.uuid === selectedProvinceId);
          if (!province) return;
          await $saveMutation.mutateAsync({
            value: $formData.value,
            label: $formData.label,
            provinceId: 0,
          });
          break;
        }
        case "update": {
          const province = provinces.find(p => p.uuid === selectedProvinceId);
          if (!province) return;
          await $updateMutation.mutateAsync({
            uuid: item.municipality.uuid,
            request: {
              value: $formData.value,
              label: $formData.label,
              provinceId: 0,
            },
          });
          break;
        }
        case "delete":
          await $deleteMutation.mutateAsync({
            uuid: item.municipality.uuid,
          });
          break;
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar município:", error);
    }
  };

  let isLoading = $derived(
    $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );

  $effect(() => {
    if (!item.open) {
      reset({ data: MUNICIPALITY_RESPONSE_EMPTY });
      selectedProvinceId = "";
      return;
    }

    if (item.action === "update" || item.action === "delete") {
      reset({
        data: {
          uuid: item.municipality.uuid,
          value: item.municipality.value,
          label: item.municipality.label,
          provinceUuid: item.municipality.provinceUuid,
          provinceValue: item.municipality.provinceValue,
          provinceLabel: item.municipality.provinceLabel,
        },
      });
      selectedProvinceId = item.municipality.provinceUuid;
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
          Novo Município
        {:else if item.action === "update"}
          Editar Município
        {:else if item.action === "delete"}
          Deletar Município
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if item.action === "create"}
          Preencha os campos para criar um novo município.
        {:else if item.action === "update"}
          Atualize os campos do município.
        {:else if item.action === "delete"}
          Tem certeza que deseja deletar o município, esta ação não pode ser
          desfeita.
        {/if}
      </Dialog.Description>
    </Dialog.Header>
    <form method="POST" onsubmit={onSubmit}>
      <div class="grid gap-4">
        {#if item.action !== "delete"}
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
          <div class="grid gap-2">
            <Form.Label>Província</Form.Label>
            <Select.Root
              type="single"
              value={selectedProvinceId}
              onValueChange={(v) => (selectedProvinceId = v)}
              disabled={!provincesLoaded || provinces.length === 0}
            >
              <Select.Trigger class="w-full">
                {provinces.find(p => p.uuid === selectedProvinceId)?.label || (provincesLoaded ? "Selecione uma província" : "Carregando...")}
              </Select.Trigger>
              <Select.Content>
                {#each provinces as province}
                  <Select.Item value={province.uuid} label={province.label}>
                    {province.label}
                  </Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>
        {/if}
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
