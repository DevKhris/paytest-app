'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { User } from '@/types/user';
import { i18n } from '@/i18n/keys';

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
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
      <div className="profile-data">
        <div className="profile-row">
          <span className="profile-label">{t(i18n.dashboard.profile.id)}</span>
          <span className="profile-value mono">{displayId}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">{t(i18n.dashboard.profile.balance)}</span>
          <span className="profile-value balance">{formattedBalance}</span>
        </div>
      </div>
    </div>
  );
}
