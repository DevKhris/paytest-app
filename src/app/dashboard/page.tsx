'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import BalanceSection from '@/components/balance-section';
import TransactionList from '@/components/transaction-list';
import SendModal from '@/components/send-modal';
import ReceiveModal from '@/components/receive-modal';
import { getOrCreateUser, clearUser } from '@/lib/storage';
import type { User } from '@/types/user';
import type { Transaction } from '@/types/transaction';
import { i18n } from '@/i18n/keys';

type ModalType = 'send' | 'receive' | null;

export default function Dashboard() {
  const [user] = useState<User | null>(() => getOrCreateUser());
  const [transactions] = useState<Transaction[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const t = useTranslations();
  const router = useRouter();

  const handleOpenSend = useCallback(() => setActiveModal('send'), []);
  const handleOpenReceive = useCallback(() => setActiveModal('receive'), []);
  const handleCloseModal = useCallback(() => setActiveModal(null), []);

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
        <div className="dashboard-layout">
          <section className="dashboard-section">
            <h2 className="section-title">{t(i18n.dashboard.sections.funds)}</h2>
            <BalanceSection
              user={user}
              onSendClick={handleOpenSend}
              onReceiveClick={handleOpenReceive}
            />
          </section>

          <section className="dashboard-section">
            <h2 className="section-title">{t(i18n.dashboard.sections.activity)}</h2>
            <TransactionList transactions={transactions} />
          </section>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text">
          {t(i18n.footer.copyright)}
        </p>
      </footer>

      <SendModal
        isOpen={activeModal === 'send'}
        onClose={handleCloseModal}
        maxAmount={user.balance}
      />
      <ReceiveModal
        isOpen={activeModal === 'receive'}
        onClose={handleCloseModal}
      />
    </div>
  );
}
