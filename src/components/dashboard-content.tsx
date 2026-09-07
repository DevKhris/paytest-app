'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import BalanceSection from '@/components/balance-section';
import TransactionList from '@/components/transaction-list';
import SendModal from '@/components/send-modal';
import ReceiveModal from '@/components/receive-modal';
import Header from '@/components/header';
import { getOrCreateUser, clearUser } from '@/lib/storage';
import type { User } from '@/types/user';
import type { Transaction } from '@/types/transaction';
import { i18n } from '@/i18n/keys';

type ModalType = 'send' | 'receive' | null;

export default function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [transactions] = useState<Transaction[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    const loadedUser = getOrCreateUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Client-only initialization to avoid hydration mismatch with localStorage
    setUser(loadedUser);
    setMounted(true);
  }, []);

  const handleOpenSend = useCallback(() => setActiveModal('send'), []);
  const handleOpenReceive = useCallback(() => setActiveModal('receive'), []);
  const handleCloseModal = useCallback(() => setActiveModal(null), []);

  const handleCloseSession = useCallback(() => {
    clearUser();
    router.push('/');
  }, [router]);

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <Header title={t(i18n.landing.title)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-[var(--color-text-secondary)] animate-pulse">
            Loading...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Header
        title={t(i18n.landing.title)}
        showCloseButton
        onClose={handleCloseSession}
        closeLabel={t(i18n.dashboard.close)}
      />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <section className="lg:col-span-2 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] pl-1">
                {t(i18n.dashboard.sections.funds)}
              </h2>
              <BalanceSection
                user={user}
                onSendClick={handleOpenSend}
                onReceiveClick={handleOpenReceive}
              />
            </section>

            <section className="lg:col-span-3 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] pl-1">
                {t(i18n.dashboard.sections.activity)}
              </h2>
              <TransactionList transactions={transactions} />
            </section>
          </div>
        </div>
      </main>

      <footer className="relative py-6 px-6 bg-[var(--color-bg-card)] border-t-2 border-[var(--color-border)] text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-pink)] to-[var(--neon-purple)] rounded-full"></div>
        <p className="text-sm text-[var(--color-text-secondary)]">
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
