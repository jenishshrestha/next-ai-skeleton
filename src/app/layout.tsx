import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { defaultMetadata } from '@/shared/config/seo';
import { siteConfig } from '@/shared/config/site';
import { Toaster } from '@/shared/components/ui/sonner';
import { ThemeProvider } from '@/shared/providers/theme-provider';
import { SessionProvider } from '@/shared/providers/session-provider';
import { QueryProvider } from '@/shared/providers/query-provider';
import { auth } from '@/shared/lib/auth';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon`,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <SessionProvider session={session}>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
              {children}
              <Toaster richColors />
            </SessionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
