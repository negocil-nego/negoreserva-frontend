<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import Button, {
    buttonVariants,
  } from "$lib/components/ui/button/button.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Notification01Icon } from "@hugeicons/core-free-icons";
  import { isAuthenticatedStore } from "$lib/stores/user-auth.store";
  import { NotificationService } from "$lib/feature/org/notification/data/service/notification.service";
  import { useGetNotifications } from "$lib/feature/org/notification/data/hooks/use-get-notifications";
  import { useMarkNotificationAsRead } from "$lib/feature/org/notification/data/hooks/use-mark-notification-as-read";
  import { useMarkAllNotificationsAsRead } from "$lib/feature/org/notification/data/hooks/use-mark-all-notifications-as-read";
  import type { NotificationResponse } from "$lib/feature/org/notification/data/model/notification.model";

  const notificationService = new NotificationService();
  const isAuthenticated = $derived($isAuthenticatedStore);

  let filter = $state({ pageNumber: 0, pageSize: 20 });

  const query = $derived(
    useGetNotifications({
      filter,
      service: notificationService,
      enabled: isAuthenticated,
    }),
  );

  const markAsReadMutation = useMarkNotificationAsRead({
    service: notificationService,
  });
  const markAllAsReadMutation = useMarkAllNotificationsAsRead({
    service: notificationService,
  });

  const notifications = $derived<NotificationResponse[]>(
    $query.data?.content ?? [],
  );
  const unreadCount = $derived(notifications.filter((n) => !n.ready).length);
  const hasPagination = $derived(($query.data?.totalPages ?? 0) > 1);
  const currentPage = $derived(($query.data?.number ?? 0) + 1);
  const totalPages = $derived($query.data?.totalPages ?? 1);

  function handleMarkAsRead(notification: NotificationResponse) {
    if (notification.ready || $markAsReadMutation.isLoading) return;
    $markAsReadMutation.mutate(notification.uuid);
  }

  function handleMarkAllAsRead() {
    if (unreadCount === 0 || $markAllAsReadMutation.isLoading) return;
    $markAllAsReadMutation.mutate();
  }

  function goToPreviousPage() {
    filter.pageNumber = Math.max(0, filter.pageNumber - 1);
  }

  function goToNextPage() {
    filter.pageNumber = filter.pageNumber + 1;
  }

  function timeAgo(dateStr: string): string {
    const diffSec = Math.floor(
      (Date.now() - new Date(dateStr).getTime()) / 1000,
    );
    if (diffSec < 60) return `${diffSec}s`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay}d`;
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth}mês`;
    const diffYear = Math.floor(diffMonth / 12);
    return `${diffYear}a`;
  }
</script>

{#snippet notificationItem(notification: NotificationResponse)}
  <li
    class="rounded-lg text-sm transition-colors"
    class:bg-muted={!notification.ready}
  >
    <button
      type="button"
      class="flex w-full items-start gap-3 rounded-lg p-3 text-left disabled:cursor-default"
      onclick={() => handleMarkAsRead(notification)}
      disabled={notification.ready}
    >
      <div class="flex-1 min-w-0">
        <p class="text-foreground">{notification.message}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {timeAgo(notification.createdAt)}
        </p>
      </div>
      {#if !notification.ready}
        <span
          class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500"
          aria-hidden="true"
        ></span>
      {/if}
    </button>
  </li>
{/snippet}

{#if isAuthenticated}
  <Drawer.Root direction="right">
    <Drawer.Trigger
      class={buttonVariants({ variant: "outline", size: "icon" })}
      aria-label="Abrir notificações"
    >
      <div class="relative">
        <HugeiconsIcon
          icon={Notification01Icon}
          class="text-black dark:text-white"
        />
        {#if unreadCount > 0}
          <span
            class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        {/if}
      </div>
    </Drawer.Trigger>
    <Drawer.Content class="w-[380px] sm:w-[420px]">
      <Drawer.Header>
        <div class="flex items-center justify-between">
          <Drawer.Title>Notificações</Drawer.Title>
          {#if unreadCount > 0}
            <button
              type="button"
              class="text-xs text-muted-foreground hover:text-foreground underline disabled:opacity-50"
              onclick={handleMarkAllAsRead}
              disabled={$markAllAsReadMutation.isLoading}
            >
              Marcar todas como lidas
            </button>
          {/if}
        </div>
        <Drawer.Description>Suas notificações</Drawer.Description>
      </Drawer.Header>
      <div class="px-4 overflow-y-auto max-h-[60vh]">
        {#if $query.isLoading}
          <p class="text-sm text-muted-foreground text-center py-8">
            Carregando...
          </p>
        {:else if $query.isError}
          <p class="text-sm text-destructive text-center py-8">
            Erro ao carregar notificações
          </p>
        {:else if notifications.length === 0}
          <p class="text-sm text-muted-foreground text-center py-8">
            Nenhuma notificação
          </p>
        {:else}
          <ul class="space-y-2">
            {#each notifications as notification (notification.uuid)}
              {@render notificationItem(notification)}
            {/each}
          </ul>
        {/if}
        {#if hasPagination}
          <div class="flex items-center justify-between py-4">
            <Button
              variant="outline"
              size="sm"
              disabled={$query.data?.first}
              onclick={goToPreviousPage}
            >
              Anterior
            </Button>
            <span class="text-xs text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={$query.data?.last}
              onclick={goToNextPage}
            >
              Seguinte
            </Button>
          </div>
        {/if}
      </div>
    </Drawer.Content>
  </Drawer.Root>
{/if}
