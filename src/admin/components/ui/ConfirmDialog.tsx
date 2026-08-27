import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-white rounded-2xl border border-border-warm p-6 max-w-sm w-full shadow-2xl space-y-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              tone === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue/10 text-blue'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <h3 className="text-base font-bold text-ink">{title}</h3>
            <p className="text-sm text-ink-soft mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 text-sm font-semibold text-ink-soft hover:text-ink transition-colors"
          >
            {cancelLabel}
          </button>
          {tone === 'danger' ? (
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center justify-center font-semibold text-sm px-5 py-2.5 rounded-[10px] bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
            >
              {confirmLabel}
            </button>
          ) : (
            <Button variant="primary" size="md" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
