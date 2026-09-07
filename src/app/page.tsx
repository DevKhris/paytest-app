import { getTranslations } from 'next-intl/server';
import AccessCodeForm from '@/components/access-code-form';
import Header from '@/components/header';
import SessionMonitor from '@/components/session-monitor';
import { i18n } from '@/i18n/keys';

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <SessionMonitor />
      <Header title={t(i18n.landing.title)} />

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 pixel-dots opacity-20"></div>
        <div className="absolute top-8 left-8 w-24 h-24 border-2 border-dashed border-[var(--color-border)] rounded-full opacity-30"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-dashed border-[var(--neon-cyan)] rounded-full opacity-20"></div>
        
        <div className="relative w-full max-w-md p-8 rounded-xl bg-[var(--color-bg-card)] neon-border glow-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
              {t(i18n.landing.form.title)}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t(i18n.landing.subtitle)}
            </p>
          </div>
          <AccessCodeForm />
        </div>
      </main>

      <footer className="py-6 px-6 border-t bg-[var(--color-bg-card)] border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a 
            href="https://github.com/DevKhris" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm cursor-pointer hover:opacity-80 transition-opacity duration-150"
          >
            <span className="text-[var(--color-text-secondary)]">Created by </span>
            <span className="font-semibold text-[var(--gradient-start)]">DevKhris</span>
          </a>
          <div className="w-16 h-1 rounded-full bg-[var(--gradient-start)]"></div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {t(i18n.footer.copyright)}
          </p>
        </div>
      </footer>
    </div>
  );
}
