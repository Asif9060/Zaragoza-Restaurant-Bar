"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
}: ToastProps) {
  const icons = {
    success: <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />,
    error:   <XCircle    size={18} className="text-red-400 flex-shrink-0" />,
    info:    <CheckCircle size={18} className="text-gold flex-shrink-0" />,
  };

  const colors = {
    success: "border-emerald-700/50 bg-charcoal",
    error:   "border-red-700/50 bg-charcoal",
    info:    "border-gold/30 bg-charcoal",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-lg border px-4 py-3 shadow-2xl min-w-64 max-w-sm",
            colors[type]
          )}
          role="alert"
        >
          {icons[type]}
          <p className="font-sans text-sm text-cream flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-mist hover:text-cream transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing toast state
import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setToast({ message, type, isVisible: true });
      setTimeout(() => setToast((t) => ({ ...t, isVisible: false })), 4000);
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((t) => ({ ...t, isVisible: false }));
  }, []);

  return { toast, showToast, hideToast };
}
