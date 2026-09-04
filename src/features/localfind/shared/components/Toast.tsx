import { CheckCircle2, Info, X } from "lucide-react";
import type { ToastMessage } from "../hooks/useToasts";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[92%] max-w-sm sm:left-auto sm:right-4 sm:translate-x-0"
      aria-live="polite"
      role="status"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-lf-toast-in flex items-center gap-2.5 bg-lf-ink text-white rounded-xl shadow-lg px-4 py-3 text-sm"
        >
          {toast.variant === "success" ? (
            <CheckCircle2 size={18} className="text-lf-brand-accent shrink-0" />
          ) : (
            <Info size={18} className="text-lf-brand-accent shrink-0" />
          )}
          <span className="flex-1">{toast.text}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
