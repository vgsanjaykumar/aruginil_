import { useCallback, useRef, useState } from "react";

export interface ToastMessage {
  id: number;
  text: string;
  variant: "success" | "info";
}

let idCounter = 0;

export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const showToast = useCallback((text: string, variant: ToastMessage["variant"] = "success") => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, text, variant }]);
    timers.current[id] = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      delete timers.current[id];
    }, 2800);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  return { toasts, showToast, dismissToast };
}
