"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { lsGet, lsSet, lsClear, STORAGE_KEYS } from "@/lib/localStorage";
import { ADMIN_CONFIG } from "@/lib/constants";
import type { AdminSession } from "@/types/admin";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = lsGet<AdminSession>(STORAGE_KEYS.ADMIN_SESSION);
    if (session && session.isAuthenticated) {
      const now = Date.now();
      const expires = new Date(session.expiresAt).getTime();
      if (now < expires) {
        setIsAuthenticated(true);
      } else {
        lsClear(ADMIN_CONFIG.sessionKey);
      }
    }
    setIsChecking(false);
  }, []);

  const login = useCallback(
    (username: string, password: string): boolean => {
      if (
        username === ADMIN_CONFIG.username &&
        password === ADMIN_CONFIG.password
      ) {
        const now = new Date();
        const expiresAt = new Date(
          now.getTime() + ADMIN_CONFIG.sessionDurationHours * 60 * 60 * 1000
        );
        const session: AdminSession = {
          isAuthenticated: true,
          loginAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
        };
        lsSet(ADMIN_CONFIG.sessionKey, session);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    lsClear(ADMIN_CONFIG.sessionKey);
    setIsAuthenticated(false);
    router.replace("/admin/login");
  }, [router]);

  return { isAuthenticated, isChecking, login, logout };
}
