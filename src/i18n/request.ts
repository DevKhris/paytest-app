import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { routing } from './config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || routing.defaultLocale;

  return {
    locale,
    messages: (await import(`@/translations/${locale}.json`)).default,
  };
});
