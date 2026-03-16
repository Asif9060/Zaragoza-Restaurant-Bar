export type MessageType =
  | "general"
  | "event-inquiry"
  | "private-dining"
  | "feedback"
  | "press"
  | "other";

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: MessageType;
  isRead: boolean;
  isArchived: boolean;
  adminNotes?: string;
  readAt?: string;
}
