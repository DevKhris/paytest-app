'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { UserIcon, EyeIcon } from 'hugeicons-react';
import type { Transaction } from '@/types/transaction';
import { i18n } from '@/i18n/keys';

interface TransactionListProps {
  transactions: Transaction[];
}

type ActivityTab = 'transactions' | 'contacts';

export default function TransactionList({ transactions }: TransactionListProps) {
  const [activeTab, setActiveTab] = useState<ActivityTab>('transactions');
  const t = useTranslations();

  const handleTabChange = useCallback((tab: ActivityTab) => {
    setActiveTab(tab);
  }, []);

  const isEmpty = useMemo(() => transactions.length === 0, [transactions.length]);

  const handleTransactionClick = useCallback((id: string) => {
    console.log('Transaction clicked:', id);
  }, []);

  const tabs = useMemo(() => ({
    transactions: {
      label: t(i18n.dashboard.transactions.title),
      isActive: activeTab === 'transactions',
      onClick: () => handleTabChange('transactions'),
    },
    contacts: {
      label: t(i18n.dashboard.transactions.contacts),
      isActive: activeTab === 'contacts',
      onClick: () => handleTabChange('contacts'),
    },
  }), [t, activeTab, handleTabChange]);

  return (
    <div className="relative p-6 rounded-xl neon-border glow-border transition-colors duration-200" 
         style={{ backgroundColor: 'var(--color-bg-card)' }}>
      <div className="flex gap-2 p-1 mb-6 rounded-lg border transition-colors duration-200"
           style={{ backgroundColor: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)' }}>
        <button
          type="button"
          onClick={tabs.transactions.onClick}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer hover:brightness-110 ${
            tabs.transactions.isActive ? 'font-semibold' : ''
          }`}
          style={{
            backgroundColor: tabs.transactions.isActive ? 'var(--color-bg-card)' : 'transparent',
            color: tabs.transactions.isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
          }}
        >
          <EyeIcon size={16} strokeWidth={1.5} />
          {tabs.transactions.label}
        </button>
        <button
          type="button"
          onClick={tabs.contacts.onClick}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer hover:brightness-110 ${
            tabs.contacts.isActive ? 'font-semibold' : ''
          }`}
          style={{
            backgroundColor: tabs.contacts.isActive ? 'var(--color-bg-card)' : 'transparent',
            color: tabs.contacts.isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
          }}
        >
          <UserIcon size={16} strokeWidth={1.5} />
          {tabs.contacts.label}
        </button>
      </div>

      <div className="min-h-32">
        {activeTab === 'transactions' && (
          isEmpty ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-200"
                   style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
                <span className="text-2xl transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>∅</span>
              </div>
              <p className="transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>
                {t(i18n.dashboard.transactions.empty)}
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  onClick={() => handleTransactionClick(tx.id)}
                  className="flex items-center gap-4 p-4 rounded-lg border border-transparent transition-all duration-150 cursor-pointer hover:brightness-125"
                  style={{ backgroundColor: 'var(--color-bg-subtle)' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                       style={{ 
                         backgroundColor: tx.type === 'sent' ? 'var(--color-error-bg)' : 'var(--color-success-bg)',
                         color: tx.type === 'sent' ? 'var(--color-error)' : 'var(--color-success)'
                       }}>
                    {tx.type === 'sent' ? '↑' : '↓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium transition-colors duration-200" style={{ color: 'var(--color-text-primary)' }}>
                      {tx.type === 'sent' ? t(i18n.dashboard.transfer.send) : t(i18n.dashboard.transfer.receive)}
                    </p>
                    <p className="font-mono text-xs transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>
                      {tx.counterpartyId}
                    </p>
                  </div>
                  <p className="font-mono text-sm font-bold transition-colors duration-200"
                     style={{ color: tx.type === 'sent' ? 'var(--color-error)' : 'var(--color-success)' }}>
                    {tx.type === 'sent' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )
        )}

        {activeTab === 'contacts' && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-200"
                 style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
              <UserIcon size={24} strokeWidth={1.5} className="transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }} />
            </div>
            <p className="transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }}>
              {t(i18n.dashboard.transactions.noContacts)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
