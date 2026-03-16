"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { adminLoginSchema, type AdminLoginFormData } from "@/lib/validators";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const { login, isAuthenticated, isChecking } = useAdminAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (!isChecking && isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, isChecking, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = (data: AdminLoginFormData) => {
    const success = login(data.username, data.password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--admin-bg)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl tracking-[0.15em] uppercase text-cream">
            Zaragoza
          </h1>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/50 mt-1">
            Admin Panel
          </p>
          <GoldDivider slim className="mt-4 max-w-32 mx-auto" />
        </div>

        {/* Form card */}
        <div
          className="rounded-lg p-7 border"
          style={{
            background: "var(--admin-card)",
            borderColor: "var(--admin-border)",
          }}
        >
          <h2 className="font-sans text-sm font-light text-fog tracking-wider uppercase text-center mb-6">
            Sign In to Continue
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs tracking-wider uppercase text-fog">Username</label>
              <input
                {...register("username")}
                type="text"
                autoComplete="username"
                className="input-admin"
                placeholder="admin"
              />
              {errors.username && (
                <p className="text-xs text-red-400">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs tracking-wider uppercase text-fog">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="input-admin pr-10"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-fog transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {loginError && (
              <div className="rounded p-3 bg-red-900/20 border border-red-800/40">
                <p className="font-sans text-xs text-red-400 text-center">{loginError}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={isSubmitting}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center font-sans text-xs text-stone mt-6">
          © {new Date().getFullYear()} Zaragoza Restaurant & Bar
        </p>
      </div>
    </div>
  );
}
