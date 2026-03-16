"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div style={{ background: "var(--admin-bg)", minHeight: "100vh" }}>
        {children}
      </div>
    );
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen" style={{ background: "var(--admin-bg)" }}>
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {children}
        </div>
      </div>
    </AdminGuard>
  );
}
