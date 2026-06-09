<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { MasterCardIcon, CreditCardIcon, Payment01Icon } from "@hugeicons/core-free-icons";

    let cardNumber = $state("");
    let cardName = $state("");
    let cardExpiry = $state("");
    let cardCvv = $state("");
</script>

<div class="space-y-4">
    <div class="mb-2 flex items-center gap-3">
        <HugeiconsIcon icon={MasterCardIcon} size={28} class="text-muted-foreground" />
        <HugeiconsIcon icon={CreditCardIcon} size={24} class="text-muted-foreground" />
        <span class="text-xs text-muted-foreground">Visa / Mastercard</span>
    </div>
    <div class="space-y-3">
        <div class="space-y-2">
            <Label for="card-number">Número do Cartão</Label>
            <Input id="card-number" placeholder="0000 0000 0000 0000" bind:value={cardNumber} class="rounded-xl" />
        </div>
        <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
                <Label for="card-expiry">Validade</Label>
                <Input id="card-expiry" placeholder="MM/AA" bind:value={cardExpiry} class="rounded-xl" />
            </div>
            <div class="space-y-2">
                <Label for="card-cvv">CVV</Label>
                <Input id="card-cvv" placeholder="123" bind:value={cardCvv} class="rounded-xl" />
            </div>
        </div>
        <div class="space-y-2">
            <Label for="card-name">Titular do Cartão</Label>
            <Input id="card-name" placeholder="Nome do titular" bind:value={cardName} class="rounded-xl" />
        </div>
    </div>
    <Button type="button" class="h-10 w-full rounded-xl bg-brand text-white hover:bg-brand/90">
        <HugeiconsIcon icon={Payment01Icon} size={16} />
        <span>Confirmar Pagamento Internacional</span>
    </Button>
</div>
