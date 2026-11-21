import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/main.scss';

const SITE_URL = 'https://leandrosoria.dev';

const inter = localFont({
  src: [
    { path: '../../public/fonts/inter-latin.woff2',     weight: '300 700', style: 'normal' },
    { path: '../../public/fonts/inter-latin-ext.woff2', weight: '300 700', style: 'normal' },
  ],
  variable: '--ls-font-body',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/jetbrains-mono-latin.woff2',     weight: '400 500', style: 'normal' },
    { path: '../../public/fonts/jetbrains-mono-latin-ext.woff2', weight: '400 500', style: 'normal' },
  ],
  variable: '--ls-font-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Leandro Soria | Web Engineer for Marketing Teams',
    template: '%s | Leandro Soria',
  },
  description:
    "Web engineer who owns the full web layer for US marketing teams: builds, integrations, tracking, migrations, hosting and performance on WordPress, Webflow, HubSpot CMS and Shopify. 6 years, AI-first with Claude Code.",
  applicationName: 'Leandro Soria | Portfolio',
  authors: [{ name: 'Leandro Soria', url: SITE_URL }],
  creator: 'Leandro Soria',
  publisher: 'Leandro Soria',
  keywords: [
    'Leandro Soria', 'web engineer', 'marketing web developer', 'web operations',
    'growth engineer', 'HubSpot CMS', 'Webflow', 'WordPress', 'Shopify', 'Claude Code',
    'Buenos Aires developer', 'portfolio',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Leandro Soria',
    title: 'Leandro Soria | Web Engineer for Marketing Teams',
    description: '6 years owning marketing websites for US companies, from build to hosting. AI-first with Claude Code.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Leandro Soria | Web Engineer for Marketing Teams' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leandro Soria | Web Engineer for Marketing Teams',
    description: '6 years owning marketing websites for US companies, from build to hosting. AI-first with Claude Code.',
    images: ['/opengraph-image'],
    creator: '@leandsoria',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0b0b0d' },
    { media: '(prefers-color-scheme: light)', color: '#f6f3ec' },
  ],
  colorScheme: 'dark light',
};

const personLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Leandro Soria',
      url: SITE_URL,
      jobTitle: 'Web Engineer',
      email: 'mailto:hello@leandrosoria.dev',
      address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
      sameAs: [
        'https://www.linkedin.com/in/leandro-d-soria/',
        'https://github.com/leandsoria',
      ],
      knowsAbout: ['WordPress', 'Webflow', 'HubSpot CMS', 'Shopify', 'Cloudflare', 'Google Tag Manager', 'GA4', 'Website migrations', 'Technical SEO', 'Claude Code'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Leandro Soria | Portfolio',
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
