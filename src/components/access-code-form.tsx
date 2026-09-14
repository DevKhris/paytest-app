'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CheckmarkCircle02Icon } from 'hugeicons-react';
import { i18n } from '@/i18n/keys';
import { useAuthStore } from '@/stores/auth-store';

type FormMode = 'register' | 'login';
type RegistrationStep = 'credentials' | 'confirm';

export default function AccessCodeForm() {
  const [mode, setMode] = useState<FormMode>('register');
  const [step, setStep] = useState<RegistrationStep>('credentials');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const { register, login, isLoading, error, clearError } = useAuthStore();

  const handleRegisterSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearError();

      if (step === 'credentials') {
        setStep('confirm');
        return;
      }

      try {
        await register(name.trim(), password, code.trim().toUpperCase());
        setIsSuccess(true);
        setTimeout(() => router.push('/dashboard'), 300);
      } catch {
        // error is set in store
      }
    },
    [step, name, password, code, register, router, clearError]
  );

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearError();

      try {
        await login(code.trim().toUpperCase(), password);
        setIsSuccess(true);
        setTimeout(() => router.push('/dashboard'), 300);
      } catch {
        // error is set in store
      }
    },
    [code, password, login, router, clearError]
  );

  const handleBackToRegister = useCallback(() => {
    setMode('register');
    setStep('credentials');
    setPassword('');
    clearError();
  }, [clearError]);

  const handleBackToLogin = useCallback(() => {
    setMode('login');
    setPassword('');
    clearError();
  }, [clearError]);

  const inputBaseClass =
    'w-full px-4 py-3 text-base font-medium bg-transparent border-2 rounded-lg outline-none transition-all duration-150 placeholder:font-mono placeholder:tracking-widest input-gradient-focus text-[var(--color-text-primary)] bg-[var(--color-bg)]';

  if (mode === 'login') {
    return (
      <form onSubmit={handleLoginSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg text-sm border border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="login-id" className="block text-sm font-semibold text-[var(--color-text-primary)]">
            ID
          </label>
          <input
            id="login-id"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              clearError();
            }}
            placeholder="XXXXXXXXXXXX"
            className={`${inputBaseClass} cursor-text`}
            autoComplete="off"
            spellCheck={false}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="login-password" className="block text-sm font-semibold text-[var(--color-text-primary)]">
            {t(i18n.landing.form.createPassword)}
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t(i18n.landing.form.passwordPlaceholder)}
            className={`${inputBaseClass} cursor-text`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg border-2 transition-all duration-150 hover:brightness-110 cursor-pointer bg-[var(--gradient-start)] border-[var(--gradient-start)] text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSuccess ? (
            <>
              <CheckmarkCircle02Icon size={20} strokeWidth={2} />
              <span>✓</span>
            </>
          ) : isLoading ? (
            t(i18n.landing.form.loading)
          ) : (
            t(i18n.landing.form.submit)
          )}
        </button>

        <button
          type="button"
          onClick={handleBackToRegister}
          className="w-full text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          {t(i18n.landing.form.continueDashboard)}
        </button>
      </form>
    );
  }

  if (step === 'confirm') {
    return (
      <form onSubmit={handleRegisterSubmit} className="space-y-5">
        <div className="text-center pb-4 border-b border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            {t(i18n.landing.form.setupSubtitle)}
          </p>
          <p
            className="text-xl font-bold uppercase tracking-wider bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))',
              color: 'transparent',
            }}
          >
            {name}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
            {t(i18n.landing.form.codeLabel)}
          </label>
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
            <span className="font-mono text-base font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              {code}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm-password" className="block text-sm font-semibold text-[var(--color-text-primary)]">
            {t(i18n.landing.form.createPassword)}
          </label>
          <input
            id="confirm-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t(i18n.landing.form.passwordPlaceholder)}
            className={`${inputBaseClass} cursor-text`}
            required
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg text-sm border border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep('credentials')}
            className="flex-1 px-4 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent"
          >
            ←
          </button>
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg border-2 transition-all duration-150 hover:brightness-110 cursor-pointer bg-[var(--gradient-start)] border-[var(--gradient-start)] text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSuccess ? (
              <>
                <CheckmarkCircle02Icon size={20} strokeWidth={2} />
                <span>✓</span>
              </>
            ) : isLoading ? (
              t(i18n.landing.form.loading)
            ) : (
              t(i18n.landing.form.continueDashboard)
            )}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleRegisterSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-text-primary)]">
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
        <label htmlFor="code" className="block text-sm font-semibold text-[var(--color-text-primary)]">
          {t(i18n.landing.form.codeLabel)}
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            clearError();
          }}
          placeholder={t(i18n.landing.form.codePlaceholder)}
          className={`${inputBaseClass} cursor-text`}
          autoComplete="off"
          spellCheck={false}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg border-2 transition-all duration-150 hover:brightness-110 cursor-pointer bg-[var(--gradient-start)] border-[var(--gradient-start)] text-white"
      >
        {t(i18n.landing.form.submit)}
      </button>

      <button
        type="button"
        onClick={handleBackToLogin}
        className="w-full text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
      >
        {t(i18n.landing.form.submit)}
      </button>
    </form>
  );
}
