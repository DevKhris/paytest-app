'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpLeft02Icon, ArrowDownRight02Icon } from 'hugeicons-react';
import type { User } from '@/types/user';
import { i18n } from '@/i18n/keys';

interface BalanceSectionProps {
  user: User;
  onSendClick: () => void;
  onReceiveClick: () => void;
}

export default function BalanceSection({ user, onSendClick, onReceiveClick }: BalanceSectionProps) {
  const t = useTranslations();

  const formattedBalance = useMemo(() => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(user.balance),
    [user.balance]
  );

  const displayId = user.id;

  return (
    <div className="relative p-6 rounded-xl neon-border glow-border transition-colors duration-200" 
         style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider mb-1 transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>
          {t(i18n.dashboard.profile.welcomeBack)}
        </p>
        <p className="text-2xl font-bold uppercase tracking-wider bg-clip-text" style={{ color: 'transparent', backgroundImage: 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))' }}>
          {user.name}
        </p>
      </div>
      
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider mb-1 transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>
          {t(i18n.dashboard.profile.balance)}
        </p>
        <p className="text-4xl font-bold tracking-tighter font-mono transition-colors duration-200" style={{ color: 'var(--gradient-start)' }}>
          {formattedBalance}
        </p>
      </div>

      <div className="flex items-center justify-between p-3 mb-6 rounded-lg border border-dashed transition-colors duration-200"
           style={{ borderColor: 'var(--color-border)' }}>
        <span className="text-xs uppercase tracking-wider transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>
          {t(i18n.dashboard.profile.id)}
        </span>
        <span className="font-mono text-sm font-semibold tracking-wider transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>
          {displayId}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onSendClick}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-lg border-2 transition-all duration-150"
          style={{ 
            backgroundColor: 'var(--gradient-start)',
            borderColor: 'var(--gradient-start)',
            color: '#FFFFFF'
          }}
        >
          <ArrowUpLeft02Icon size={18} strokeWidth={2} />
          {t(i18n.dashboard.transfer.send)}
        </button>
        <button
          type="button"
          onClick={onReceiveClick}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-lg border-2 border-dashed transition-all duration-150"
          style={{ 
            backgroundColor: 'transparent',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)'
          }}
        >
          <ArrowDownRight02Icon size={18} strokeWidth={2} />
          {t(i18n.dashboard.transfer.receive)}
        </button>
      </div>
    </div>
  );
}
