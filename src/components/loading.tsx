interface LoadingFallbackProps {
  message?: string;
}

export default function LoadingFallback({ message = 'Loading...' }: LoadingFallbackProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <header className="relative border-b-2" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-pink)] to-[var(--color-neon-purple)]"></div>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="relative pl-8">
            <span className="absolute left-0 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-neon-cyan)' }}>◆</span>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              PayTest
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <p className="animate-pulse" style={{ color: 'var(--color-text-secondary)' }}>
          {message}
        </p>
      </main>
    </div>
  );
}
