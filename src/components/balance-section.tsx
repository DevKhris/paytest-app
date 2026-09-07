'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpLeft02Icon, ArrowDownRight02Icon, Copy01Icon, CheckmarkCircle02Icon } from 'hugeicons-react';
import type { User } from '@/types/user';
import { i18n } from '@/i18n/keys';

interface BalanceSectionProps {
  user: User;
  onSendClick: () => void;
  onReceiveClick: () => void;
}

export default function BalanceSection({ user, onSendClick, onReceiveClick }: BalanceSectionProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const formattedBalance = useMemo(() => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(user.balance),
    [user.balance]
  );

  const displayId = user.id;

  const handleCopyId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(user.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [user.id]);

  return (
    <div className="relative p-6 rounded-xl neon-border glow-border transition-colors duration-200 bg-[var(--color-bg-card)]"> 
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider mb-1 transition-colors duration-200 text-[var(--color-text-secondary)]">
          {t(i18n.dashboard.profile.welcomeBack)}
        </p>
        <p className="text-2xl font-bold uppercase tracking-wider bg-clip-text" style={{ color: 'transparent', backgroundImage: 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))' }}>
          {user.name}
        </p>
      </div>
      
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider mb-1 transition-colors duration-200 text-[var(--color-text-secondary)]">
          {t(i18n.dashboard.profile.balance)}
        </p>
        <p className="text-4xl font-bold tracking-tighter font-mono transition-colors duration-200 text-[var(--gradient-start)]">
          {formattedBalance}
        </p>
      </div>

      <div className="flex items-center justify-between p-3 mb-6 rounded-lg border border-dashed transition-colors duration-200 border-[var(--color-border)]">
        <span className="text-xs uppercase tracking-wider transition-colors duration-200 text-[var(--color-text-secondary)]">
          {t(i18n.dashboard.profile.id)}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold tracking-wider transition-colors duration-200 text-[var(--color-text-secondary)]">
            {displayId}
          </span>
          <button
            type="button"
            onClick={handleCopyId}
            className="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-150 hover:scale-110 cursor-pointer"
            style={{ color: copied ? 'var(--gradient-start)' : 'var(--color-text-secondary)' }}
            aria-label="Copy ID"
          >
            {copied ? (
              <CheckmarkCircle02Icon size={16} strokeWidth={2} />
            ) : (
              <Copy01Icon size={16} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onSendClick}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-lg border-2 transition-all duration-150 hover:brightness-110 cursor-pointer bg-[var(--gradient-start)] border-[var(--gradient-start)] text-white"
        >
          <ArrowUpLeft02Icon size={18} strokeWidth={2} />
          {t(i18n.dashboard.transfer.send)}
        </button>
        <button
          type="button"
          onClick={onReceiveClick}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-lg border-2 border-dashed transition-all duration-150 hover:brightness-110 cursor-pointer bg-transparent border-[var(--color-border)] text-[var(--color-text-primary)]"
        >
          <ArrowDownRight02Icon size={18} strokeWidth={2} />
          {t(i18n.dashboard.transfer.receive)}
        </button>
      </div>
    </div>
  );
}
