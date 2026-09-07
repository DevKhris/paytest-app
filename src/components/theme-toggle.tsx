'use client';

import { useTheme } from './theme-provider';
import { Sun03Icon, Moon01Icon } from 'hugeicons-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 p-0 rounded-lg border border-dashed cursor-pointer transition-all duration-150 hover:brightness-110"
      style={{ 
        backgroundColor: 'var(--color-bg-subtle)',
        borderColor: 'var(--color-border)',
        color: 'var(--gradient-start)'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'dark' ? (
        <Moon01Icon size={20} strokeWidth={1.5} />
      ) : (
        <Sun03Icon size={20} strokeWidth={1.5} />
      )}
    </button>
  );
}
