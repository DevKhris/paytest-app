'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
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

  const displayId = useMemo(() => 
    user.id.match(/.{1,4}/g)?.join('-') ?? user.id,
    [user.id]
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title-sm">{t(i18n.dashboard.profile.title)}</h2>
      </div>
      
      <div className="balance-display">
        <span className="balance-label">{t(i18n.dashboard.profile.balance)}</span>
        <span className="balance-amount">{formattedBalance}</span>
      </div>

      <div className="user-id-display">
        <span className="id-label">{t(i18n.dashboard.profile.id)}</span>
        <span className="id-value">{displayId}</span>
      </div>

      <div className="action-buttons">
        <button
          type="button"
          className="action-btn send"
          onClick={onSendClick}
        >
          {t(i18n.dashboard.transfer.send)}
        </button>
        <button
          type="button"
          className="action-btn receive"
          onClick={onReceiveClick}
        >
          {t(i18n.dashboard.transfer.receive)}
        </button>
      </div>
    </div>
  );
}
