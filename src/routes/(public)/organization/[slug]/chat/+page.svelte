<script lang="ts">
  import { page } from "$app/state";
  import ChatSidebar from "$lib/components/navs/sidebar/chat-sidebar.svelte";
  import ChatPage from "$lib/feature/pub/chat/ui/chat-page.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useOrgSimpleInfo } from "$lib/feature/org/organization/data/hooks/use-get-simple-org";
  import { useOrgListUsers } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import type { OrgUserSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import { useUserConversations } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";
  import type { ChatMessageResponse } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";
  import type {
    PaginateRequest,
    PageResponse,
  } from "$lib/feature/pub/chat/data/queries/types";
  import { isAuthenticatedStore } from "$lib/stores/user-auth.store";

  const slug = $derived(page.params.slug!);
  const isAuthenticated = $derived($isAuthenticatedStore);

  const usersPageRequest: PaginateRequest = { pageNumber: 0, pageSize: 50 };
  let orgQuery = $derived(useOrgSimpleInfo(slug, { enabled: isAuthenticated }));
  let usersQuery = $derived(
    useOrgListUsers(slug, usersPageRequest, { enabled: isAuthenticated }),
  );
  let org = $derived($orgQuery.data ?? null);
  let users = $derived($usersQuery.data?.content ?? []);

  let receptor = $state<OrgUserSimpleResponse | null>(null);
  let messagesPageRequest = $state<PaginateRequest>({
    pageNumber: 0,
    pageSize: 20,
  });

  let messages = $state<ChatMessageResponse[]>([]);
  let currentPage = $state<PageResponse<ChatMessageResponse> | null>(null);

  let conversationsQuery = $derived(
    useUserConversations(receptor, messagesPageRequest),
  );

  $effect(() => {
    const page = $conversationsQuery.data;
    if (!page) return;
    currentPage = page;
    if (messagesPageRequest.pageNumber === 0) {
      messages = page.content;
    } else {
      messages = [...page.content, ...messages];
    }
  });

  function handleReceptorChange(newReceptor: OrgUserSimpleResponse) {
    receptor = newReceptor;
    messages = [];
    currentPage = null;
    messagesPageRequest = { pageNumber: 0, pageSize: 20 };
  }

  function handleLoadMore() {
    if (currentPage?.last) return;
    messagesPageRequest = {
      ...messagesPageRequest,
      pageNumber: messagesPageRequest.pageNumber + 1,
    };
  }
</script>

<Sidebar.Provider>
  <ChatSidebar {slug} {org} {users} onChangeUser={handleReceptorChange} />
  <Sidebar.Inset>
    <ChatPage
      isLoading={$conversationsQuery.isLoading}
      hasMore={!currentPage?.last}
      onLoadMore={handleLoadMore}
      {receptor}
      {messages}
      {slug}
      {org}
    />
  </Sidebar.Inset>
</Sidebar.Provider>
