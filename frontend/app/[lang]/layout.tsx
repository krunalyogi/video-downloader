import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { getDictionary } from "@/dictionaries";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kliptify | Free Video Downloader & Creator Tools",
  description: "Download videos from Instagram, TikTok, YouTube, Facebook, Pinterest, Reddit and 20+ platforms. Free, no watermark, no login required.",
  manifest: '/manifest.json',
  metadataBase: new URL('https://kliptify.com'),
  openGraph: {
    title: 'Kliptify | Free Video Downloader & Creator Tools',
    description: 'Download from 20+ platforms — Instagram, TikTok, YouTube, Facebook, Reddit & more.',
    type: 'website',
    siteName: 'Kliptify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kliptify | Free Video Downloader',
    description: 'Download from 20+ platforms for free. No watermark, no login.',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="google-site-verification" content="NSTBsW3PX_q-rN_cra4pBxw1D_uFG8FZx-PTh61MG-8" />
        {/* PWA Service Worker */}
        <Script id="sw-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').then(r => console.log('SW registered', r.scope)).catch(e => console.log('SW error', e)); }`}
        </Script>
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-purple-300 selection:text-purple-900 bg-[#FAFAFA] dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <Navbar dict={dict} />

        <main className="flex-grow pb-16">
          {children}
        </main>

        <Footer dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
