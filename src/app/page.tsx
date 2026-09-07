import { getTranslations } from 'next-intl/server';
import AccessCodeForm from '@/components/access-code-form';
import { i18n } from '@/i18n/keys';

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            {t(i18n.landing.title)}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">{t(i18n.landing.form.title)}</h1>
            <p className="card-subtitle">
              {t(i18n.landing.subtitle)}
            </p>
          </div>
          <AccessCodeForm />
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text">
          {t(i18n.footer.copyright)}
        </p>
      </footer>
    </div>
  );
}
