'use client';

import { useState, useCallback } from 'react';
import ThemeToggle from './theme-toggle';
import { Logout01Icon } from 'hugeicons-react';

interface HeaderProps {
  showCloseButton?: boolean;
  onClose?: () => void;
  closeLabel?: string;
}

export default function Header({ showCloseButton, onClose, closeLabel }: HeaderProps) {
  const [diamondClicks, setDiamondClicks] = useState(0);

  const handleDiamondClick = useCallback(() => {
    setDiamondClicks(prev => prev + 1);
    if (diamondClicks >= 2) {
      setDiamondClicks(0);
      window.dispatchEvent(new CustomEvent('gameSprite'));
    }
  }, [diamondClicks]);

  return (
    <header className="relative border-b-2 transition-colors duration-200 border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"></div>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="relative pl-8">
          <button 
            type="button"
            onClick={handleDiamondClick}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer select-none transition-transform duration-100 hover:scale-125 active:scale-90 text-[var(--gradient-start)] bg-transparent border-none p-0"
            aria-label="Easter egg trigger"
          >
            ◆
          </button>
          <h1 className="text-xl font-bold tracking-tight transition-colors duration-200">
            <span className="bg-clip-text" style={{ color: 'transparent', backgroundImage: 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))' }}>Pay</span>
            <span className="text-[var(--color-text-primary)]">Test</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {showCloseButton && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-dashed transition-all duration-150 cursor-pointer hover:brightness-110 bg-[var(--color-bg-subtle)] border-[var(--color-border)] text-[var(--color-text-secondary)]"
            >
              <Logout01Icon size={16} strokeWidth={1.5} />
              {closeLabel}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
