import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from './i18n.config';

function getLocale(request: NextRequest): string {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    // @ts-ignore locales are readonly
    const match = matchLocale(languages, locales, defaultLocale);
    return match;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    const publicFiles = [
        '/favicon.ico',
        '/icon.png',
        '/manifest.json',
        '/sw.js',
        '/robots.txt',
        '/sitemap.xml', // Next.js dynamic sitemap output
    ];

    if (publicFiles.some(file => pathname.startsWith(file))) {
        return NextResponse.next();
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // redirect to `/en/...`
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${request.nextUrl.search}`,
                request.url
            )
        );
    }

    return NextResponse.next();
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image).*)'],
};
