<script lang="ts">
  import { page } from "$app/state";
  import AppSidebar from "$lib/components/navs/sidebar/app-sidebar.svelte";
  import ChatPage from "$lib/feature/pub/chat/ui/chat-page.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useOrgSimpleInfo } from "$lib/feature/org/organization/data/hooks/use-get-simple-org";
  import { useOrgListUsers } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import type { OrgUserSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import type { ChatConversationWithMessages } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";
  import { isAuthenticatedStore } from "$lib/stores/user-auth.store";

  const slug = $derived(page.params.slug!);
  const isAuthenticated = $derived($isAuthenticatedStore);

  let orgQuery = $derived(useOrgSimpleInfo(slug, { enabled: isAuthenticated }));
  let usersQuery = $derived(
    useOrgListUsers(slug, { enabled: isAuthenticated }),
  );

  let org = $derived($orgQuery.data ?? null);
  let users = $derived($usersQuery.data ?? []);

  let conversation = $state<ChatConversationWithMessages | null>(null);
  let receptor = $state<OrgUserSimpleResponse | null>(null);

  $effect(() => {
    if (users.length === 1 && receptor === null) {
      receptor = users[0];
    }
  });

  function handleSelectConversation(
    conv: ChatConversationWithMessages,
    userObj: OrgUserSimpleResponse | null,
  ) {
    conversation = conv;
    receptor = userObj;
  }
</script>

<Sidebar.Provider>
  <AppSidebar
    {slug}
    {org}
    {users}
    onSelectConversation={handleSelectConversation}
  />
  <Sidebar.Inset>
    <ChatPage {conversation} {slug} {org} {receptor} />
  </Sidebar.Inset>
</Sidebar.Provider>
