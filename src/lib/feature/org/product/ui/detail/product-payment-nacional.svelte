<script lang="ts">
    import { Money01Icon, MoneyReceiveSquareIcon, Upload01Icon, CreditCardAcceptIcon } from "@hugeicons/core-free-icons";
    import type { ProductPriceGetOrgResponse } from "$lib/feature/pub/organization/data/model/organization.model";
    import { toastSuccess, toastError } from "$lib/hooks/toast-status";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { axiosClient } from "$lib/providers/http-cliente.provider";
    import { userAuthStore } from "$lib/stores/user-auth.store";
    import { cartStore } from "$lib/stores/cart.store";
    import FileUpload from "$lib/components/input/file-upload.svelte";
    import { enhance } from '$app/forms';

    let {
        productUuid,
        productSlug,
        productName,
        primaryImageUrl,
        selectedPrice,
        selectedPriceObj,
        quantity,
    }: {
        productUuid: string;
        productSlug: string;
        productName: string;
        primaryImageUrl?: string | null | undefined;
        selectedPrice: string;
        selectedPriceObj: ProductPriceGetOrgResponse | undefined;
        quantity: number;
    } = $props();

    let isSubmitting = $state(false);
    let comprovanteError = $state("");
    let nacionalMethod = $state("multicaixa");
    let comprovanteFile = $state<File | null>(null);

    function handleFileChange(file: File) {
        const allowed = ["application/pdf", "image/jpeg", "image/png"];
        if (file && !allowed.includes(file.type)) {
            comprovanteError = "Apenas PDF, JPG ou PNG são permitidos.";
            comprovanteFile = null;
        } else {
            comprovanteError = "";
            comprovanteFile = file;
        }
    }

    async function handleConfirmNacional() {
        if (nacionalMethod !== "comprovativo") return;
        if (!comprovanteFile) {
            comprovanteError = "Selecione um comprovativo para enviar.";
            return;
        }
        if (!selectedPriceObj) return;

        const isAuth = userAuthStore.isAuthenticated();

        if (!isAuth && selectedPriceObj != undefined) {
            cartStore.addItem({
                productUuid,
                productSlug,
                productName,
                price: selectedPriceObj,
                amount: quantity,
                image: primaryImageUrl,
            });
            toastSuccess("Produto adicionado ao carrinho! Faça login para continuar.");
            goto(resolve("/auth/signin"));
            return;
        }

        isSubmitting = true;
        try {
            const formData = new FormData();
            formData.append("file", comprovanteFile);
            formData.append("productUuid", productUuid);
            formData.append("priceUuid", selectedPrice);
            formData.append("amount", String(quantity));

            await axiosClient.post("/api/v1/pub/payments/receipt", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toastSuccess("Pagamento solicitado com sucesso! Ficará pendente até confirmação.");
            comprovanteFile = null;
        } catch (e) {
            toastError("Erro ao enviar comprovativo. Tente novamente.");
        } finally {
            isSubmitting = false;
        }
    }


    function submitEnhance() {
        return async ({ update }: { update: Function }) => {
            // ✅ invalidateAll: false — não invalida os dados da página após submit
            await update({ invalidateAll: false });
        };
    }

    const NACIONAL_METHODS = [
        {
            id: "multicaixa",
            icon: CreditCardAcceptIcon,
            label: "Multicaixa Express",
            description: "Pague com cartão multicaixa"
        },
        {
            id: "referencia",
            icon: MoneyReceiveSquareIcon,
            label: "Pagamento por Referência",
            description: "Gere uma referência para pagamento no banco"
        },
        {
            id: "comprovativo",
            icon: Upload01Icon,
            label: "Enviar Comprovativo",
            description: "Anexe o comprovativo de transferência"
        },
    ] as const;
</script>

<div class="space-y-4">
    <div class="space-y-3">
        {#each NACIONAL_METHODS as method}
            {@const active = nacionalMethod === method.id}
            <button
                onclick={() => nacionalMethod = method.id}
                class="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors
                {active ? 'border-primary bg-primary/5' : 'border-border'}"
            >
                <div class="flex size-4 items-center justify-center rounded-full border-2
                    {active ? 'border-primary' : 'border-input'}">
                    {#if active}
                        <div class="size-2 rounded-full bg-primary"></div>
                    {/if}
                </div>
                <HugeiconsIcon icon={method.icon} size={20} class="shrink-0 text-muted-foreground" />
                <div>
                    <p class="text-sm font-medium">{method.label}</p>
                    <p class="text-xs text-muted-foreground">{method.description}</p>
                </div>
            </button>
        {/each}
    </div>

    <!-- Method details -->
    {#if nacionalMethod === "referencia"}
        <div class="space-y-1 rounded-xl bg-muted/30 p-4">
            <p class="text-sm font-medium">Pagamento por Referência</p>
            <p class="text-xs text-muted-foreground">
                Após confirmar a reserva, será gerada uma referência bancária para efetuar o pagamento no Multicaixa ou num balcão.
            </p>
        </div>
    {:else if nacionalMethod === "comprovativo"}
        <div class="space-y-2 pt-1">
            <div>Comprovativo de Transferência</div>
            <FileUpload onchange={handleFileChange} error={comprovanteError} />
        </div>
    {/if}

    <Button type="button"
            class="h-10 w-full rounded-xl bg-brand text-white hover:bg-brand/90"
            onclick={handleConfirmNacional}
            disabled={isSubmitting}
    >
        <HugeiconsIcon icon={Money01Icon} size={16} />
        {isSubmitting ? "A processar..." : "Confirmar Pagamento Nacional"}
    </Button>
</div>
