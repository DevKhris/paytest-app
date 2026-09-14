'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { UserIcon, EyeIcon } from 'hugeicons-react';
import type { TransactionItem } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { useAccountStore } from '@/stores/account-store';
import { i18n } from '@/i18n/keys';

interface TransactionListProps {
  transactions: TransactionItem[];
}

type ActivityTab = 'transactions' | 'contacts';

export default function TransactionList({ transactions }: TransactionListProps) {
  const [activeTab, setActiveTab] = useState<ActivityTab>('transactions');
  const t = useTranslations();
  const { token } = useAuthStore();
  const { contacts, fetchContacts, removeContact } = useAccountStore();

  useEffect(() => {
    if (token && activeTab === 'contacts') {
      fetchContacts(token);
    }
  }, [token, activeTab, fetchContacts]);

  const handleTabChange = useCallback((tab: ActivityTab) => {
    setActiveTab(tab);
  }, []);

  const isEmpty = useMemo(() => transactions.length === 0, [transactions.length]);
  const isContactsEmpty = useMemo(() => contacts.length === 0, [contacts.length]);

  const handleTransactionClick = useCallback((id: string) => {
    console.log('Transaction clicked:', id);
  }, []);

  const handleRemoveContact = useCallback(
    async (contactUserId: string) => {
      if (!token) return;
      try {
        await removeContact(token, contactUserId);
      } catch {
        // error is set in store
      }
    },
    [token, removeContact]
  );

  const tabs = useMemo(
    () => ({
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
    }),
    [t, activeTab, handleTabChange]
  );

  const formatAmount = (tx: TransactionItem) => {
    const sign = tx.type === 'INCOME' ? '+' : '-';
    return `${sign}$${parseFloat(tx.amount).toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative p-6 rounded-xl neon-border glow-border transition-colors duration-200 bg-[var(--color-bg-card)]">
      <div className="flex gap-2 p-1 mb-6 rounded-lg border transition-colors duration-200 bg-[var(--color-bg-subtle)] border-[var(--color-border)]">
        <button
          type="button"
          onClick={tabs.transactions.onClick}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer hover:brightness-110 ${
            tabs.transactions.isActive ? 'font-semibold' : ''
          } ${tabs.transactions.isActive ? 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
        >
          <EyeIcon size={16} strokeWidth={1.5} />
          {tabs.transactions.label}
        </button>
        <button
          type="button"
          onClick={tabs.contacts.onClick}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer hover:brightness-110 ${
            tabs.contacts.isActive ? 'font-semibold' : ''
          } ${tabs.contacts.isActive ? 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
        >
          <UserIcon size={16} strokeWidth={1.5} />
          {tabs.contacts.label}
        </button>
      </div>

      <div className="min-h-32">
        {activeTab === 'transactions' &&
          (isEmpty ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-200 border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                <span className="text-2xl transition-colors duration-200 text-[var(--color-text-secondary)]">
                  ∅
                </span>
              </div>
              <p className="transition-colors duration-200 text-[var(--color-text-secondary)]">
                {t(i18n.dashboard.transactions.empty)}
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  onClick={() => handleTransactionClick(tx.id)}
                  className="flex items-center gap-4 p-4 rounded-lg border border-transparent transition-all duration-150 cursor-pointer hover:brightness-125 bg-[var(--color-bg-subtle)]"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor:
                        tx.type === 'SPEND' ? 'var(--color-error-bg)' : 'var(--color-success-bg)',
                      color:
                        tx.type === 'SPEND' ? 'var(--color-error)' : 'var(--color-success)',
                    }}
                  >
                    {tx.type === 'SPEND' ? '↑' : '↓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium transition-colors duration-200 text-[var(--color-text-primary)]">
                      {tx.type === 'SPEND'
                        ? t(i18n.dashboard.transfer.send)
                        : t(i18n.dashboard.transfer.receive)}
                    </p>
                    <p className="font-mono text-xs transition-colors duration-200 text-[var(--color-text-secondary)]">
                      {tx.related_user_id || tx.description || '—'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="font-mono text-sm font-bold transition-colors duration-200"
                      style={{
                        color:
                          tx.type === 'SPEND' ? 'var(--color-error)' : 'var(--color-success)',
                      }}
                    >
                      {formatAmount(tx)}
                    </p>
                    <p className="font-mono text-xs transition-colors duration-200 text-[var(--color-text-secondary)]">
                      {formatDate(tx.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ))}

        {activeTab === 'contacts' &&
          (isContactsEmpty ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-200 border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                <UserIcon
                  size={24}
                  strokeWidth={1.5}
                  className="transition-colors duration-200 text-[var(--color-text-secondary)]"
                />
              </div>
              <p className="transition-colors duration-200 text-[var(--color-text-secondary)]">
                {t(i18n.dashboard.transactions.noContacts)}
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {contacts.map((contact) => (
                <li
                  key={contact.contact_user_id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-transparent transition-all duration-150 bg-[var(--color-bg-subtle)]"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <UserIcon
                      size={18}
                      strokeWidth={1.5}
                      className="text-[var(--color-text-secondary)]"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium transition-colors duration-200 text-[var(--color-text-primary)]">
                      {contact.contact.name}
                    </p>
                    <p className="font-mono text-xs transition-colors duration-200 text-[var(--color-text-secondary)]">
                      {contact.contact_user_id}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveContact(contact.contact_user_id)}
                    className="text-xs text-[var(--color-error)] hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
}
