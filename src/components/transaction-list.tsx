'use client';

import { useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { Transaction } from '@/types/transaction';
import { i18n } from '@/i18n/keys';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const t = useTranslations();

  const isEmpty = useMemo(() => transactions.length === 0, [transactions.length]);

  const handleTransactionClick = useCallback((id: string) => {
    // Future: open transaction detail modal
    console.log('Transaction clicked:', id);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title-sm">{t(i18n.dashboard.transactions.title)}</h2>
      </div>
      <div className="transactions-container">
        {isEmpty ? (
          <p className="empty-state">{t(i18n.dashboard.transactions.empty)}</p>
        ) : (
          <ul className="transactions-list">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="transaction-item"
                onClick={() => handleTransactionClick(tx.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTransactionClick(tx.id);
                  }
                }}
              >
                <div className={`transaction-icon ${tx.type}`}>
                  {tx.type === 'sent' ? '→' : '←'}
                </div>
                <div className="transaction-details">
                  <span className="transaction-type">
                    {tx.type === 'sent' ? t(i18n.dashboard.transfer.send) : t(i18n.dashboard.transfer.receive)}
                  </span>
                  <span className="transaction-counterparty">{tx.counterpartyId}</span>
                </div>
                <div className={`transaction-amount ${tx.type}`}>
                  {tx.type === 'sent' ? '-' : '+'}${tx.amount.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
