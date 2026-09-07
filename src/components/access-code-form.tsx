'use client';

import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CheckmarkCircle02Icon } from 'hugeicons-react';
import { ACCESS_CODE } from '@/lib/constants';
import { i18n } from '@/i18n/keys';
import { createUser, generateId } from '@/lib/storage';

const formSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export default function AccessCodeForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
    },
  });

  const statusMessage = useMemo(() => {
    if (isSuccess) return t(i18n.landing.form.success);
    if (errors.code) return t(i18n.landing.form.error);
    return '';
  }, [isSuccess, errors.code, t]);

  const statusClass = useMemo(() => {
    if (isSuccess) return 'success';
    if (errors.code) return 'error';
    return '';
  }, [isSuccess, errors.code]);

  const onSubmit = useCallback(async (data: FormData) => {
    if (data.code.trim().toUpperCase() !== ACCESS_CODE) {
      setError('code', { message: 'invalid' });
      return;
    }

    const userId = generateId();
    createUser(userId, data.name.trim());

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 300);
  }, [router, setError]);

  const inputBaseClass = 'w-full px-4 py-3 text-base font-medium bg-transparent border-2 rounded-lg outline-none transition-all duration-150 placeholder:font-mono placeholder:tracking-widest';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label 
          htmlFor="name" 
          className="block text-sm font-semibold transition-colors duration-200"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {t(i18n.landing.form.nameLabel)}
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          placeholder={t(i18n.landing.form.namePlaceholder)}
          disabled={isSubmitting || isSuccess}
          className={`${inputBaseClass} input-gradient-focus ${
            errors.name 
              ? 'border-[var(--color-error)]' 
              : ''
          } disabled:opacity-60 disabled:cursor-not-allowed`}
          style={{ 
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-bg)'
          }}
        />
      </div>

      <div className="space-y-2">
        <label 
          htmlFor="code" 
          className="block text-sm font-semibold transition-colors duration-200"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {t(i18n.landing.form.codeLabel)}
        </label>
        <input
          id="code"
          type="text"
          {...register('code')}
          placeholder={t(i18n.landing.form.codePlaceholder)}
          disabled={isSubmitting || isSuccess}
          autoComplete="off"
          spellCheck={false}
          className={`${inputBaseClass} input-gradient-focus ${
            errors.code 
              ? 'border-[var(--color-error)]' 
              : ''
          } disabled:opacity-60 disabled:cursor-not-allowed`}
          style={{ 
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-bg)'
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg border-2 transition-all duration-150 hover:brightness-110 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ 
          backgroundColor: 'var(--gradient-start)',
          borderColor: 'var(--gradient-start)',
          color: '#FFFFFF'
        }}
      >
        {isSubmitting ? (
          <span className="animate-pulse">{t(i18n.landing.form.loading)}</span>
        ) : isSuccess ? (
          <>
            <CheckmarkCircle02Icon size={20} strokeWidth={2} />
            <span>✓</span>
          </>
        ) : (
          t(i18n.landing.form.submit)
        )}
      </button>

      <div 
        className={`p-3 rounded-lg text-sm text-center font-medium transition-all duration-200 ${
          statusClass === 'success' ? 'border' : statusClass === 'error' ? 'border' : 'opacity-0'
        }`}
        style={{
          backgroundColor: statusClass === 'success' ? 'var(--color-success-bg)' : statusClass === 'error' ? 'var(--color-error-bg)' : 'transparent',
          borderColor: statusClass === 'success' ? 'var(--color-success)' : statusClass === 'error' ? 'var(--color-error)' : 'transparent',
          color: statusClass === 'success' ? 'var(--color-success)' : statusClass === 'error' ? 'var(--color-error)' : 'transparent'
        }}
      >
        {statusMessage}
      </div>
    </form>
  );
}
