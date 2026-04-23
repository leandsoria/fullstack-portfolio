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
    default: 'Leandro Soria — Senior Front-End Engineer & CMS Architect',
    template: '%s — Leandro Soria',
  },
  description:
    "Senior front-end engineer and CMS architect building production marketing sites for international brands. Five years, 100+ sites shipped, RealTrends Best Design 2022, HubSpot certified.",
  applicationName: 'Leandro Soria — Portfolio',
  authors: [{ name: 'Leandro Soria', url: SITE_URL }],
  creator: 'Leandro Soria',
  publisher: 'Leandro Soria',
  keywords: [
    'Leandro Soria', 'front-end engineer', 'CMS architect', 'Senior FE',
    'HubSpot CMS', 'Webflow', 'WordPress', 'Next.js', 'React', 'TypeScript',
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
    title: 'Leandro Soria — Senior Front-End Engineer & CMS Architect',
    description: "Building production websites for international brands. Five years, 100+ sites, a standard that doesn't bend.",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Leandro Soria — Senior Front-End Engineer & CMS Architect' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leandro Soria — Senior Front-End Engineer & CMS Architect',
    description: 'Building production websites for international brands.',
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
      jobTitle: 'Senior Front-End Engineer & CMS Architect',
      email: 'mailto:hello@leandrosoria.dev',
      address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
      sameAs: [
        'https://www.linkedin.com/in/leandro-d-soria/',
        'https://github.com/leandsoria',
      ],
      knowsAbout: ['React', 'Next.js', 'TypeScript', 'HubSpot CMS', 'Webflow', 'WordPress', 'Sanity', 'Astro', 'Tailwind CSS'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Leandro Soria — Portfolio',
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
