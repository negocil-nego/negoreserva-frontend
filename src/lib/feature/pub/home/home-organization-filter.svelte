<script lang="ts">
  import { searchFilterStore } from "$lib/stores/search-filter.store";

  let filters = $state({ ...$searchFilterStore });

  $effect(() => {
    filters = { ...$searchFilterStore };
  });

  function clearFilters() {
    searchFilterStore.clearFilters();
  }
</script>

{#if filters.isSearching}
  <div class="container px-4 md:px-0 py-3">
    <div class="flex flex-wrap items-center gap-2 mb-3">
      {#if filters.q}
        <span
          class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium"
        >
          "{filters.q}"
        </span>
      {/if}
      {#if filters.province}
        <span
          class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
        >
          Província: {filters.province}
        </span>
      {/if}
      {#if filters.municipality}
        <span
          class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
        >
          Município: {filters.municipality}
        </span>
      {/if}
      {#if filters.isHighlight}
        <span
          class="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium"
        >
          Em Destaque
        </span>
      {/if}
      <button
        onclick={clearFilters}
        class="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline ml-2"
      >
        Limpar filtros
      </button>
    </div>
  </div>
{/if}
