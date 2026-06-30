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
  import type {
    ChatConversationWithMessages,
    ChatMessageResponse,
  } from "$lib/feature/pub/chat/data/hooks/use-get-user-conversations";

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  let {
    conversation = null,
    slug = "",
    receptor = null,
  }: {
    conversation: ChatConversationWithMessages | null;
    slug: string;
    org: { uuid: string; name: string; logo: string | null } | null;
    receptor: OrgUserSimpleResponse | null;
  } = $props();

  const currentUser = $derived(userAuthStore.getUserAuthResponse() as any);

  const localMessages = $state<ChatMessageResponse[]>([]);
  $effect(() => {
    localMessages.length = 0;
    if (conversation?.messages) {
      localMessages.push(...conversation.messages);
    }
  });

  let message = $state("");
  let open = $state(false);
  let typingTimeout: ReturnType<typeof setTimeout> | null = null;
  let isTyping = $state(false);

  onMount(() => {
    connectStomp((msg) => {
      const data = JSON.parse(msg);
      if (data.type === "message") {
        const idx = localMessages.findIndex((m) => m.uuid === data.uuid);
        if (idx === -1) {
          localMessages.push({
            uuid: data.uuid,
            message: data.message,
            receptorName:
              data.senderUuid === currentUser?.uuid
                ? (currentUser?.name ?? "")
                : data.senderName,
            createdAt: data.createdAt,
          });
        }
      } else if (data.type === "typing") {
        if (data.senderUuid === receptor?.uuid) {
          isTyping = data.isTyping;
        }
      }
    });
  });

  onDestroy(() => {
    disconnectStomp();
  });

  function sendTyping() {
    if (!receptor?.uuid || !slug) return;
    sendStompMessage("/app/chat/typing", {
      orgSlug: slug,
      receptorUuid: receptor.uuid,
      isTyping: true,
    });
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      sendStompMessage("/app/chat/typing", {
        orgSlug: slug,
        receptorUuid: receptor.uuid,
        isTyping: false,
      });
    }, 2000);
  }
</script>

<div class="border-border w-full border h-screen flex flex-col">
  <div
    class="bg-background flex place-items-center justify-between border-b p-2 shrink-0"
  >
    <div class="flex place-items-center gap-2">
      <Avatar.Root>
        <Avatar.Image src={undefined} alt={receptor?.name} />
        <Avatar.Fallback>
          {initials(receptor?.name || "?")}
        </Avatar.Fallback>
      </Avatar.Root>
      <div class="flex flex-col">
        <span class="text-sm font-medium"
          >{receptor?.name || "Selecione uma conversa"}</span
        >
        <span class="text-xs"
          >{isTyping
            ? "A escrever..."
            : localMessages.length > 0
              ? "Conversa ativa"
              : ""}</span
        >
      </div>
    </div>
    <div class="flex place-items-center">
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
    {#each localMessages as msg (msg.uuid + msg.message)}
      <Chat.Bubble
        variant={msg.receptorName === currentUser?.name ? "sent" : "received"}
      >
        <Chat.BubbleAvatar>
          <Chat.BubbleAvatarImage
            src={msg.receptorName === currentUser?.name
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
            {new Date(msg.createdAt).toLocaleTimeString("pt-PT", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
        </Chat.BubbleMessage>
      </Chat.Bubble>
    {/each}
    {#if isTyping}
      <Chat.Bubble variant="received">
        <Chat.BubbleAvatar>
          <Chat.BubbleAvatarFallback>
            {initials(receptor?.name || "")}
          </Chat.BubbleAvatarFallback>
        </Chat.BubbleAvatar>
        <Chat.BubbleMessage>
          <span class="text-muted-foreground italic text-xs">A escrever...</span
          >
        </Chat.BubbleMessage>
      </Chat.Bubble>
    {/if}
  </Chat.List>
  <form
    onsubmit={(e) => {
      e.preventDefault();
      if (
        message.trim() === "" ||
        !receptor?.name ||
        !receptor?.uuid ||
        !slug
      ) {
        console.log(receptor?.name);
        console.log(receptor?.uuid);
        return;
      }
      sendStompMessage("/app/chat/send", {
        orgSlug: slug,
        receptorUuid: receptor.uuid,
        message: message.trim(),
      });
      message = "";
    }}
    class="flex place-items-center gap-2 p-2 shrink-0"
  >
    <EmojiPicker.Root
      showRecents
      recentsKey="emoji-picker-recents"
      disableInitialScroll
      onSelect={(selected) => {
        open = false;
        message += selected.emoji;
      }}
    >
      <Popover.Root bind:open>
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
      oninput={sendTyping}
      class="rounded-full"
      placeholder="Type a message..."
    />
    <Button
      type="submit"
      variant="default"
      size="icon"
      class="shrink-0 rounded-full"
      disabled={message === ""}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} />
    </Button>
  </form>
</div>
