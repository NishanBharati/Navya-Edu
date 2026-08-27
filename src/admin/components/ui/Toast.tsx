import React, { useCallback, useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export interface ToastState {
  message: string;
  tone: 'error' | 'success';
}

/**
 * Replaces the native `alert()` every admin CRUD screen used to fall
 * back to on save/delete errors. `showToast` mirrors `alert`'s call
 * shape so it's a drop-in swap; the message auto-dismisses after 5s
 * or can be closed immediately.
 */
export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string, tone: ToastState['tone'] = 'error') => {
    setToast({ message, tone });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  return { toast, showToast, dismissToast };
}

export const Toast: React.FC<{ toast: ToastState | null; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  if (!toast) return null;
  const isError = toast.tone === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-70 max-w-sm w-[calc(100%-3rem)] sm:w-auto animate-slide-in">
      <div
        className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-lg ${
          isError ? 'bg-red-50 border-red-200' : 'bg-white border-border'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-4.5 h-4.5 text-sage-ink shrink-0 mt-0.5" />
        )}
        <p className={`text-sm flex-1 leading-relaxed ${isError ? 'text-red-700' : 'text-ink'}`}>
          {toast.message}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="text-ink-faint hover:text-ink shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
