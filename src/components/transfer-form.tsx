'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { i18n } from '@/i18n/keys';

type TransferTab = 'send' | 'receive';

export default function TransferForm() {
  const [activeTab, setActiveTab] = useState<TransferTab>('send');
  const t = useTranslations();

  const handleTabChange = useCallback((tab: TransferTab) => {
    setActiveTab(tab);
  }, []);

  const isFormDisabled = useMemo(() => true, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title-sm">{t(i18n.dashboard.transfer.title)}</h2>
      </div>
      
      <div className="tabs">
        <button
          type="button"
          className={`tab ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => handleTabChange('send')}
        >
          {t(i18n.dashboard.transfer.send)}
        </button>
        <button
          type="button"
          className={`tab ${activeTab === 'receive' ? 'active' : ''}`}
          onClick={() => handleTabChange('receive')}
        >
          {t(i18n.dashboard.transfer.receive)}
        </button>
      </div>

      <div className="transfer-form-content">
        <p className="coming-soon">{t(i18n.dashboard.transfer.soon)}</p>
        
        <div className="form-group">
          <label htmlFor="transfer-amount" className="form-label">
            {t(i18n.dashboard.transfer.amount)}
          </label>
          <input
            id="transfer-amount"
            type="number"
            className="form-input"
            placeholder="0.00"
            disabled={isFormDisabled}
          />
        </div>

        {activeTab === 'send' && (
          <div className="form-group">
            <label htmlFor="recipient-id" className="form-label">
              {t(i18n.dashboard.transfer.recipientId)}
            </label>
            <input
              id="recipient-id"
              type="text"
              className="form-input"
              placeholder="XXXXXXXXXXXX"
              disabled={isFormDisabled}
            />
          </div>
        )}

        <button
          type="button"
          className="submit-btn"
          disabled={isFormDisabled}
        >
          {t(i18n.dashboard.transfer.submit)}
        </button>
      </div>
    </div>
  );
}
