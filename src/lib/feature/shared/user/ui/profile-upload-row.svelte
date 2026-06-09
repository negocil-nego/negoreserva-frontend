<script lang="ts">
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {Delete02Icon, PencilEdit02Icon} from "@hugeicons/core-free-icons";

    let {
        label,
        subLabel,
        value,
        icon,
        accept,
        fileType,
        onsubmit,
        onremove,
    }: {
        label: string;
        subLabel?: string;
        value: string | null | undefined;
        icon?: any;
        accept: string;
        fileType: "image" | "video";
        onsubmit?: (file: File) => void;
        onremove?: () => void;
    } = $props();

    let selectedFile = $state<File | null>(null);
    let preview = $state<string | null>(value ?? null);
    let inputRef = $state<HTMLInputElement | null>(null);

    function handleFileSelect(e: Event) {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            preview = ev.target?.result as string;
            selectedFile = file;
        };
        reader.readAsDataURL(file);
    }

    function handleRemove() {
        preview = null;
        selectedFile = null;
        if (inputRef) inputRef.value = "";
        onremove?.();
    }

    function triggerInput() {
        inputRef?.click();
    }

    $effect(() => {
        if (!selectedFile) preview = value ?? null;
    });
</script>

<div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0">
    <dt
            class="text-sm/6 font-medium text-muted-foreground flex flex-col md:justify-center gap-2"
    >
        <div class="flex items-center gap-2">
            <div class="font-extraold italic flex items-center gap-3">
                {#if icon}
                    <HugeiconsIcon
                            {icon}
                            size={15}
                            color="currentColor"
                            strokeWidth={1}
                    />
                {/if}
                <span class="font-extrabold">{label}</span>
            </div>
        </div>
        {#if subLabel}
            <div class="text-xs/6 text-muted-foreground">{subLabel}</div>
        {/if}
    </dt>
    <dd class="mt-1 text-sm/6 text-foreground sm:mt-0">
        <div class="flex items-center justify-end gap-4">
            <input
                    bind:this={inputRef}
                    type="file"
                    {accept}
                    class="hidden"
                    onchange={handleFileSelect}
            />
            <section>
                <button
                        type="button"
                        class="size-24 md:size-32 shrink-0 rounded-2xl border border-border overflow-hidden bg-muted flex items-center justify-center cursor-pointer"
                        onclick={triggerInput}
                >
                    {#if preview}
                        {#if fileType === "image"}
                            <img src={preview} alt={label} class="size-full object-cover"/>
                        {:else}
                            <!-- svelte-ignore a11y_media_has_caption -->
                            <video src={preview} class="size-full object-cover" controls
                            ></video>
                        {/if}
                    {:else}
                        <HugeiconsIcon
                                {icon}
                                size={24}
                                color="currentColor"
                                strokeWidth={1}
                                class="text-muted-foreground"
                        />
                    {/if}
                </button>

                <aside class="mt-3 max-w-fit mx-auto">
                    {#if selectedFile}
                        <div class="flex items-center gap-2">
                            <button
                                    type="button"
                                    class="flex items-center gap-1 text-sm text-blue-500 cursor-pointer"
                                    onclick={() => onsubmit?.(selectedFile!) }
                            >
                                <HugeiconsIcon icon={PencilEdit02Icon} size={14} strokeWidth={1}/>
                                <span>Enviar</span>
                            </button>
                            <button
                                    type="button"
                                    class="flex items-center gap-1 text-sm text-red-500 cursor-pointer"
                                    onclick={handleRemove}
                            >
                                <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={1}/>
                                <span>Remover</span>
                            </button>
                        </div>
                    {:else}
                        <button
                                type="button"
                                class="flex items-center gap-1 text-sm text-blue-500 cursor-pointer"
                        >
                            <HugeiconsIcon
                                    icon={PencilEdit02Icon}
                                    size={14}
                                    strokeWidth={1}
                            />
                            <span>Editar</span>
                        </button>
                    {/if}
                </aside>
            </section>
        </div>
    </dd>
</div>
