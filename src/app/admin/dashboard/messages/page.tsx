"use client";

import { useState } from "react";
import { Mail, Archive, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useMessages } from "@/hooks/useMessages";
import { formatRelativeDate } from "@/lib/utils";
import type { MessageType } from "@/types/contact";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<MessageType, string> = {
  "general":       "General",
  "event-inquiry": "Event",
  "private-dining":"Private Dining",
  "feedback":      "Feedback",
  "press":         "Press",
  "other":         "Other",
};

const TYPE_VARIANT: Record<MessageType, "gold" | "wine" | "emerald" | "amber" | "gray"> = {
  "general":       "gold",
  "event-inquiry": "emerald",
  "private-dining":"wine",
  "feedback":      "amber",
  "press":         "amber",
  "other":         "gray",
};

export default function AdminMessagesPage() {
  const { messages, markRead, archive, deleteMessage, updateAdminNotes, unreadCount } = useMessages();
  const [filter, setFilter] = useState<MessageType | "all" | "unread">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [adminNotesMap, setAdminNotesMap] = useState<Record<string, string>>({});

  const filteredMessages = messages
    .filter((m) => !m.isArchived)
    .filter((m) => {
      if (filter === "unread") return !m.isRead;
      if (filter === "all") return true;
      return m.type === filter;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const handleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    const msg = messages.find((m) => m.id === id);
    if (msg && !msg.isRead) markRead(id);
    if (msg && !adminNotesMap[id]) {
      setAdminNotesMap((prev) => ({ ...prev, [id]: msg.adminNotes ?? "" }));
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <AdminHeader
        title="Messages"
        subtitle={`${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
      />

      <div className="p-6 flex flex-col gap-5">
        {/* Filters */}
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "unread", ...Object.keys(TYPE_LABELS)] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={cn(
                "font-sans text-[10px] tracking-widest uppercase px-2.5 py-1.5 rounded border transition-all",
                filter === f ? "border-gold bg-gold/10 text-gold" : "border-slate text-mist hover:border-gold/40"
              )}
            >
              {f === "unread" ? `Unread (${unreadCount})` : f.replace("-"," ")}
            </button>
          ))}
        </div>

        {/* Messages list */}
        <div className="flex flex-col gap-3">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-16">
              <Mail size={28} className="text-stone mx-auto mb-3" />
              <p className="font-sans text-sm text-stone">No messages found.</p>
            </div>
          ) : filteredMessages.map((m) => {
            const isExpanded = expandedId === m.id;
            const noteVal = adminNotesMap[m.id] ?? m.adminNotes ?? "";
            return (
              <div
                key={m.id}
                className={cn(
                  "rounded-lg border overflow-hidden transition-all",
                  !m.isRead ? "border-gold/20 bg-gold/3" : ""
                )}
                style={{ background: m.isRead ? "var(--admin-card)" : undefined, borderColor: m.isRead ? "var(--admin-border)" : undefined }}
              >
                {/* Header row */}
                <button
                  onClick={() => handleExpand(m.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/3 transition-colors"
                >
                  {!m.isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-sm text-cream truncate">{m.name}</span>
                      <Badge variant={TYPE_VARIANT[m.type]} className="text-[9px]">{TYPE_LABELS[m.type]}</Badge>
                    </div>
                    <p className="font-sans text-xs text-mist truncate mt-0.5">{m.subject}</p>
                  </div>
                  <span className="font-sans text-xs text-stone flex-shrink-0">{formatRelativeDate(m.createdAt)}</span>
                  {isExpanded ? <ChevronUp size={14} className="text-stone flex-shrink-0" /> : <ChevronDown size={14} className="text-stone flex-shrink-0" />}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-5 flex flex-col gap-4 border-t" style={{ borderColor: "var(--admin-border)" }}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4 text-xs font-sans">
                      <div><p className="text-stone uppercase tracking-wider text-[10px]">From</p><p className="text-cream mt-0.5">{m.name}</p></div>
                      <div><p className="text-stone uppercase tracking-wider text-[10px]">Email</p><a href={`mailto:${m.email}`} className="text-gold hover:text-gold-light mt-0.5 block">{m.email}</a></div>
                      {m.phone && <div><p className="text-stone uppercase tracking-wider text-[10px]">Phone</p><p className="text-cream mt-0.5">{m.phone}</p></div>}
                    </div>
                    <div>
                      <p className="font-sans text-[10px] tracking-widest uppercase text-stone mb-2">Message</p>
                      <p className="font-sans text-sm text-mist leading-relaxed font-light">{m.message}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Admin Notes</label>
                      <textarea
                        className="input-admin resize-none text-xs"
                        rows={2}
                        value={noteVal}
                        onChange={(e) => setAdminNotesMap((prev) => ({ ...prev, [m.id]: e.target.value }))}
                        placeholder="Internal notes..."
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: "var(--admin-border)" }}>
                      <Button variant="outline" size="sm" onClick={() => updateAdminNotes(m.id, noteVal)}>Save Notes</Button>
                      <a href={`mailto:${m.email}?subject=Re: ${m.subject}`}>
                        <Button variant="ghost" size="sm"><Mail size={13} /> Reply</Button>
                      </a>
                      <button onClick={() => archive(m.id)} className="ml-auto p-1.5 rounded hover:bg-white/5 text-stone hover:text-mist transition-colors" title="Archive">
                        <Archive size={14} />
                      </button>
                      <button onClick={() => deleteMessage(m.id)} className="p-1.5 rounded hover:bg-red-900/20 text-stone hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
