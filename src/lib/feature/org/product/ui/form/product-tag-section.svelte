<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { PlusSignIcon, Delete02Icon } from "@hugeicons/core-free-icons";
  import type { ProductSuggestionResponse } from "../../data/model/product-suggestion.model";
  import TagTitleAutocomplete from "./tag-title-autocomplete.svelte";

  interface TagItem {
    icon?: string;
    title: string;
    value: string;
  }

  let {
    tags = $bindable([]),
    readOnly = false,
    suggestions = [],
  }: {
    tags: TagItem[];
    readOnly?: boolean;
    suggestions?: ProductSuggestionResponse[];
  } = $props();

  let newTitle = $state("");
  let newValue = $state("");

  function handleAddTag() {
    if (!newTitle.trim() || !newValue.trim()) return;

    const newTag: TagItem = {
      title: newTitle.trim(),
      value: newValue.trim(),
    };

    tags = [...tags, newTag];

    newTitle = "";
    newValue = "";
  }

  function handleRemoveTag(index: number) {
    tags = tags.filter((_, i) => i !== index);
  }
</script>

<div id="product-tag-section" class="bg-panel p-6 space-y-6 scroll-mt-20">
  <div class="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
      Detalhes & Especificações (Tags)
    </h3>
    <p class="text-sm text-slate-500 dark:text-slate-400">
      Adicione características ou comodidades adicionais para detalhar o produto
      (ex: Wifi - Grátis).
    </p>
  </div>

  {#if !readOnly}
    <div class="p-4 border border-slate-150 dark:border-slate-850 space-y-4">
      <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Adicionar Nova Especificação
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div class="space-y-1.5 flex-1">
          <Label
            class="text-xs font-semibold text-slate-600 dark:text-slate-400"
          >
            Título (ex: Wi-Fi, Piscina)
          </Label>
          <TagTitleAutocomplete
            id="tag-title"
            bind:value={newTitle}
            {readOnly}
            {suggestions}
            placeholder="Ex: Wi-Fi"
          />
        </div>

        <div class="space-y-1.5 col-span-1">
          <Label
            class="text-xs font-semibold text-slate-600 dark:text-slate-400"
          >
            Valor (ex: Grátis, Incluído, 24h)
          </Label>
          <Input
            type="text"
            placeholder="Ex: Grátis / Disponível"
            bind:value={newValue}
            class="border-slate-200 dark:border-slate-800"
          />
        </div>

        <div class="col-span-1 flex gap-2">
          <Button
            type="button"
            onclick={handleAddTag}
            disabled={!newTitle.trim() || !newValue.trim()}
            class="w-full h-10 bg-brand hover:bg-brand/90 text-white font-medium flex items-center justify-center gap-1 cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>Adicionar</span>
          </Button>
        </div>
      </div>
    </div>
  {/if}

  <div class="space-y-3">
    <div class="text-sm font-bold text-slate-700 dark:text-slate-350">
      Especificações Adicionadas ({tags.length})
    </div>

    {#if tags.length === 0}
      <div
        class="text-center py-8 text-sm text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-850"
      >
        Nenhuma tag ou especificação adicionada ainda. Detalhe mais o seu
        produto.
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each tags as tag, index (index)}
          <div
            class="flex items-center justify-between p-3.5 border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow relative group"
          >
            <div class="flex items-center gap-3">
              <div
                class="p-2 text-lg flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm"
              >
                {#if tag.icon === "WifiIcon"}📶
                {:else if tag.icon === "BedIcon"}🛏️
                {:else if tag.icon === "CoffeeIcon"}☕
                {:else if tag.icon === "ShieldIcon"}🛡️
                {:else if tag.icon === "TvIcon"}📺
                {:else if tag.icon === "CarIcon"}🚗
                {:else}✨
                {/if}
              </div>
              <div class="space-y-0.5">
                <div
                  class="text-xs text-slate-450 dark:text-slate-500 font-medium"
                >
                  {tag.title}
                </div>
                <div
                  class="text-sm font-bold text-slate-800 dark:text-slate-100"
                >
                  {tag.value}
                </div>
              </div>
            </div>

            {#if !readOnly}
              <button
                type="button"
                onclick={() => handleRemoveTag(index)}
                class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-red-200 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Remover Especificação"
              >
                <HugeiconsIcon icon={Delete02Icon} size={14} />
              </button>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
