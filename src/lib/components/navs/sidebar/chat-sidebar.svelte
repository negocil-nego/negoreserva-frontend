<script lang="ts" module>
  import { userAuthStore } from "$lib/stores/user-auth.store";
</script>

<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import type { ComponentProps } from "svelte";
  import type { OrgSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-simple-org";
  import type { OrgUserSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-org-users";

  let {
    ref = $bindable(null),
    org,
    users = [],
    collapsible = "icon",
    onChangeUser,
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> & {
    slug: string;
    org: OrgSimpleResponse | null;
    users: OrgUserSimpleResponse[];
    onChangeUser: (receptor: OrgUserSimpleResponse) => void;
  } = $props();

  const user = $derived(userAuthStore.getUserAuthResponse());
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header class="flex items-center justify-center">
    {#if org}
      <div
        class="group-data-[state=expanded]:flex gap-2 justify-center hidden text-center items-center"
      >
        {#if org.logo}
          <Avatar.Root class="size-8 mx-auto mb-1">
            <Avatar.Image src={org.logo} alt={org.name} />
            <Avatar.Fallback>{(org.name || "O").charAt(0)}</Avatar.Fallback>
          </Avatar.Root>
        {/if}
        <div class="text-sm font-semibold truncate">{org.name}</div>
      </div>
    {:else}
      <div class="group-data-[state=expanded]:block hidden">...</div>
    {/if}
    <div
      class="group-data-[state=collapsed]:flex hidden h-8 w-8 items-center justify-center bg-primary text-primary-foreground font-bold text-sm"
    >
      {org ? org.name.charAt(0) : "O"}
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    {#if users.length > 0}
      <Sidebar.Group>
        <Sidebar.GroupLabel>Utilizadores</Sidebar.GroupLabel>
        <Sidebar.Menu>
          {#each users as userItem (userItem.uuid)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                class="cursor-pointer"
                onclick={() => onChangeUser(userItem!)}
              >
                <Avatar.Root class="size-6">
                  <Avatar.Image src={undefined} alt={userItem.name} />
                  <Avatar.Fallback class="text-xs"
                    >{userItem.name.charAt(0).toUpperCase()}</Avatar.Fallback
                  >
                </Avatar.Root>
                <span class="text-sm truncate">{userItem.name}</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.Group>
    {/if}
  </Sidebar.Content>
  <Sidebar.Rail />
  <Sidebar.Footer>
    {#if user}
      <div class="flex items-center gap-2 p-2">
        <Avatar.Root class="size-8">
          <Avatar.Image src={user.logo} alt={user.name} />
          <Avatar.Fallback>{(user.name || "U").charAt(0)}</Avatar.Fallback>
        </Avatar.Root>
        <div
          class="grid flex-1 text-start text-sm leading-tight group-data-[state=collapsed]:hidden"
        >
          <span class="truncate font-medium">{user.name}</span>
          <span class="truncate text-xs">{user.email}</span>
        </div>
      </div>
    {/if}
  </Sidebar.Footer>
</Sidebar.Root>
