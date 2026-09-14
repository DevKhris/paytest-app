'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Cancel02Icon, Copy01Icon, CheckmarkCircle02Icon } from 'hugeicons-react';
import { i18n } from '@/i18n/keys';
import { useAuthStore } from '@/stores/auth-store';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceiveModal({ isOpen, onClose }: ReceiveModalProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations();
  const { user } = useAuthStore();

  const handleClose = useCallback(() => {
    setCopied(false);
    onClose();
  }, [onClose]);

  const handleCopyId = useCallback(async () => {
    if (!user) return;
    try {
      await navigator.clipboard.writeText(user.userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [user]);

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl animate-slideUp bg-[var(--color-bg-card)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b transition-colors duration-200 border-[var(--color-border)]">
          <h2 className="text-lg font-semibold transition-colors duration-200 text-[var(--color-text-primary)]">
            {t(i18n.dashboard.transfer.receive)}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]"
          >
            <Cancel02Icon size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Share your ID with someone so they can send you money.
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-semibold transition-colors duration-200 text-[var(--color-text-primary)]">
              {t(i18n.dashboard.profile.id)}
            </label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
              <span className="font-mono text-lg font-bold uppercase tracking-wider text-[var(--color-text-primary)] flex-1">
                {user.userId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                className="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150 hover:scale-110 cursor-pointer"
                style={{ color: copied ? 'var(--gradient-start)' : 'var(--color-text-secondary)' }}
                aria-label="Copy ID"
              >
                {copied ? (
                  <CheckmarkCircle02Icon size={18} strokeWidth={2} />
                ) : (
                  <Copy01Icon size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-5 border-t transition-colors duration-200 border-[var(--color-border)]">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent"
          >
            {t(i18n.dashboard.transfer.cancel)}
          </button>
        </div>
      </div>
    </div>
  );
}
