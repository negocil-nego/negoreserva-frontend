<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import AppSidebar from "$lib/components/navs/sidebar/app-sidebar.svelte";
  import ChatPage from "$lib/feature/pub/chat/ui/chat-page.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useOrgSimpleInfo } from "$lib/feature/org/organization/data/hooks/use-get-simple-org";
  import { useOrgListUsers } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import type { OrgUserSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import type { ChatConversationWithMessages } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";

  const slug = $derived(page.params.slug!);

  let org = $state<{ uuid: string; name: string; logo: string | null } | null>(null);
  let users = $state<OrgUserSimpleResponse[]>([]);

  onMount(async () => {
    const [orgData, usersData] = await Promise.all([
      useOrgSimpleInfo(slug),
      useOrgListUsers(slug),
    ]);
    org = orgData;
    users = usersData;
  });

  let conversation = $state<ChatConversationWithMessages | null>(null);
  let receptor = $state<OrgUserSimpleResponse | null>(null);

  function handleSelectConversation(
    conv: ChatConversationWithMessages,
    userObj: OrgUserSimpleResponse | null,
  ) {
    conversation = conv;
    receptor = userObj;
  }
</script>

<Sidebar.Provider>
  <AppSidebar {slug} {org} {users} onSelectConversation={handleSelectConversation} />
  <Sidebar.Inset>
    <ChatPage
      {conversation}
      {slug}
      {org}
      {receptor}
    />
  </Sidebar.Inset>
</Sidebar.Provider>

