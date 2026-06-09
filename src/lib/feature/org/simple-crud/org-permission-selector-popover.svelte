<script lang="ts">
  import { gql } from "@apollo/client/core";
  import { onMount } from "svelte";
  import { apolloClient } from "$lib/providers/graphql.provider";
  import { Popover } from "$lib/components/ui/popover";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Cancel01Icon, PlusSignIcon } from "@hugeicons/core-free-icons";

  export type OrgPermissionSelectorItem = { uuid: string; name: string };

  let {
    selected = $bindable([]),
    onChange,
  }: {
    selected: OrgPermissionSelectorItem[];
    onChange?: (permissions: OrgPermissionSelectorItem[]) => void;
  } = $props();

  let permissions = $state<OrgPermissionSelectorItem[]>([]);
  let isLoading = $state(false);

  const QUERY = gql`
    query orgPermissionSelector($paginateRequest: PaginateRequest) {
      orgPaginatePermission(paginateRequest: $paginateRequest) {
        content {
          uuid
          name
        }
      }
    }
  `;

  const isSelected = (permission: OrgPermissionSelectorItem) =>
    selected.some((item) => item.uuid === permission.uuid);

  function emit(next: OrgPermissionSelectorItem[]) {
    selected = next;
    onChange?.(next);
  }

  function toggle(permission: OrgPermissionSelectorItem) {
    emit(isSelected(permission)
      ? selected.filter((item) => item.uuid !== permission.uuid)
      : [...selected, permission]);
  }

  async function load() {
    isLoading = true;
    try {
      const { data } = await apolloClient.query<{ orgPaginatePermission: { content: OrgPermissionSelectorItem[] } }>({
        query: QUERY,
        variables: { paginateRequest: { pageNumber: 0, pageSize: 100 } },
        fetchPolicy: "network-only",
      });
      permissions = data?.orgPaginatePermission.content ?? [];
    } finally {
      isLoading = false;
    }
  }

  onMount(load);
</script>

<div class="space-y-2">
  <div class="text-sm font-medium">Permissões</div>

  {#if selected.length > 0}
    <div class="flex flex-wrap gap-1.5">
      {#each selected as permission (permission.uuid)}
        <Badge variant="secondary" class="gap-1 pr-1">
          <span class="text-xs">{permission.name}</span>
          <button type="button" class="cursor-pointer hover:text-destructive" onclick={() => toggle(permission)}>
            <HugeiconsIcon icon={Cancel01Icon} size={18} color="currentColor" strokeWidth={1.5} />
          </button>
        </Badge>
      {/each}
    </div>
  {/if}

  <Popover.Root>
    <Popover.Trigger class="w-full">
      <Button type="button" variant="outline" class="w-full justify-start gap-2 text-sm font-normal">
        <HugeiconsIcon icon={PlusSignIcon} size={20} color="currentColor" strokeWidth={1.5} />
        {selected.length > 0 ? "Adicionar/Remover" : "Selecionar"}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-80 p-0 bg-background">
      <Tabs.Root value="lista" class="w-full">
        <Tabs.List class="mx-3 mt-2">
          <Tabs.Trigger value="lista" class="flex-1">Lista</Tabs.Trigger>
          <Tabs.Trigger value="selecionados" class="flex-1">
            Selecionados
            {#if selected.length > 0}
              <Badge variant="default" class="ml-1 h-4 min-w-4 px-1 text-[10px]">{selected.length}</Badge>
            {/if}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="lista" class="mt-0 max-h-60 overflow-y-auto p-2">
          {#if isLoading}
            <p class="text-sm text-muted-foreground p-2">Carregando...</p>
          {:else if permissions.length === 0}
            <p class="text-sm text-muted-foreground p-2">Nenhuma permissão encontrada</p>
          {:else}
            {#each permissions as permission (permission.uuid)}
              <button type="button" class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted" onclick={() => toggle(permission)}>
                <Checkbox checked={isSelected(permission)} class="pointer-events-none" />
                <span>{permission.name}</span>
              </button>
            {/each}
          {/if}
        </Tabs.Content>

        <Tabs.Content value="selecionados" class="mt-0 max-h-60 overflow-y-auto p-2">
          {#if selected.length === 0}
            <p class="text-sm text-muted-foreground p-2">Nenhuma permissão selecionada</p>
          {:else}
            {#each selected as permission (permission.uuid)}
              <div class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm">
                <span class="flex-1">{permission.name}</span>
                <button type="button" class="text-muted-foreground hover:text-destructive" onclick={() => toggle(permission)}>
                  <HugeiconsIcon icon={Cancel01Icon} size={18} color="currentColor" strokeWidth={1.5} />
                </button>
              </div>
            {/each}
          {/if}
        </Tabs.Content>
      </Tabs.Root>
    </Popover.Content>
  </Popover.Root>
</div>
