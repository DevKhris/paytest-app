'use client';

import React, { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import BalanceSection from '@/components/balance-section';
import TransactionList from '@/components/transaction-list';
import SendModal from '@/components/send-modal';
import ReceiveModal from '@/components/receive-modal';
import Header from '@/components/header';
import SessionMonitor from '@/components/session-monitor';
import { useAuthStore } from '@/stores/auth-store';
import { useAccountStore } from '@/stores/account-store';
import { i18n } from '@/i18n/keys';

type ModalType = 'send' | 'receive' | null;

export default function DashboardContent() {
  const { token, user, loadFromStorage } = useAuthStore();
  const {
    balance,
    transactions,
    fetchBalance,
    fetchTransactions,
    reset,
  } = useAccountStore();
  const [activeModal, setActiveModal] = React.useState<ModalType>(null);
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!token) return;
    fetchBalance(token);
    fetchTransactions(token);
  }, [token, fetchBalance, fetchTransactions]);

  const handleOpenSend = useCallback(() => setActiveModal('send'), []);
  const handleOpenReceive = useCallback(() => setActiveModal('receive'), []);
  const handleCloseModal = useCallback(() => setActiveModal(null), []);

  const handleCloseSession = useCallback(() => {
    reset();
    router.push('/');
  }, [router, reset]);

  if (!user || !token) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="animate-pulse text-[var(--color-text-secondary)]">
            Loading...
          </p>
        </main>
      </div>
    );
  }

  const displayBalance = balance ?? 0;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <SessionMonitor />
      <Header
        showCloseButton
        onClose={handleCloseSession}
        closeLabel={t(i18n.dashboard.close)}
      />

      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest pl-1 text-[var(--color-text-secondary)]">
                {t(i18n.dashboard.sections.funds)}
              </h2>
              <BalanceSection
                userName={user.name}
                userId={user.userId}
                balance={displayBalance}
                onSendClick={handleOpenSend}
                onReceiveClick={handleOpenReceive}
              />
            </section>

            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest pl-1 text-[var(--color-text-secondary)]">
                {t(i18n.dashboard.sections.activity)}
              </h2>
              <TransactionList transactions={transactions} />
            </section>
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 border-t bg-[var(--color-bg-card)] border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href="https://github.com/DevKhris"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm cursor-pointer hover:opacity-80 transition-opacity duration-150"
          >
            <span className="text-[var(--color-text-secondary)]">Created by </span>
            <span className="font-semibold text-[var(--gradient-start)]">DevKhris</span>
          </a>
          <div className="w-16 h-1 rounded-full bg-[var(--gradient-start)]"></div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {t(i18n.footer.copyright)}
          </p>
        </div>
      </footer>

      <SendModal
        isOpen={activeModal === 'send'}
        onClose={handleCloseModal}
        maxAmount={displayBalance}
      />
      <ReceiveModal
        isOpen={activeModal === 'receive'}
        onClose={handleCloseModal}
      />
    </div>
  );
}
