<script lang="ts" module>
  import { userAuthStore } from "$lib/stores/user-auth.store";
</script>

<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { useUserConversations } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";
  import type { ChatConversationWithMessages } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";
  import type { OrgUserSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    slug,
    org,
    users = [],
    onSelectConversation,
    collapsible = "icon",
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> & {
    slug: string;
    org: { uuid: string; name: string; logo: string | null } | null;
    users: OrgUserSimpleResponse[];
    onSelectConversation: (
      conversation: ChatConversationWithMessages,
      receptor: OrgUserSimpleResponse | null,
    ) => void;
  } = $props();

  const user = $derived(userAuthStore.getUserAuthResponse());

  let selectedUser = $state<string | null>(null);
  let selectedUserObj = $state<OrgUserSimpleResponse | null>(null);
  let conversations = $state<ChatConversationWithMessages[]>([]);

  async function handleUserClick(userItem: OrgUserSimpleResponse) {
    selectedUser = userItem.uuid;
    selectedUserObj = userItem;
    conversations = await useUserConversations(slug, userItem.uuid);
  }

  function handleConversationClick(conv: ChatConversationWithMessages) {
    onSelectConversation(conv, selectedUserObj);
  }
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
                class="cursor-pointer {selectedUser === userItem.uuid ? 'bg-sidebar-accent' : ''}"
                onclick={() => handleUserClick(userItem)}
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
          {#if conversations.length > 0}
            <Sidebar.Group>
              <Sidebar.GroupLabel>Conversas</Sidebar.GroupLabel>
              <Sidebar.Menu>
                {#each conversations as conv (conv.uuid)}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton
                      class="cursor-pointer"
                      onclick={() => handleConversationClick(conv)}
                    >
                      <span class="text-xs truncate">{conv.messages.length} mensagens</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                {/each}
              </Sidebar.Menu>
            </Sidebar.Group>
          {/if}
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
