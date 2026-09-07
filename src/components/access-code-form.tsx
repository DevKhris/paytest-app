'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CheckmarkCircle02Icon } from 'hugeicons-react';
import { ACCESS_CODE } from '@/lib/constants';
import { i18n } from '@/i18n/keys';
import { createUser, generateId } from '@/lib/storage';

type RegistrationStep = 'credentials' | 'setup';

export default function AccessCodeForm() {
  const [step, setStep] = useState<RegistrationStep>('credentials');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [userId, setUserId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const t = useTranslations();

  const handleCredentialsSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.trim().toUpperCase() !== ACCESS_CODE) {
      setError('invalid');
      return;
    }

    const newUserId = generateId();
    setUserId(newUserId);
    setStep('setup');
  }, [code]);

  const handleSetupSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    createUser(userId, name.trim());
    setIsSuccess(true);
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 300);
  }, [userId, name, router]);

  const inputBaseClass = 'w-full px-4 py-3 text-base font-medium bg-transparent border-2 rounded-lg outline-none transition-all duration-150 placeholder:font-mono placeholder:tracking-widest input-gradient-focus text-[var(--color-text-primary)] bg-[var(--color-bg)]';

  if (step === 'setup') {
    return (
      <form onSubmit={handleSetupSubmit} className="space-y-5">
        <div className="text-center pb-4 border-b border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">{t(i18n.landing.form.setupSubtitle)}</p>
          <p className="text-xl font-bold uppercase tracking-wider bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))', color: 'transparent' }}>
            {name}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
            {t(i18n.landing.form.yourId)}
          </label>
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
            <span className="font-mono text-base font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              {userId}
            </span>
            <span className="ml-auto text-xs text-[var(--color-text-secondary)]">
              {t(i18n.landing.form.idCopied)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-text-primary)]">
            {t(i18n.landing.form.createPassword)}
          </label>
          <input
            id="password"
            type="password"
            placeholder={t(i18n.landing.form.passwordPlaceholder)}
            className={`${inputBaseClass} cursor-not-allowed opacity-60`}
            disabled
          />
          <p className="text-xs text-[var(--color-text-secondary)]">
            {t(i18n.landing.form.passwordSoon)}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSuccess}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg border-2 transition-all duration-150 hover:brightness-110 cursor-pointer bg-[var(--gradient-start)] border-[var(--gradient-start)] text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSuccess ? (
            <>
              <CheckmarkCircle02Icon size={20} strokeWidth={2} />
              <span>✓</span>
            </>
          ) : (
            t(i18n.landing.form.continueDashboard)
          )}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleCredentialsSubmit} className="space-y-5">
      <div className="space-y-2">
        <label 
          htmlFor="name" 
          className="block text-sm font-semibold text-[var(--color-text-primary)]"
        >
          {t(i18n.landing.form.nameLabel)}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(i18n.landing.form.namePlaceholder)}
          className={`${inputBaseClass} cursor-text`}
          required
        />
      </div>

      <div className="space-y-2">
        <label 
          htmlFor="code" 
          className="block text-sm font-semibold text-[var(--color-text-primary)]"
        >
          {t(i18n.landing.form.codeLabel)}
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError('');
          }}
          placeholder={t(i18n.landing.form.codePlaceholder)}
          className={`${inputBaseClass} ${error ? 'border-[var(--color-error)]' : ''} cursor-text`}
          autoComplete="off"
          spellCheck={false}
          required
        />
        {error && (
          <p className="text-sm text-[var(--color-error)]">
            {t(i18n.landing.form.error)}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg border-2 transition-all duration-150 hover:brightness-110 cursor-pointer bg-[var(--gradient-start)] border-[var(--gradient-start)] text-white"
      >
        {t(i18n.landing.form.submit)}
      </button>
    </form>
  );
}
