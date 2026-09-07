'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ACCESS_CODE } from '@/lib/constants';
import { i18n } from '@/i18n/keys';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function AccessCodeForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const t = useTranslations();

  const statusMessages = useMemo(() => ({
    idle: '',
    loading: t(i18n.landing.form.loading),
    error: t(i18n.landing.form.error),
    success: t(i18n.landing.form.success),
  }), [t]);

  const buttonMessages = useMemo(() => ({
    idle: t(i18n.landing.form.submit),
    loading: t(i18n.landing.form.loading),
    success: '✓',
    error: t(i18n.landing.form.submit),
  }), [t]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    await new Promise((resolve) => setTimeout(resolve, 600));

    if (inputValue.trim().toUpperCase() === ACCESS_CODE) {
      setStatus('success');
      setTimeout(() => {
        router.push('/dashboard');
      }, 300);
    } else {
      setStatus('error');
      setInputValue('');
    }
  }, [inputValue, router]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (status === 'error') {
      setStatus('idle');
    }
  }, [status]);

  const isInputDisabled = useMemo(() => 
    status === 'loading' || status === 'success',
    [status]
  );

  const isButtonDisabled = useMemo(() => 
    status === 'loading' || status === 'success',
    [status]
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="access-code" className="form-label">
            {t(i18n.landing.form.label)}
          </label>
          <input
            id="access-code"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={t(i18n.landing.form.placeholder)}
            className={`form-input ${status === 'error' ? 'error' : ''}`}
            disabled={isInputDisabled}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isButtonDisabled}
        >
          {buttonMessages[status]}
        </button>
      </form>

      <div className={`status-message ${status !== 'idle' ? 'visible' : ''} ${status}`}>
        {statusMessages[status]}
      </div>
    </div>
  );
}
