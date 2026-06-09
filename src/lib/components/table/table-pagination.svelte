<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  let {
    totalElements,
    totalPages,
    page,
    size,
    first,
    last,
    onPageChange,
    onPageSizeChange,
  }: {
    totalElements: number;
    totalPages: number;
    size: number;
    page: number;
    first: boolean;
    last: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  } = $props();
</script>

<div
  class="flex flex-col-reverse items-center justify-start w-full gap-2 md:flex-row md:justify-between mt-2 lg:mt-5"
>
  <div
    class="flex items-center gap-2 border border-gray-100 p-2 dark:border-gray-800 dark:bg-neutral-800 rounded-full"
  >
    <div>
      <Select.Root
        type="single"
        value={String(size)}
        onValueChange={(value) => onPageSizeChange(Number(value))}
      >
        <Select.Trigger>{size}</Select.Trigger>
        <Select.Content>
          <Select.Item value="10">10</Select.Item>
          <Select.Item value="20">20</Select.Item>
          <Select.Item value="30">30</Select.Item>
          <Select.Item value="40">40</Select.Item>
          <Select.Item value="50">50</Select.Item>
          <Select.Item value="60">60</Select.Item>
          <Select.Item value="70">70</Select.Item>
          <Select.Item value="80">80</Select.Item>
          <Select.Item value="90">90</Select.Item>
          <Select.Item value="100">100</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>

    <div
      class="text-sm text-muted-foreground gap-2 mt-2 md:mt-0 hidden md:flex"
    >
      <div>Total registros:</div>
      <div class="rounded-full min-w-10 text-center dark:bg-gray-950/50">
        {totalElements}
      </div>
    </div>
  </div>

  <div class="flex flex-col items-end gap-2">
    <Pagination.Root count={totalPages} {page} class="md:justify-end">
      {#snippet children({ pages, currentPage })}
        <Pagination.Content
          class="rounded-full border border-gray-100 p-2 dark:border-gray-800 dark:bg-neutral-800"
        >
          <Pagination.Item>
            <Pagination.PrevButton
              disabled={!first}
              onclick={() => onPageChange(currentPage - 1)}
              >Anterior</Pagination.PrevButton
            >
          </Pagination.Item>
          {#each pages as page (page.key)}
            {#if page.type === "ellipsis"}
              <Pagination.Item>
                <Pagination.Ellipsis />
              </Pagination.Item>
            {:else}
              <Pagination.Item>
                <Pagination.Link
                  {page}
                  isActive={currentPage === page.value}
                  size="sm"
                  class="border bg-gray-100 border-gray-500 dark:bg-gray-950/50 dark:border-gray-800"
                  onclick={() => onPageChange(page.value - 1)}
                >
                  {page.value}
                </Pagination.Link>
              </Pagination.Item>
            {/if}
          {/each}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.NextButton
              disabled={!last}
              onclick={() => onPageChange(currentPage)}
              >Próximo</Pagination.NextButton
            >
          </Pagination.Item>
        </Pagination.Content>
      {/snippet}
    </Pagination.Root>
  </div>
</div>
