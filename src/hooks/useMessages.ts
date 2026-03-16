"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/localStorage";
import { generateId } from "@/lib/utils";
import type { ContactMessage, MessageType } from "@/types/contact";

export function useMessages() {
  const [messages, setMessages] = useLocalStorage<ContactMessage[]>(
    STORAGE_KEYS.MESSAGES,
    []
  );

  const addMessage = useCallback(
    (
      input: Omit<ContactMessage, "id" | "createdAt" | "isRead" | "isArchived">
    ) => {
      const newMessage: ContactMessage = {
        ...input,
        id: `msg-${generateId()}`,
        createdAt: new Date().toISOString(),
        isRead: false,
        isArchived: false,
      };
      setMessages((prev) => [newMessage, ...prev]);
      return newMessage;
    },
    [setMessages]
  );

  const markRead = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id && !m.isRead
            ? { ...m, isRead: true, readAt: new Date().toISOString() }
            : m
        )
      );
    },
    [setMessages]
  );

  const archive = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isArchived: true } : m))
      );
    },
    [setMessages]
  );

  const unarchive = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isArchived: false } : m))
      );
    },
    [setMessages]
  );

  const updateAdminNotes = useCallback(
    (id: string, adminNotes: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, adminNotes } : m))
      );
    },
    [setMessages]
  );

  const deleteMessage = useCallback(
    (id: string) => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    },
    [setMessages]
  );

  const getUnread = useCallback(
    () => messages.filter((m) => !m.isRead && !m.isArchived),
    [messages]
  );

  const getByType = useCallback(
    (type: MessageType) =>
      messages.filter((m) => m.type === type && !m.isArchived),
    [messages]
  );

  const getInbox = useCallback(
    () =>
      messages
        .filter((m) => !m.isArchived)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [messages]
  );

  return {
    messages,
    addMessage,
    markRead,
    archive,
    unarchive,
    updateAdminNotes,
    deleteMessage,
    getUnread,
    getByType,
    getInbox,
    unreadCount: messages.filter((m) => !m.isRead && !m.isArchived).length,
  };
}
