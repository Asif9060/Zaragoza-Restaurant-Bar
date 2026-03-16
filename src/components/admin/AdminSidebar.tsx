"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  ImageIcon,
  Sparkles,
  MessageSquare,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useReservations } from "@/hooks/useReservations";
import { useMessages } from "@/hooks/useMessages";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard",              label: "Dashboard",         icon: LayoutDashboard },
  { href: "/admin/dashboard/reservations", label: "Reservations",      icon: CalendarDays },
  { href: "/admin/dashboard/menu",         label: "Menu Management",   icon: UtensilsCrossed },
  { href: "/admin/dashboard/gallery",      label: "Gallery",           icon: ImageIcon },
  { href: "/admin/dashboard/events",       label: "Events",            icon: Sparkles },
  { href: "/admin/dashboard/messages",     label: "Messages",          icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const { getPendingCount } = useReservations();
  const { unreadCount } = useMessages();

  const pendingCount = getPendingCount();

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto"
      style={{ background: "var(--admin-sidebar)", borderRight: "1px solid var(--admin-border)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--admin-border)" }}>
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-serif text-lg tracking-[0.15em] uppercase text-cream group-hover:text-gold transition-colors">
            Zaragoza
          </span>
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/50 font-light mt-0.5">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin/dashboard"
              ? pathname === "/admin/dashboard"
              : pathname.startsWith(item.href);

          const badge =
            item.href.includes("reservations") && pendingCount > 0
              ? pendingCount
              : item.href.includes("messages") && unreadCount > 0
              ? unreadCount
              : null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans font-light transition-all duration-150",
                isActive
                  ? "bg-gold/15 text-gold border border-gold/20"
                  : "text-mist hover:text-cream hover:bg-white/5"
              )}
            >
              <item.icon size={15} className="flex-shrink-0" />
              <span className="flex-1 text-xs tracking-wide">{item.label}</span>
              {badge !== null && (
                <span className="bg-gold text-obsidian text-[10px] font-sans font-normal px-1.5 py-0.5 rounded-full min-w-5 text-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-2 py-4 border-t flex flex-col gap-0.5"
        style={{ borderColor: "var(--admin-border)" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-sans text-mist hover:text-cream hover:bg-white/5 transition-all"
        >
          <ExternalLink size={15} />
          <span>View Live Site</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-sans text-mist hover:text-red-400 hover:bg-red-900/10 transition-all w-full"
        >
          <LogOut size={15} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
