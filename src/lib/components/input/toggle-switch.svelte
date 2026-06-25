<!-- toggle-switch.svelte -->
<script lang="ts">
    interface Props {
        id?: string;
        checked?: boolean;
        onCheckedChange?: (value: boolean) => void;
        label?: string;
        disabled?: boolean;
        class?: string;
    }

    let {
        id,
        checked = $bindable(false),
        onCheckedChange,
        label,
        disabled = false,
        class: className = '',
    }: Props = $props();

    function toggle() {
        if (disabled) return;
        checked = !checked;
        onCheckedChange?.(checked);
    }
</script>

<div class="flex items-center justify-between gap-3 {className}">
    {#if label}
        <label for={id} class="cursor-pointer select-none text-sm {disabled ? 'opacity-50 cursor-not-allowed' : ''}">
            {label}
        </label>
    {/if}

    <button
            {id}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onclick={toggle}
            {disabled}
            class="relative h-8 w-16 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {checked ? 'bg-brand' : 'bg-gray-300'}"
    >
        <span
                class="absolute top-1 flex h-6 w-6 items-center justify-center bg-white shadow-sm transition-all duration-200 {checked ? 'left-9' : 'left-1'}"
        >
            {#if checked}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {/if}
        </span>
    </button>
</div>