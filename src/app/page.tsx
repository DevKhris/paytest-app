import { getTranslations } from 'next-intl/server';
import AccessCodeForm from '@/components/access-code-form';
import Header from '@/components/header';
import { i18n } from '@/i18n/keys';

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
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

      <footer className="py-6 px-6 text-center border-t" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
        <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--gradient-start)' }}></div>
        <p className="text-sm mt-4" style={{ color: 'var(--color-text-secondary)' }}>
          {t(i18n.footer.copyright)}
        </p>
      </footer>
    </div>
  );
}
