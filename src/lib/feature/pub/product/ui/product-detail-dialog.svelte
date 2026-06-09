<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { GetOrganizationProductResponse } from "../../organization/data/model/organization.model";
  import { cn } from "$lib/utils";
  import { PRODUCT_LABEL } from "../data/model/product.label";
  import ProductTagsBadge from "./product-tags-badge.svelte";

  let {
    data,
    selected,
  }: {
    data: GetOrganizationProductResponse;
    selected: boolean;
  } = $props();

  const item = $derived(data.product);
  const primaryImage = $derived(
    item.image ? { url: item.image, title: item.name } :
      data.files?.find((f) => f.isPrimary) ?? data.files?.[0],
  );
  const allFiles = $derived(data.files ?? []);
  let imageIndex = $state(0);
  let currentImage = $derived(
    item.image && allFiles.length === 0 ? { url: item.image, title: item.name } :
      allFiles[imageIndex] ?? allFiles[0],
  );

  const primaryPrice = $derived(
    data.prices?.find((p) => p.isPrimary) ?? data.prices?.[0],
  );
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <img
      src={primaryImage?.url}
      alt={item.name}
      class={cn(
        "w-[50px] h-[50px] border-2 object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg cursor-pointer",
        selected ? "border-green-500" : "border-gray-300",
      )}
    />
  </Dialog.Trigger>

  <Dialog.Content class="sm:max-w-2xl p-0 overflow-hidden rounded-2xl">
    <div class="grid grid-cols-1 md:grid-cols-2 h-full">
      <!-- Imagem -->
      <div
        class="relative aspect-square md:aspect-auto overflow-hidden rounded-tl-2xl rounded-bl-2xl bg-gray-100 dark:bg-slate-900"
      >
        {#if currentImage?.url}
          <img
            src={currentImage.url}
            alt={currentImage.title ?? item.name}
            class="h-full w-full object-cover"
          />
        {/if}
      </div>

      <!-- Conteúdo -->
      <div class="flex flex-col justify-between gap-4 p-5">
        <!-- Cabeçalho -->
        <div class="flex flex-col gap-3">
          <div>
            <Dialog.Title class="text-xl font-bold leading-tight">
              {item.name}
            </Dialog.Title>
            {#if item.description}
              <p class="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            {/if}
          </div>

          <!-- Tags -->
          {#if data.tags?.length > 0}
            <div class="flex flex-wrap gap-2">
              <ProductTagsBadge tags={data.tags} />
            </div>
          {/if}

          <!-- Preço primário destacado -->
          {#if primaryPrice}
            <div
              class="rounded-xl border border-border bg-muted/40 px-4 py-3 flex items-center justify-between"
            >
              <div>
                <p
                  class="text-[10px] font-semibold uppercase tracking-widest text-primary mb-0.5"
                >
                  Preço especial
                </p>
                <p class="text-sm text-muted-foreground">
                  {PRODUCT_LABEL[primaryPrice.type]}
                </p>
              </div>
              <p class="text-2xl font-bold text-foreground">
                {primaryPrice.value.toLocaleString("pt-AO", {
                  style: "currency",
                  currency: "AOA",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          {/if}
        </div>

        <!-- Métodos de pagamento -->
        <div class="flex flex-col gap-2">
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Método de pagamento
          </p>

          <button
            class="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div class="flex items-center gap-3">
              <img
                src="emis.png"
                alt="Multicaixa"
                class="w-8 h-8 rounded-md object-contain"
              />
              <span class="text-sm font-medium">Pagar com Multicaixa</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            class="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div class="flex items-center gap-3">
              <img
                src="emis.png"
                alt="Entidade"
                class="w-8 h-8 rounded-md object-contain"
              />
              <span class="text-sm font-medium">Pagar com Entidade</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
