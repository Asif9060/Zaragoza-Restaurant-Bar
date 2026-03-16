"use client";

import { CalendarDays, Clock, Users, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { useReservations } from "@/hooks/useReservations";
import { useMessages } from "@/hooks/useMessages";
import { formatRelativeDate, formatDate, formatTime } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { ReservationStatus } from "@/types/reservation";

const STATUS_VARIANT: Record<ReservationStatus, "amber" | "emerald" | "red" | "gray" | "gold"> = {
  pending:   "amber",
  confirmed: "emerald",
  cancelled: "red",
  completed: "gold",
  "no-show": "gray",
};

export default function AdminDashboardPage() {
  const { reservations, getPendingCount, getTodayCount, getRecent } = useReservations();
  const { unreadCount, getInbox } = useMessages();

  const recentReservations = getRecent(5);
  const recentMessages = getInbox().slice(0, 5);

  const stats = [
    {
      label: "Total Reservations",
      value: reservations.length,
      icon: CalendarDays,
      href: "/admin/dashboard/reservations",
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Pending",
      value: getPendingCount(),
      icon: Clock,
      href: "/admin/dashboard/reservations",
      color: "text-amber-400",
      bg: "bg-amber-900/20",
    },
    {
      label: "Today",
      value: getTodayCount(),
      icon: Users,
      href: "/admin/dashboard/reservations",
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
    },
    {
      label: "Unread Messages",
      value: unreadCount,
      icon: MessageSquare,
      href: "/admin/dashboard/messages",
      color: "text-wine-light",
      bg: "bg-wine/15",
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <AdminHeader title="Dashboard" subtitle="Welcome back to Zaragoza Admin" />

      <div className="p-6 flex flex-col gap-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex flex-col gap-3 p-5 rounded-lg border transition-all hover:border-gold/25"
              style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}
            >
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon size={16} className={stat.color} />
              </div>
              <div>
                <p className="font-serif text-3xl font-light text-cream">{stat.value}</p>
                <p className="font-sans text-xs text-mist mt-0.5">{stat.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Reservations */}
          <div
            className="rounded-lg border overflow-hidden"
            style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--admin-border)" }}>
              <h3 className="font-sans text-sm text-cream font-light">Recent Reservations</h3>
              <Link href="/admin/dashboard/reservations" className="text-xs text-gold/70 hover:text-gold flex items-center gap-1 transition-colors">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            {recentReservations.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-sans text-sm text-stone">No reservations yet.</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
                {recentReservations.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 px-5 py-3.5">
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm text-cream truncate">
                        {r.firstName} {r.lastName}
                      </p>
                      <p className="font-sans text-xs text-stone mt-0.5">
                        {formatDate(r.date)} · {formatTime(r.time)} · {r.partySize} guests
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Messages */}
          <div
            className="rounded-lg border overflow-hidden"
            style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--admin-border)" }}>
              <h3 className="font-sans text-sm text-cream font-light">Recent Messages</h3>
              <Link href="/admin/dashboard/messages" className="text-xs text-gold/70 hover:text-gold flex items-center gap-1 transition-colors">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-sans text-sm text-stone">No messages yet.</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
                {recentMessages.map((m) => (
                  <div key={m.id} className={`px-5 py-3.5 ${!m.isRead ? "bg-gold/5" : ""}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm text-cream truncate">
                          {m.name}
                          {!m.isRead && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-gold align-middle" />}
                        </p>
                        <p className="font-sans text-xs text-stone truncate mt-0.5">{m.subject}</p>
                      </div>
                      <span className="font-sans text-[10px] text-mist flex-shrink-0">
                        {formatRelativeDate(m.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
