<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import { cartStore } from "$lib/stores/cart.store";
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { ShoppingCart01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

    let { open = $bindable(false) }: { open?: boolean } = $props();

    let items = $derived(cartStore.getItems());

    function goToProduct(slug: string) {
        cartStore.clear();
        open = false;
        goto(resolve(`/product/${slug}`));
    }

    function dismiss() {
        cartStore.clear();
        open = false;
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Content class="sm:max-w-md rounded-2xl">
        <Dialog.Header>
            <Dialog.Title class="flex items-center gap-2">
                <HugeiconsIcon icon={ShoppingCart01Icon} size={20} />
                Produtos no Carrinho
            </Dialog.Title>
            <Dialog.Description>
                Tem produtos pendentes no carrinho. Escolha um para fazer a reserva:
            </Dialog.Description>
        </Dialog.Header>

        <div class="space-y-3 py-4">
            {#each items as item (item.productUuid)}
                <button
                    onclick={() => goToProduct(item.productSlug)}
                    class="flex w-full items-center justify-between gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                >
                    <div class="flex items-center gap-3">
                        {#if item.image}
                            <img src={item.image} alt={item.productName} class="size-12 rounded-lg object-cover" />
                        {/if}
                        <div>
                            <p class="text-sm font-medium">{item.productName}</p>
                            <p class="text-xs text-muted-foreground">
                                {item.price.value.toLocaleString("pt-AO", { style: "currency", currency: "AOA", minimumFractionDigits: 2 })} x {item.amount}
                            </p>
                        </div>
                    </div>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} class="shrink-0 text-muted-foreground" />
                </button>
            {/each}
        </div>

        <Dialog.Footer>
            <Button variant="outline" onclick={dismiss}>
                Ignorar
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
