'use client';

import dynamic from 'next/dynamic';

/**
 * The Terminal is a fully-interactive client experience (Lenis smooth-scroll, scoped cursor,
 * scroll tracking, viewport observers). It depends on `window` from the first render, so we
 * disable SSR for the component — but the document `<head>` (title, meta, OG, Twitter, JSON-LD)
 * still server-renders from layout.tsx, which is what SEO crawlers index.
 */
const TerminalVariantV2 = dynamic(
  () => import('@/components/TerminalPlus').then((m) => m.TerminalVariantV2),
  { ssr: false },
);

export default function HomePage() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#0b0b0d' }}>
      <TerminalVariantV2 />
    </div>
  );
}
