'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CheckmarkCircle02Icon } from 'hugeicons-react';
import { i18n } from '@/i18n/keys';
import { useAuthStore } from '@/stores/auth-store';

type AuthMode = 'register' | 'login';

export default function AccessCodeForm() {
  const [roomCodeValidated, setRoomCodeValidated] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('register');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const { register, login, validateRoomCode, isLoading, error, clearError } = useAuthStore();

  const handleRoomCodeSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearError();
      try {
        await validateRoomCode(code.trim().toUpperCase());
        setRoomCodeValidated(true);
      } catch {
        // error is set in store
      }
    },
    [code, validateRoomCode, clearError]
  );

  const handleRegisterSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearError();
      try {
        await register(name.trim(), password, code.trim().toUpperCase());
        setIsSuccess(true);
        setTimeout(() => router.push('/dashboard'), 300);
      } catch {
        // error is set in store
      }
    },
    [name, password, code, register, router, clearError]
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

  const handleBackToRoomCode = useCallback(() => {
    setRoomCodeValidated(false);
    setPassword('');
    setName('');
    setAuthMode('register');
    clearError();
  }, [clearError]);

  const inputBaseClass =
    'w-full px-4 py-3 text-base font-medium bg-transparent border-2 rounded-lg outline-none transition-all duration-150 placeholder:font-mono placeholder:tracking-widest input-gradient-focus text-[var(--color-text-primary)] bg-[var(--color-bg)]';

  // ── Pantalla 1: Solo room code ──
  if (!roomCodeValidated) {
    return (
      <form onSubmit={handleRoomCodeSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg text-sm border border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]">
            {error}
          </div>
        )}

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
      </form>
    );
  }

  // ── Pantalla 2: Register (name + password) ──
  if (authMode === 'register') {
    return (
      <form onSubmit={handleRegisterSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg text-sm border border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="reg-name" className="block text-sm font-semibold text-[var(--color-text-primary)]">
            {t(i18n.landing.form.nameLabel)}
          </label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t(i18n.landing.form.namePlaceholder)}
            className={`${inputBaseClass} cursor-text`}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reg-password" className="block text-sm font-semibold text-[var(--color-text-primary)]">
            {t(i18n.landing.form.createPassword)}
          </label>
          <input
            id="reg-password"
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

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleBackToRoomCode}
            className="flex-1 px-4 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('login'); clearError(); }}
            className="flex-[2] px-4 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent"
          >
            {t(i18n.landing.form.login)}
          </button>
        </div>
      </form>
    );
  }

  // ── Pantalla 2: Login (ID + password) ──
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

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleBackToRoomCode}
          className="flex-1 px-4 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => { setAuthMode('register'); clearError(); }}
          className="flex-[2] px-4 py-3 text-sm font-semibold rounded-lg border-2 border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent"
        >
          {t(i18n.landing.form.register)}
        </button>
      </div>
    </form>
  );
}
