'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
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
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t(i18n.dashboard.transfer.receive)}</h2>
          <button type="button" className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="receive-amount" className="form-label">
              {t(i18n.dashboard.transfer.amount)}
            </label>
            <input
              id="receive-amount"
              type="number"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
