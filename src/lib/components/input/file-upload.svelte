<script lang="ts">
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import {
        Upload01Icon,
        FileAttachmentIcon,
        Delete02Icon,
        Tick02Icon,
    } from "@hugeicons/core-free-icons";
    import { Label } from "$lib/components/ui/label";

    let {
        id = "file-upload",
        label,
        subLabel,
        accept = ".pdf,.jpg,.jpeg,.png",
        allowedTypes = ["application/pdf", "image/jpeg", "image/png"],
        allowedLabel = "PDF, JPG ou PNG",
        onchange,
        onremove,
        error = $bindable(""),
        file = $bindable<File | null>(null),
    }: {
        id?: string;
        label?: string;
        subLabel?: string;
        accept?: string;
        allowedTypes?: string[];
        allowedLabel?: string;
        onchange?: (file: File) => void;
        onremove?: () => void;
        error?: string;
        file?: File | null;
    } = $props();

    let inputId = $derived(`${id}-input`);

    function handleFileChange(e: Event) {
        e.preventDefault();
        const target = e.currentTarget as HTMLInputElement;
        const selected = target.files?.[0] ?? null;

        if (!selected) return;

        if (!allowedTypes.includes(selected.type)) {
            error = `Apenas ${allowedLabel} são permitidos.`;
            target.value = "";
            file = null;
            return;
        }

        error = "";
        file = selected;
        onchange?.(selected);
    }

    function handleRemove(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        file = null;
        error = "";
        const input = document.getElementById(inputId) as HTMLInputElement | null;
        if (input) input.value = "";
        onremove?.();
    }

    function formatSize(bytes: number): string {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
</script>

<div class="space-y-2">
    {#if label}
        <Label for={id} class="text-sm font-medium">{label}</Label>
        {#if subLabel}
            <p class="text-xs text-muted-foreground -mt-1">{subLabel}</p>
        {/if}
    {/if}

    <input
            id={inputId}
            type="file"
            {accept}
            onchange={handleFileChange}
            class="hidden"
    />

    {#if file}
        <label
                for={inputId}
                class="group relative flex w-full cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-primary bg-primary/5 p-6 text-center transition-all duration-200 hover:bg-primary/10
            {error ? 'border-destructive bg-destructive/5' : ''}"
        >
            <div class="flex size-12 items-center justify-center rounded-full bg-primary/10 transition-transform duration-200 group-hover:scale-105">
                <HugeiconsIcon icon={FileAttachmentIcon} size={22} class="text-primary" />
            </div>

            <div class="flex flex-col items-center gap-1">
                <span class="max-w-[220px] truncate text-sm font-semibold text-primary">
                    {file.name}
                </span>
                <div class="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatSize(file.size)}</span>
                    <span>·</span>
                    <span class="flex items-center gap-1 text-emerald-600">
                        <HugeiconsIcon icon={Tick02Icon} size={12} />
                        Pronto para enviar
                    </span>
                </div>
            </div>

            <span class="text-xs text-muted-foreground">Clique para substituir</span>
        </label>

        <button
                type="button"
                onclick={handleRemove}
                class="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
            <HugeiconsIcon icon={Delete02Icon} size={13} />
            <span>Remover ficheiro</span>
        </button>

    {:else}
        <label
                for={inputId}
                class="group flex w-full cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/10 p-6 text-center transition-all duration-200 hover:border-primary/50 hover:bg-muted/20
            {error ? 'border-destructive bg-destructive/5' : ''}"
        >
            <div class="flex size-12 items-center justify-center rounded-full bg-muted transition-all duration-200 group-hover:scale-105 group-hover:bg-primary/10">
                <HugeiconsIcon icon={Upload01Icon} size={22} class="text-muted-foreground transition-colors group-hover:text-primary"/>
            </div>

            <div class="flex flex-col items-center gap-1">
                <span class="text-sm font-medium text-foreground">
                    Clique para anexar o ficheiro
                </span>
                <span class="text-xs text-muted-foreground">{allowedLabel}</span>
            </div>
        </label>
    {/if}

    {#if error}
        <p class="text-xs text-destructive">{error}</p>
    {/if}
</div>
