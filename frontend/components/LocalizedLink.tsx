'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n.config';

interface LocalizedLinkProps extends React.ComponentProps<typeof Link> {
    href: string;
}

export function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
    const pathname = usePathname();
    
    // Extract the current locale from the pathname
    const currentLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ) || defaultLocale;

    // If the href already has a locale, don't double-prefix it
    const hasLocalePrefix = locales.some(
        (locale) => href.startsWith(`/${locale}/`) || href === `/${locale}`
    );

    const localizedHref = hasLocalePrefix
        ? href
        : `/${currentLocale}${href.startsWith('/') ? '' : '/'}${href}`;

    return (
        <Link href={localizedHref} {...props}>
            {children}
        </Link>
    );
}
