import '@/styles/global.css';
// Ensure plugins register to areas on import
import '@/core/bootstrap';

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { DemoBadge } from '@/components/DemoBadge';
import { getAreaComponents } from '@/core/areaManager';
import { AllLocales } from '@/utils/AppConfig';

const ThemeHeader = dynamic(() => import('@/components/ThemeHeader'), { ssr: false });

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={props.params.locale} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        {/* PRO: Dark mode support for Shadcn UI */}
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <div className="mx-auto max-w-screen-xl px-3">
            {/* Theme-aware header (loads from src/themes/<theme>/Header.tsx) */}
            <div>
              <ThemeHeader />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,300px]">
              <main>{props.children}</main>
              <aside className="space-y-4">
                {getAreaComponents('sidebar').map(c => (
                  <div key={c.id ?? Math.random()}>{c.render()}</div>
                ))}
              </aside>
            </div>
          </div>

          <DemoBadge />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
