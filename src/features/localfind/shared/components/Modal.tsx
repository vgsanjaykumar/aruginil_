import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  labelledBy: string;
  maxWidth?: string;
}

export default function Modal({ onClose, children, labelledBy, maxWidth = "max-w-lg" }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center animate-lf-fade-in" role="presentation">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative bg-white w-full ${maxWidth} sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto animate-lf-scale-in`}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-lf-ink hover:bg-lf-page-alt"
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}
