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
          <p className="animate-pulse text-[var(--color-text-secondary)]">
            Loading...
          </p>
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

      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest pl-1 text-[var(--color-text-secondary)]">
                {t(i18n.dashboard.sections.funds)}
              </h2>
              <BalanceSection
                user={user}
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

      <footer className="py-6 px-6 text-center border-t bg-[var(--color-bg-card)] border-[var(--color-border)]">
        <div className="w-16 h-1 mx-auto rounded-full bg-[var(--gradient-start)]"></div>
        <p className="text-sm mt-4 text-[var(--color-text-secondary)]">
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
