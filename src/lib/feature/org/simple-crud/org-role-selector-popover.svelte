<script lang="ts">
  import { gql } from "@apollo/client/core";
  import { onMount } from "svelte";
  import { apolloClient } from "$lib/providers/graphql.provider";
  import { Popover } from "$lib/components/ui/popover";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Cancel01Icon, PlusSignIcon } from "@hugeicons/core-free-icons";

  export type OrgRoleSelectorItem = { uuid: string; name: string };

  let {
    selected = $bindable([]),
    onChange,
  }: {
    selected: OrgRoleSelectorItem[];
    onChange?: (roles: OrgRoleSelectorItem[]) => void;
  } = $props();

  let roles = $state<OrgRoleSelectorItem[]>([]);
  let isLoading = $state(false);

  const QUERY = gql`
    query orgRoleSelector($paginateRequest: PaginateRequest) {
      orgPaginateRole(paginateRequest: $paginateRequest) {
        content {
          uuid
          name
        }
      }
    }
  `;

  const isSelected = (role: OrgRoleSelectorItem) => selected.some((item) => item.uuid === role.uuid);

  function emit(next: OrgRoleSelectorItem[]) {
    selected = next;
    onChange?.(next);
  }

  function toggle(role: OrgRoleSelectorItem) {
    emit(isSelected(role)
      ? selected.filter((item) => item.uuid !== role.uuid)
      : [role]);
  }

  async function load() {
    isLoading = true;
    try {
      const { data } = await apolloClient.query<{ orgPaginateRole: { content: OrgRoleSelectorItem[] } }>({
        query: QUERY,
        variables: { paginateRequest: { pageNumber: 0, pageSize: 100 } },
        fetchPolicy: "network-only",
      });
      roles = data?.orgPaginateRole.content ?? [];
    } finally {
      isLoading = false;
    }
  }

  onMount(load);
</script>

<div class="space-y-2">
  <div class="text-sm font-medium">Cargo</div>

  {#if selected.length > 0}
    <div class="flex flex-wrap gap-1.5">
      {#each selected as role (role.uuid)}
        <Badge variant="secondary" class="gap-1 pr-1">
          <span class="text-xs">{role.name}</span>
          <button type="button" class="cursor-pointer hover:text-destructive" onclick={() => toggle(role)}>
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
        {selected.length > 0 ? "Alterar cargo" : "Selecionar"}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-80 p-2 bg-background">
      <div class="max-h-60 overflow-y-auto">
        {#if isLoading}
          <p class="text-sm text-muted-foreground p-2">Carregando...</p>
        {:else if roles.length === 0}
          <p class="text-sm text-muted-foreground p-2">Nenhum cargo encontrado</p>
        {:else}
          {#each roles as role (role.uuid)}
            <button type="button" class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted" onclick={() => toggle(role)}>
              <Checkbox checked={isSelected(role)} class="pointer-events-none" />
              <span>{role.name}</span>
            </button>
          {/each}
        {/if}
      </div>
    </Popover.Content>
  </Popover.Root>
</div>
