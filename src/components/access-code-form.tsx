'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ACCESS_CODE } from '@/lib/constants';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const MESSAGES = {
  idle: '',
  loading: 'Verificando credenciales...',
  error: 'Código de acceso inválido. Por favor intenta de nuevo.',
  success: 'Acceso concedido. Redirigiendo...',
};

export default function AccessCodeForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (status === 'error') {
      setStatus('idle');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="access-code" className="form-label">
            Código de acceso
          </label>
          <input
            id="access-code"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="XXXXXXXX"
            className={`form-input ${status === 'error' ? 'error' : ''}`}
            disabled={status === 'loading' || status === 'success'}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Verificando...' : status === 'success' ? '✓' : 'Continuar'}
        </button>
      </form>

      <div className={`status-message ${status !== 'idle' ? 'visible' : ''} ${status}`}>
        {MESSAGES[status]}
      </div>
    </div>
  );
}
