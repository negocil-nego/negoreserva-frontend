<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as Chat from "$lib/components/ui/chat";
  import * as EmojiPicker from "$lib/components/ui/emoji-picker";
  import * as Popover from "$lib/components/ui/popover";
  import * as Avatar from "$lib/components/ui/avatar";
  import { buttonVariants } from "$lib/components/ui/button";
  import Button from "$lib/components/button.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    InformationCircleIcon,
    TelephoneIcon,
    ArrowRight01Icon,
    SmilePlusIcon,
    Video02Icon,
    Home01Icon,
  } from "@hugeicons/core-free-icons";
  import { Input } from "$lib/components/ui/input";
  import { cn } from "$lib/utils.js";
  import {
    connectStomp,
    disconnectStomp,
    sendStompMessage,
  } from "$lib/feature/pub/chat/data/stomp-client";
  import { userAuthStore } from "$lib/stores/user-auth.store";
  import type { OrgUserSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
  import type { ChatMessageResponse } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";
  import type { OrgSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-simple-org";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

  const TYPING_TIMEOUT_MS = 2000;

  let {
    slug = "",
    onLoadMore,
    messages = [],
    receptor = null,
    hasMore = true,
    isLoading = false,
  }: {
    messages: ChatMessageResponse[];
    slug: string;
    org: OrgSimpleResponse | null;
    receptor: OrgUserSimpleResponse | null;
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoading?: boolean;
  } = $props();

  const currentUser = $derived(userAuthStore.getUserAuthResponse() as any);

  let message = $state("");
  let emojiPickerOpen = $state(false);
  let isTyping = $state(false);
  let typingTimeout: ReturnType<typeof setTimeout> | null = null;

  // --- Helpers ---

  function initials(name: string | null | undefined) {
    if (!name) return "?";
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  function formatMessageTime(createdAt: string) {
    return new Date(createdAt).toLocaleTimeString("pt-PT", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function isOwnMessage(msg: ChatMessageResponse) {
    return msg.senderName === currentUser?.name;
  }

  // --- STOMP handling ---

  function handleIncomingMessage(data: {
    uuid: string;
    message: string;
    senderUuid: string;
    senderName: string;
    createdAt: string;
  }) {
    const alreadyExists = messages.some((m) => m.uuid === data.uuid);
    if (alreadyExists) return;

    messages.push({
      uuid: data.uuid,
      message: data.message,
      senderName: data.senderName,
      receptorName:
        data.senderUuid === currentUser?.uuid
          ? (currentUser?.name ?? "")
          : data.senderName,
      createdAt: data.createdAt,
    });
  }

  function handleTypingEvent(data: { senderUuid: string; isTyping: boolean }) {
    if (data.senderUuid === receptor?.uuid) {
      isTyping = data.isTyping;
    }
  }

  function handleStompMessage(raw: string) {
    console.log(raw);
    const data = JSON.parse(raw);
    if (data.type === "message") {
      handleIncomingMessage(data);
    } else if (data.type === "typing") {
      handleTypingEvent(data);
    }
  }

  // --- Typing indicator ---

  function notifyTyping(isTypingValue: boolean) {
    if (!receptor?.uuid || !slug) return;
    sendStompMessage("/app/chat/typing", {
      orgSlug: slug,
      receptorUuid: receptor.uuid,
      isTyping: isTypingValue,
      message,
    });
  }

  function handleTypingInput() {
    if (!receptor?.uuid || !slug) return;
    notifyTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => notifyTyping(false), TYPING_TIMEOUT_MS);
  }

  // --- Sending messages ---

  function canSendMessage() {
    return message.trim() !== "" && !!receptor?.uuid && !!slug;
  }

  function handleSendMessage(event: SubmitEvent) {
    event.preventDefault();
    if (!canSendMessage()) return;
    sendStompMessage("/app/chat/send", {
      orgSlug: slug,
      receptorUuid: receptor!.uuid,
      message: message.trim(),
    });
    message = "";
  }

  function handleEmojiSelect(selected: { emoji: string }) {
    emojiPickerOpen = false;
    message += selected.emoji;
  }

  onMount(() => {
    connectStomp({
      onChatMessage: handleStompMessage,
      onChatTyping: handleStompMessage,
    });
  });

  onDestroy(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    disconnectStomp();
  });
</script>

<div class="border-border w-full border h-screen flex flex-col">
  <div
    class="bg-background flex place-items-center justify-between border-b p-2 shrink-0"
  >
    <div class="flex place-items-center gap-2">
      <Avatar.Root>
        <Avatar.Image src={undefined} alt={receptor?.name} />
        <Avatar.Fallback>{initials(receptor?.name)}</Avatar.Fallback>
      </Avatar.Root>
      <div class="flex flex-col">
        <span class="text-sm font-medium">
          {receptor?.name || "Selecione uma conversa"}
        </span>
        <span class="text-xs">
          {isTyping
            ? "A escrever..."
            : messages.length > 0
              ? "Conversa ativa"
              : ""}
        </span>
      </div>
    </div>
    <div class="flex place-items-center">
      <Button
        variant="ghost"
        size="icon"
        class="rounded-full"
        onclick={() => (window.location.href = "/")}
      >
        <HugeiconsIcon icon={Home01Icon} />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-full">
        <HugeiconsIcon icon={TelephoneIcon} />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-full">
        <HugeiconsIcon icon={Video02Icon} />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-full">
        <HugeiconsIcon icon={InformationCircleIcon} />
      </Button>
    </div>
  </div>

  <Chat.List class="flex-1 overflow-y-auto">
    {#if isLoading}
      <div>
        {#each Array.from({ length: 4 }, (_, i) => i) as i (i)}
          <div class="flex flex-col space-y-3">
            <Skeleton class="h-28 w-52" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-52" />
              <Skeleton class="h-4 w-50" />
            </div>
          </div>
        {/each}
      </div>
    {:else}
      {#if hasMore && messages.length > 0}
        <div class="flex justify-center p-2">
          <Button onclick={onLoadMore} variant="ghost" size="sm">
            Carregar mais mensagens
          </Button>
        </div>
      {/if}
      {#each messages as msg (msg.uuid + msg.message)}
        <Chat.Bubble variant={isOwnMessage(msg) ? "sent" : "received"}>
          <Chat.BubbleAvatar>
            <Chat.BubbleAvatarImage
              src={isOwnMessage(msg)
                ? currentUser?.logo || undefined
                : undefined}
              alt={msg.receptorName}
            />
            <Chat.BubbleAvatarFallback>
              {initials(msg.receptorName)}
            </Chat.BubbleAvatarFallback>
          </Chat.BubbleAvatar>
          <Chat.BubbleMessage class="flex flex-col gap-1">
            <p>{msg.message}</p>
            <div
              class="w-full text-xs group-data-[variant='sent']/chat-bubble:text-end"
            >
              {formatMessageTime(msg.createdAt)}
            </div>
          </Chat.BubbleMessage>
        </Chat.Bubble>
      {/each}

      {#if isTyping}
        <Chat.Bubble variant="received">
          <Chat.BubbleAvatar>
            <Chat.BubbleAvatarFallback
              >{initials(receptor?.name)}</Chat.BubbleAvatarFallback
            >
          </Chat.BubbleAvatar>
          <Chat.BubbleMessage>
            <span class="text-muted-foreground italic text-xs"
              >A escrever...</span
            >
          </Chat.BubbleMessage>
        </Chat.Bubble>
      {/if}
    {/if}
  </Chat.List>

  <form
    onsubmit={handleSendMessage}
    class="flex place-items-center gap-2 p-2 shrink-0"
  >
    <EmojiPicker.Root
      showRecents
      recentsKey="emoji-picker-recents"
      disableInitialScroll
      onSelect={handleEmojiSelect}
    >
      <Popover.Root bind:open={emojiPickerOpen}>
        <Popover.Trigger
          class={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "shrink-0 rounded-full",
          )}
        >
          <HugeiconsIcon icon={SmilePlusIcon} />
        </Popover.Trigger>
        <Popover.Content class="w-auto p-0" side="top" align="start">
          <EmojiPicker.Search />
          <EmojiPicker.List class="h-[175px]" />
          <EmojiPicker.Footer
            class="relative flex max-w-[232px] place-items-center gap-2 px-2"
          >
            {#snippet children({ active })}
              <div class="flex w-[calc(100%-40px)] items-center gap-2">
                <span class="text-lg">{active?.emoji}</span>
                <span class="text-muted-foreground truncate text-xs">
                  {active?.data.name}
                </span>
              </div>
              <EmojiPicker.SkinToneSelector />
            {/snippet}
          </EmojiPicker.Footer>
        </Popover.Content>
      </Popover.Root>
    </EmojiPicker.Root>

    <Input
      bind:value={message}
      oninput={handleTypingInput}
      class="rounded-full"
      placeholder="Type a message..."
    />

    {#if message.trim().length == 0}
      <Button
        type="submit"
        variant="default"
        size="icon"
        class="shrink-0 rounded-full"
        disabled
      >
        <HugeiconsIcon icon={ArrowRight01Icon} />
      </Button>
    {:else if receptor}
      <Button
        type="submit"
        variant="default"
        size="icon"
        class="shrink-0 rounded-full"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} />
      </Button>
    {/if}
  </form>
</div>
