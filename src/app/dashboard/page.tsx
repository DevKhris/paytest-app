'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ProfileCard from '@/components/profile-card';
import TransactionList from '@/components/transaction-list';
import TransferForm from '@/components/transfer-form';
import { getOrCreateUser, clearUser } from '@/lib/storage';
import type { User, Transaction } from '@/types';
import { i18n } from '@/i18n/keys';

export default function Dashboard() {
  const [user] = useState<User | null>(() => getOrCreateUser());
  const [transactions] = useState<Transaction[]>([]);
  const t = useTranslations();
  const router = useRouter();

  const handleCloseSession = useCallback(() => {
    clearUser();
    router.push('/');
  }, [router]);

  if (!user) {
    return (
      <div className="page-wrapper">
        <header className="header">
          <div className="header-content">
            <div className="logo">
              {t(i18n.landing.title)}
            </div>
          </div>
        </header>
        <main className="main-content">
          <div className="card">
            <p>Error loading user</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            {t(i18n.landing.title)}
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={handleCloseSession}
          >
            {t(i18n.dashboard.close)}
          </button>
        </div>
      </header>

      <main className="main-content dashboard">
        <div className="dashboard-grid">
          <ProfileCard user={user} />
          <TransferForm />
          <TransactionList transactions={transactions} />
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text">
          {t(i18n.footer.copyright)}
        </p>
      </footer>
    </div>
  );
}
