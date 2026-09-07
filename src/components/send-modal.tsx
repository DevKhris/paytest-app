'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Cancel02Icon } from 'hugeicons-react';
import { i18n } from '@/i18n/keys';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
}

export default function SendModal({ isOpen, onClose, maxAmount }: SendModalProps) {
  const [amount, setAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const t = useTranslations();

  const handleClose = useCallback(() => {
    setAmount('');
    setRecipientId('');
    onClose();
  }, [onClose]);

  const isFormValid = useMemo(() => 
    amount.length > 0 && recipientId.length > 0,
    [amount, recipientId]
  );

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-md rounded-xl animate-slideUp bg-[var(--color-bg-card)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b transition-colors duration-200 border-[var(--color-border)]">
          <h2 className="text-lg font-semibold transition-colors duration-200 text-[var(--color-text-primary)]">
            {t(i18n.dashboard.transfer.send)}
          </h2>
          <button 
            type="button" 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]"
          >
            <Cancel02Icon size={20} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="send-amount" 
              className="block text-sm font-semibold transition-colors duration-200 text-[var(--color-text-primary)]"
            >
              {t(i18n.dashboard.transfer.amount)}
            </label>
            <input
              id="send-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={maxAmount}
              className="w-full px-4 py-3 text-base font-mono bg-transparent border-2 rounded-lg outline-none transition-all duration-150 input-gradient-focus text-[var(--color-text-primary)] bg-[var(--color-bg)]"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="recipient-id" 
              className="block text-sm font-semibold transition-colors duration-200 text-[var(--color-text-primary)]"
            >
              {t(i18n.dashboard.transfer.recipientId)}
            </label>
            <input
              id="recipient-id"
              type="text"
              placeholder="XXXXXXXXXXXX"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value.toUpperCase())}
              maxLength={12}
              className="w-full px-4 py-3 text-base font-mono tracking-wider bg-transparent border-2 rounded-lg outline-none transition-all duration-150 uppercase input-gradient-focus text-[var(--color-text-primary)] bg-[var(--color-bg)]"
            />
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t transition-colors duration-200 border-[var(--color-border)]">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent"
          >
            {t(i18n.dashboard.transfer.cancel)}
          </button>
          <button
            type="button"
            disabled={!isFormValid}
            className="flex-1 px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all duration-150 cursor-pointer hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--gradient-start)] border-[var(--gradient-start)] text-white"
          >
            {t(i18n.dashboard.transfer.submit)}
          </button>
        </div>
      </div>
    </div>
  );
}
