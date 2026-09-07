'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
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
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t(i18n.dashboard.transfer.send)}</h2>
          <button type="button" className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="send-amount" className="form-label">
              {t(i18n.dashboard.transfer.amount)}
            </label>
            <input
              id="send-amount"
              type="number"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={maxAmount}
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipient-id" className="form-label">
              {t(i18n.dashboard.transfer.recipientId)}
            </label>
            <input
              id="recipient-id"
              type="text"
              className="form-input"
              placeholder="XXXXXXXXXXXX"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value.toUpperCase())}
              maxLength={12}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            {t(i18n.dashboard.transfer.cancel)}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            {t(i18n.dashboard.transfer.submit)}
          </button>
        </div>
      </div>
    </div>
  );
}
