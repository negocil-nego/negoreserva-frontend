<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { FileDownloadIcon, FileUnknownIcon } from "@hugeicons/core-free-icons";
  import type { PaymentFileReceiptResponse } from "../../data/model/payment.model";

  let { receipt }: { receipt: PaymentFileReceiptResponse | null | undefined } = $props();
</script>

{#if receipt}
  <a
    href={receipt.fileUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center gap-1.5 text-primary hover:underline text-sm"
  >
    <HugeiconsIcon icon={FileDownloadIcon} size={16} strokeWidth={1} />
    <span class="truncate max-w-[120px]">{receipt.fileUrl.split('/').pop()}</span>
  </a>
{:else}
  <span class="text-muted-foreground text-sm flex items-center gap-1.5">
    <HugeiconsIcon icon={FileUnknownIcon} size={16} strokeWidth={1} />
    Sem comprovativo
  </span>
{/if}
