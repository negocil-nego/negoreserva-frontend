<script lang="ts">
  import type { ProductTagInfoGetOrgResponse } from "../../organization";

  let { tags } = $props<{ tags: ProductTagInfoGetOrgResponse[] }>();
</script>

{#if tags.length === 0}
  <p>Não há tags</p>
{:else}
  {#each tags as { uuid, icon, title, value } (uuid)}
    <div
      class="p-1 text-center rounded-3xl min-w-[82px] text-[11px] bg-gray-50 dark:bg-transparent"
    >
      <div>
        {#if icon}
          <i class={icon}></i>
        {/if}
        <span>{title}: {value}</span>
      </div>
    </div>
  {/each}
{/if}
