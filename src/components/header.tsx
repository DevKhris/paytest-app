import ThemeToggle from './theme-toggle';
import { Logout01Icon } from 'hugeicons-react';

interface HeaderProps {
  title: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  closeLabel?: string;
}

export default function Header({ title, showCloseButton, onClose, closeLabel }: HeaderProps) {
  return (
    <header className="relative border-b-2 transition-colors duration-200" 
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-pink)] to-[var(--color-neon-purple)]"></div>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="relative pl-8">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: 'var(--color-neon-cyan)' }}>◆</span>
          <h1 className="text-xl font-bold tracking-tight transition-colors duration-200" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {showCloseButton && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-dashed transition-all duration-150 hover:border-solid"
              style={{ 
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderColor: 'var(--color-border)'
              }}
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
