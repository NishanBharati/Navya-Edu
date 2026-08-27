import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  maxWidthClass?: string;
  contentClassName?: string;
}

/**
 * Shared overlay shell for every full-screen dialog on the public site.
 * Centralizes what each hand-rolled modal used to reimplement slightly
 * differently: backdrop blur, entrance animation, Escape-to-close, body
 * scroll lock, and dialog a11y semantics. Each caller keeps its own
 * header/body/footer markup as `children` and only supplies width +
 * card-specific classes via `contentClassName`.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  labelledBy,
  maxWidthClass = 'max-w-xl',
  contentClassName = '',
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative w-full ${maxWidthClass} bg-white rounded-3xl border border-border shadow-2xl overflow-hidden animate-slide-in my-8 ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
