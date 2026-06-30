import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { PUBLIC_APP_URL } from "$env/static/public";
import { browser } from "$app/environment";
import { USER_AUTH_TOKEN_KEY } from "$lib/data/variables";

let stompClient: Client | null = null;
let onMessageCallback: ((msg: string) => void) | null = null;

export function connectStomp(onMessage: (msg: string) => void): Client {
  onMessageCallback = onMessage;

  if (stompClient?.active) {
    return stompClient;
  }

  const token = browser ? localStorage.getItem(USER_AUTH_TOKEN_KEY) : null;

  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${PUBLIC_APP_URL}/ws-chat`),
    connectHeaders: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    onConnect: () => {
      stompClient!.subscribe("/user/queue/messages", (message) => {
        onMessageCallback?.(message.body);
      });
    },
    onWebSocketError: (event) => {
      console.error("WS error:", event);
    },
    onWebSocketClose: (event) => {
      console.error("WS closed - code:", event.code, "reason:", event.reason);
    },
    onStompError: (frame) => {
      console.error("STOMP error:", frame.headers["message"], frame.body);
    },
  });

  stompClient.activate();
  return stompClient;
}

export function disconnectStomp(): void {
  if (stompClient?.active) {
    stompClient.deactivate();
  }
  stompClient = null;
  onMessageCallback = null;
}

export function sendStompMessage(destination: string, body: unknown): void {
  if (stompClient?.active) {
    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}