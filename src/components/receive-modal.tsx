'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Cancel02Icon } from 'hugeicons-react';
import { i18n } from '@/i18n/keys';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceiveModal({ isOpen, onClose }: ReceiveModalProps) {
  const [amount, setAmount] = useState('');
  const t = useTranslations();

  const handleClose = useCallback(() => {
    setAmount('');
    onClose();
  }, [onClose]);

  const isFormValid = useMemo(() => amount.length > 0, [amount]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-md rounded-xl neon-border-accent"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b transition-colors duration-200"
             style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-lg font-semibold transition-colors duration-200" style={{ color: 'var(--color-text-primary)' }}>
            {t(i18n.dashboard.transfer.receive)}
          </h2>
          <button 
            type="button" 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Cancel02Icon size={20} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="receive-amount" 
              className="block text-sm font-semibold transition-colors duration-200"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t(i18n.dashboard.transfer.amount)}
            </label>
            <input
              id="receive-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 text-base font-mono bg-transparent border-2 rounded-lg outline-none transition-all duration-150"
              style={{ 
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg)'
              }}
            />
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t transition-colors duration-200"
             style={{ borderColor: 'var(--color-border)' }}>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150"
            style={{ 
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'transparent'
            }}
          >
            {t(i18n.dashboard.transfer.cancel)}
          </button>
          <button
            type="button"
            disabled={!isFormValid}
            className="flex-1 px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: 'var(--color-neon-cyan)',
              backgroundColor: 'var(--color-neon-cyan)',
              color: '#0D0D0D'
            }}
          >
            {t(i18n.dashboard.transfer.submit)}
          </button>
        </div>
      </div>
    </div>
  );
}
