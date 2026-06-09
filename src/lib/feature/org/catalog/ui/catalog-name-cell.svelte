<script lang="ts">
  import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar";

  let {
    name,
    imgUrl,
  }: {
    name: string;
    imgUrl?: string | null;
  } = $props();
</script>

<div class="flex items-center gap-3">
  <Avatar size="sm">
    {#if imgUrl}
      <AvatarImage src={imgUrl} alt={name} />
    {/if}
    <AvatarFallback>
      {name.slice(0, 2).toUpperCase()}
    </AvatarFallback>
  </Avatar>
  <span class="truncate">{name}</span>
</div>
