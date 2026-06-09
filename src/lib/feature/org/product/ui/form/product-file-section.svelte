<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ImageAdd01Icon, Video01Icon, Delete02Icon, StarIcon } from "@hugeicons/core-free-icons";
  import type { OrgProductFileResponse } from "../../data/model/product.model";
  import { Label } from "$lib/components/ui/label/index.js";

  let {
    images = $bindable([null, null, null, null]),
    video = $bindable(null),
    readOnly = false,
    existingFiles = [],
  }: {
    images: (File | null)[];
    video: File | null;
    readOnly?: boolean;
    existingFiles?: OrgProductFileResponse[];
  } = $props();

  let imgPreviews = $state<string[]>([ "", "", "", "" ]);
  let videoPreview = $state<string>("");

  let imgInputRefs = $state<HTMLInputElement[]>([]);
  let videoInputRef = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (existingFiles && existingFiles.length > 0) {
      imgPreviews = [ "", "", "", "" ];
      videoPreview = "";
      
      const imageFiles = existingFiles.filter(f => f.type === "IMAGE");
      const videoFile = existingFiles.find(f => f.type === "VIDEO");

      imageFiles.forEach((file, idx) => {
        if (idx < 4) {
          imgPreviews[idx] = file.url;
        }
      });

      if (videoFile) {
        videoPreview = videoFile.url;
      }
    }
  });

  function handleImageSelect(index: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    images[index] = file;
    const reader = new FileReader();
    reader.onload = (ev) => {
      imgPreviews[index] = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleVideoSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    video = file;
    const reader = new FileReader();
    reader.onload = (ev) => {
      videoPreview = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function triggerImageInput(index: number) {
    if (readOnly) return;
    imgInputRefs[index]?.click();
  }

  function triggerVideoInput() {
    if (readOnly) return;
    videoInputRef?.click();
  }

  function removeImage(index: number, e: MouseEvent) {
    e.stopPropagation();
    images[index] = null;
    imgPreviews[index] = "";
    if (imgInputRefs[index]) imgInputRefs[index].value = "";
  }

  function removeVideo(e: MouseEvent) {
    e.stopPropagation();
    video = null;
    videoPreview = "";
    if (videoInputRef) videoInputRef.value = "";
  }
</script>

<div id="product-file-section" class="bg-white dark:bg-transparent rounded-2xl p-6 space-y-6 scroll-mt-20">
  <div class="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Ficheiros Multimédia</h3>
    <p class="text-sm text-slate-500 dark:text-slate-400">Adicione até 4 imagens (a primeira será principal) e 1 vídeo opcional para ilustrar o produto.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-3">
      <Label class="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Imagens <span class="text-red-500">* (Mínimo 1 imagem obrigatória)</span>
      </Label>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {#each Array(4) as _, i (i)}
          <div class="relative group aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-brand dark:hover:border-brand bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-all">
            <input
              bind:this={imgInputRefs[i]}
              type="file"
              accept="image/*"
              class="hidden"
              onchange={(e) => handleImageSelect(i, e)}
              disabled={readOnly}
            />

            {#if imgPreviews[i]}
              <img src={imgPreviews[i]} alt="Product preview" class="size-full object-cover" />
              
              {#if i === 0}
                <span class="absolute top-2 left-2 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <HugeiconsIcon icon={StarIcon} size={10} class="text-white fill-white" />
                  <span>Principal</span>
                </span>
              {/if}

              {#if !readOnly}
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200">
                  <button
                    type="button"
                    onclick={() => triggerImageInput(i)}
                    class="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors cursor-pointer"
                    title="Alterar Imagem"
                  >
                    <HugeiconsIcon icon={ImageAdd01Icon} size={18} />
                  </button>
                  <button
                    type="button"
                    onclick={(e) => removeImage(i, e)}
                    class="p-2 bg-red-500 hover:bg-red-650 text-white rounded-full transition-colors cursor-pointer"
                    title="Remover Imagem"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={18} />
                  </button>
                </div>
              {/if}
            {:else}
              <button
                type="button"
                onclick={() => triggerImageInput(i)}
                disabled={readOnly}
                class="size-full flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-650 hover:text-brand dark:hover:text-brand cursor-pointer p-4"
              >
                <div class="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl group-hover:scale-110 transition-transform">
                  <HugeiconsIcon icon={ImageAdd01Icon} size={24} />
                </div>
                <span class="text-xs font-medium text-center">
                  {#if i === 0}
                    Imagem Principal *
                  {:else}
                    Imagem {i + 1}
                  {/if}
                </span>
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Video Slot -->
    <div class="space-y-3">
      <Label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Vídeo de Apresentação <span class="text-slate-400 font-normal">(Opcional)</span></Label>
      
      <div class="max-w-md aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-brand dark:hover:border-brand bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-all relative group">
        <input
          bind:this={videoInputRef}
          type="file"
          accept="video/*"
          class="hidden"
          onchange={handleVideoSelect}
          disabled={readOnly}
        />

        {#if videoPreview}
          <!-- svelte-ignore a11y_media_has_caption -->
          <video src={videoPreview} class="size-full object-cover" controls></video>
          
          {#if !readOnly}
            <button
              type="button"
              onclick={removeVideo}
              class="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-650 text-white rounded-full transition-colors cursor-pointer shadow-md opacity-0 group-hover:opacity-100 duration-200"
              title="Remover Vídeo"
            >
              <HugeiconsIcon icon={Delete02Icon} size={16} />
            </button>
          {/if}
        {:else}
          <button
            type="button"
            onclick={triggerVideoInput}
            disabled={readOnly}
            class="size-full flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-650 hover:text-brand dark:hover:text-brand cursor-pointer p-6"
          >
            <div class="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl group-hover:scale-110 transition-transform">
              <HugeiconsIcon icon={Video01Icon} size={28} />
            </div>
            <span class="text-xs font-semibold">Adicionar Vídeo MP4</span>
            <span class="text-[10px] text-slate-400">Resolução sugerida: 16:9, tamanho máx. 20MB</span>
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
