<script lang="ts">
  import { goto } from "$app/navigation";
  import { axiosClient } from "$lib/providers/http-cliente.provider";
  import { toastError, toastSuccess } from "$lib/hooks/toast-status";
  import ProductInfoSection from "./product-info-section.svelte";
  import ProductPriceSection from "./product-price-section.svelte";
  import ProductFileSection from "./product-file-section.svelte";
  import ProductTagSection from "./product-tag-section.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    InformationCircleIcon,
    Dollar02Icon,
    FolderAddIcon,
    TagsIcon,
    FloppyDiskIcon,
    ArrowLeft01Icon,
  } from "@hugeicons/core-free-icons";
  import type { OrgProductResponse } from "../../data/model/product.model";
  import { OrgProductService } from "../../data/service/product.service";
  import { useOrgGetProductSuggestions } from "../../data/hooks/use-get-suggestions";
  import { resolve } from "$app/paths";

  let {
    readOnly = false,
    product = null,
  }: {
    readOnly?: boolean;
    product?: OrgProductResponse | null;
  } = $props();

  // Form states
  let name = $state("");
  let description = $state("");
  let prices = $state<any[]>([]);
  let tags = $state<any[]>([]);
  let images = $state<(File | null)[]>([null, null, null, null]);
  let video = $state<File | null>(null);

  let isSaving = $state(false);
  let activeSection = $state("product-info-section");

  let service = new OrgProductService();
  let suggestionsQuery = $derived(useOrgGetProductSuggestions({ service }));
  let suggestions = $derived($suggestionsQuery?.data ?? []);

  $effect(() => {
    if (product) {
      name = product.name || "";
      description = product.description || "";
      prices = product.prices || [];
      tags = product.tags || [];
    }
  });

  const menuItems = [
    {
      id: "product-info-section",
      name: "Produto",
      icon: InformationCircleIcon,
    },
    { id: "product-price-section", name: "Preço", icon: Dollar02Icon },
    { id: "product-file-section", name: "Ficheiro", icon: FolderAddIcon },
    { id: "product-tag-section", name: "Detalhes", icon: TagsIcon },
  ];

  function handleScrollTo(id: string) {
    activeSection = id;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    if (readOnly || isSaving) return;

    if (!name.trim()) {
      toastError("Por favor, preencha o nome do produto.");
      handleScrollTo("product-info-section");
      return;
    }
    if (!description.trim()) {
      toastError("Por favor, preencha a descrição do produto.");
      handleScrollTo("product-info-section");
      return;
    }
    if (prices.length === 0) {
      toastError("Adicione pelo menos um preço na lista de preços.");
      handleScrollTo("product-price-section");
      return;
    }
    // Verify first image is uploaded
    const hasFirstImage = images[0] !== null;
    if (!hasFirstImage) {
      toastError("A primeira imagem é obrigatória.");
      handleScrollTo("product-file-section");
      return;
    }

    isSaving = true;

    try {
      const formData = new FormData();
      const productPayload = {
        name: name.trim(),
        description: description.trim(),
        prices: prices.map((p) => ({
          type: p.type,
          value: p.value,
          order: p.order,
          unit: p.unit,
          isPrimary: p.isPrimary,
        })),
        tags: tags.map((t) => ({
          icon: t.icon,
          title: t.title,
          value: t.value,
        })),
      };

      const productBlob = new Blob([JSON.stringify(productPayload)], {
        type: "application/json",
      });
      formData.append("product", productBlob);

      images.forEach((img) => {
        if (img) {
          formData.append("images", img);
        }
      });

      if (video) {
        formData.append("video", video);
      }

      await axiosClient.post("/api/v1/org/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toastSuccess("Produto cadastrado com sucesso!");
      goto(resolve("/dashboard/organization/products"));
    } catch (error: any) {
      console.error("Erro ao cadastrar produto:", error);
      const errMsg =
        error.response?.data?.message || "Erro inesperado ao salvar o produto.";
      toastError(errMsg);
    } finally {
      isSaving = false;
    }
  }

  function handleCancel() {
    goto(resolve("/dashboard/organization/products"));
  }
</script>

<div class="flex flex-col h-full space-y-6">
  <!-- Form Layout: Local Sidebar + Sections -->
  <section
    class="grid grid-cols-1 md:grid-cols-[170px_1fr] gap-6 items-start h-full"
  >
    <!-- Sidebar Navigation -->
    <div class="sticky top-20 space-y-1 p-0.5 hidden md:block h-full">
      <Button
        class="rounded-full cursor-pointer hover:bg-green-100"
        variant="outline"
        size="icon"
        aria-label="Submit"
        onclick={() => goto(resolve("/dashboard/organization/products"))}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1} />
      </Button>

      <div
        class="md:mt-5 text-[10px] font-bold text-slate-450 uppercase tracking-wider px-3 mb-2"
      >
        Seções do Formuário
      </div>

      {#each menuItems as item (item.id)}
        <button
          type="button"
          onclick={() => handleScrollTo(item.id)}
          class={[
            "flex items-center gap-3 px-2 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer text-left",
            activeSection === item.id
              ? " text-green-800 font-extrabold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-200",
          ]}
        >
          <HugeiconsIcon icon={item.icon} size={16} />
          <span>{item.name}</span>
        </button>
      {/each}
    </div>

    <div
      class="space-y-8 pr-1 max-h-[calc(100vh-9rem)] overflow-y-auto scroll-smooth w-full sm:w-auto"
    >
      <ProductInfoSection bind:name bind:description {readOnly} suggestions={suggestions} />

      <ProductPriceSection bind:prices {readOnly} />

      <ProductFileSection
        bind:images
        bind:video
        {readOnly}
        existingFiles={product?.files ?? []}
      />

      <ProductTagSection bind:tags {readOnly} suggestions={suggestions} />

      {#if !readOnly}
        <div
          class="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 pt-6"
        >
          <Button
            variant="outline"
            onclick={handleCancel}
            disabled={isSaving}
            class="px-5 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onclick={handleSubmit}
            disabled={isSaving}
            class="px-5 bg-brand hover:bg-brand/90 text-white font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <HugeiconsIcon icon={FloppyDiskIcon} size={16} />
            <span>{isSaving ? "A guardar..." : "Guardar Produto"}</span>
          </Button>
        </div>
      {/if}
    </div>
  </section>
</div>
