import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/config';

export default async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const urlLocale = searchParams.get('locale');
  const existingCookie = request.cookies.get('locale')?.value;

  const isValidLocale = (locale: string | null): locale is 'es' | 'en' =>
    locale !== null && routing.locales.includes(locale as 'es' | 'en');

  if (isValidLocale(urlLocale)) {
    const response = NextResponse.redirect(new URL(pathname, request.url));
    response.cookies.set('locale', urlLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  if (!existingCookie) {
    const response = NextResponse.next();
    response.cookies.set('locale', routing.defaultLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
