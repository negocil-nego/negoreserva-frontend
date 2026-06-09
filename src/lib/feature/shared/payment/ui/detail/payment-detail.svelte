<script lang="ts">
  import InfoRow from "$lib/components/info-row.svelte";
  import PanelInfoRow from "$lib/components/panel-info-row.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    Building03Icon,
    UserIcon,
    ShoppingBag03Icon,
    Money01Icon,
    CreditCardIcon,
    Ticket01Icon,
    FileDownloadIcon,
    RouteIcon,
    ArrowRightIcon,
  } from "@hugeicons/core-free-icons";
  import type { OrgPaymentResponse, PaymentFileReceiptResponse } from "../../data/model/payment.model";
  import { PaymentStatus, PaymentMethod } from "../../data/model/payment.model";

  let { payment }: { payment: OrgPaymentResponse } = $props();

  const PAYMENT_LABEL: Record<string, string> = {
    [PaymentStatus.PENDING]: "Pendente",
    [PaymentStatus.PAID]: "Pago",
    [PaymentStatus.CANCELED]: "Cancelado",
    [PaymentStatus.RECEIPT_VALID]: "Comprovativo Válido",
    [PaymentMethod.NONE]: "Nenhum",
    [PaymentMethod.RECEIPT]: "Comprovativo",
    [PaymentMethod.MULTICAIXA_EXPRESS]: "Multicaixa Express",
    [PaymentMethod.REFERENCIA]: "Referência",
  };

  let org = $derived(payment.transaction.product.organization);
  let product = $derived(payment.transaction.product);
  let user = $derived(payment.transaction.user);
</script>

<div class="p-6 space-y-8">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-foreground">Detalhe do Pagamento</h1>
      <p class="text-sm text-muted-foreground mt-1">Código: {payment.transaction.code}</p>
    </div>
    <div class="flex items-center gap-2">
      <span
        class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
        class:bg-green-100={payment.status === PaymentStatus.PAID}
        class:text-green-700={payment.status === PaymentStatus.PAID}
        class:bg-yellow-100={payment.status === PaymentStatus.PENDING}
        class:text-yellow-700={payment.status === PaymentStatus.PENDING}
        class:bg-red-100={payment.status === PaymentStatus.CANCELED}
        class:text-red-700={payment.status === PaymentStatus.CANCELED}
        class:bg-blue-100={payment.status === PaymentStatus.RECEIPT_VALID}
        class:text-blue-700={payment.status === PaymentStatus.RECEIPT_VALID}
      >
        {PAYMENT_LABEL[payment.status] ?? payment.status}
      </span>
    </div>
  </div>

  <div class="border-b border-border pb-6">
    <div class="px-4 sm:px-0">
      <div class="flex items-center gap-2 text-base/7 font-semibold text-foreground">
        <HugeiconsIcon icon={Building03Icon} size={18} strokeWidth={1} />
        <span>Organização</span>
      </div>
      <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
        Dados da organização responsável pelo produto
      </p>
    </div>
    <div class="mt-4 border-t border-border">
      <dl class="divide-y divide-border">
        <InfoRow label="Nome" value={org.name} icon={Building03Icon} />
        <InfoRow label="Email" value={org.email} icon={Building03Icon} isCopy />
        <InfoRow label="Telefone" value={org.phone} icon={Building03Icon} isCopy />
        {#if org.address}
          <InfoRow label="Endereço" value={org.address} icon={Building03Icon} />
        {/if}
        {#if org.description}
          <PanelInfoRow label="Descrição" icon={Building03Icon}>
            <p class="text-sm">{org.description}</p>
          </PanelInfoRow>
        {/if}
      </dl>
    </div>
  </div>

  <div class="border-b border-border pb-6">
    <div class="px-4 sm:px-0">
      <div class="flex items-center gap-2 text-base/7 font-semibold text-foreground">
        <HugeiconsIcon icon={UserIcon} size={18} strokeWidth={1} />
        <span>Cliente</span>
      </div>
      <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">Dados do cliente que efetuou a compra</p>
    </div>
    <div class="mt-4 border-t border-border">
      <dl class="divide-y divide-border">
        <InfoRow label="Nome" value={user.name} icon={UserIcon} />
        <InfoRow label="Email" value={user.email} icon={UserIcon} isCopy />
        <InfoRow label="Telefone" value={user.phone} icon={UserIcon} isCopy />
      </dl>
    </div>
  </div>

  <div class="border-b border-border pb-6">
    <div class="px-4 sm:px-0">
      <div class="flex items-center gap-2 text-base/7 font-semibold text-foreground">
        <HugeiconsIcon icon={ShoppingBag03Icon} size={18} strokeWidth={1} />
        <span>Produto</span>
      </div>
      <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">Dados do produto adquirido</p>
    </div>
    <div class="mt-4 border-t border-border">
      <dl class="divide-y divide-border">
        <InfoRow label="Nome" value={product.name} icon={ShoppingBag03Icon} />
        {#if product.description}
          <PanelInfoRow label="Descrição" icon={ShoppingBag03Icon}>
            <p class="text-sm">{product.description}</p>
          </PanelInfoRow>
        {/if}
      </dl>
    </div>
  </div>

  <div>
    <div class="px-4 sm:px-0">
      <div class="flex items-center gap-2 text-base/7 font-semibold text-foreground">
        <HugeiconsIcon icon={Money01Icon} size={18} strokeWidth={1} />
        <span>Pagamento</span>
      </div>
      <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">Detalhes financeiros do pagamento</p>
    </div>
    <div class="mt-4 border-t border-border">
      <dl class="divide-y divide-border">
        <InfoRow label="Código" value={payment.transaction.code} icon={Ticket01Icon} isCopy />
        <InfoRow
          label="Valor"
          value={payment.transaction.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA", minimumFractionDigits: 2 })}
          icon={Money01Icon}
        />
        <InfoRow label="Método" value={PAYMENT_LABEL[payment.type] ?? payment.type} icon={CreditCardIcon} />
        <InfoRow label="Estado" value={PAYMENT_LABEL[payment.status] ?? payment.status} icon={RouteIcon} />
        {#if payment.paymentFileReceipt}
          <PanelInfoRow label="Comprovativo" icon={FileDownloadIcon}>
            <a
              href={payment.paymentFileReceipt.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-primary hover:underline text-sm"
            >
              <HugeiconsIcon icon={FileDownloadIcon} size={16} strokeWidth={1} />
              <span>{payment.paymentFileReceipt.fileUrl.split('/').pop()}</span>
              <HugeiconsIcon icon={ArrowRightIcon} size={14} strokeWidth={1} />
            </a>
          </PanelInfoRow>
        {/if}
      </dl>
    </div>
  </div>
</div>
