<script lang="ts">
  import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar";
  import type { OrgProductFileResponse } from "../../data/model/product.model";

  let {
    name,
    files = [] as OrgProductFileResponse[],
  }: {
    name: string;
    files: OrgProductFileResponse[];
  } = $props();

  let firstFile = $derived(
    (files ?? []).find((f) => f.type === "IMAGE" || f.url.match(/\.(png|jpe?g|gif|svg|webp)/i)) ?? (files ?? [])[0]
  );
</script>

<div class="flex items-center gap-3">
  {#if firstFile}
    <Avatar size="sm">
      <AvatarImage src={firstFile.url} alt={name} />
      <AvatarFallback>
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  {/if}
  <span class="truncate">{name}</span>
</div>
