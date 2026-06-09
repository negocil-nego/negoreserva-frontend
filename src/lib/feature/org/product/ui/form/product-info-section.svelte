<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  let {
    name = $bindable(),
    description = $bindable(),
    readOnly = false,
  }: {
    name: string;
    description: string;
    readOnly?: boolean;
  } = $props();
</script>

<div id="product-info-section" class="bg-white  dark:bg-transparent rounded-2xl p-6 space-y-6 scroll-mt-20">
  <div class="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Informações do Produto</h3>
    <p class="text-sm text-slate-500 dark:text-slate-400">Insira o nome e a descrição detalhada do produto.</p>
  </div>

  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="product-name" class="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Nome do Produto <span class="text-red-500">*</span>
      </Label>
      <Input
        id="product-name"
        placeholder="Ex: Reserva de Quarto Standard"
        bind:value={name}
        disabled={readOnly}
        class="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus-visible:ring-brand"
        required
      />
    </div>

    <div class="space-y-2">
      <Label for="product-description" class="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Descrição <span class="text-red-500">*</span>
      </Label>
      <Textarea
        id="product-description"
        placeholder="Descreva detalhadamente o produto, suas vantagens e especificidades..."
        bind:value={description}
        disabled={readOnly}
        class="w-full min-h-[120px] rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus-visible:ring-brand"
        required
      />
    </div>
  </div>
</div>
