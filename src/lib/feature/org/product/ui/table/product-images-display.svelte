<script lang="ts">
  import type { OrgProductFileResponse } from "../../data/model/product.model";
  import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount } from "$lib/components/ui/avatar";

  let {
    files = [] as OrgProductFileResponse[],
  } = $props();

  let imageFiles = $derived((files ?? []).filter((f) => f.type === "IMAGE" || f.url.match(/\.(png|jpe?g|gif|svg|webp)/i)));
  let displayFiles = $derived(imageFiles.length > 0 ? imageFiles : (files ?? []));
  let visible = $derived(displayFiles.slice(0, 8));
  let remaining = $derived(displayFiles.length - 8);
</script>

<AvatarGroup>
  {#each visible as file}
    <Avatar size="sm">
      <AvatarImage src={file.url} alt={file.title ?? ""} />
      <AvatarFallback>
        {(file.title ?? "img").slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  {/each}
  {#if remaining > 0}
    <AvatarGroupCount>+{remaining}</AvatarGroupCount>
  {/if}
</AvatarGroup>
