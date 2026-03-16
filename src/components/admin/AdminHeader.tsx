import { LogOut } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { logout } = useAdminAuth();

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-20"
      style={{
        background: "var(--admin-bg)",
        borderColor: "var(--admin-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div>
        <h1 className="font-serif text-xl font-light text-cream">{title}</h1>
        {subtitle && (
          <p className="font-sans text-xs text-mist font-light mt-0.5">{subtitle}</p>
        )}
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 font-sans text-xs text-mist hover:text-red-400 transition-colors px-3 py-2 rounded hover:bg-red-900/10"
      >
        <LogOut size={14} />
        <span className="hidden sm:inline">Log Out</span>
      </button>
    </header>
  );
}
