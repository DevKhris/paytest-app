export const ACCESS_CODE = 'PAYTEST2026';

export const MESSAGES = {
  idle: 'Ingresa el código de acceso',
  loading: 'Verificando...',
  error: 'Código inválido. Intenta de nuevo.',
  success: '¡Acceso concedido!',
} as const;

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
