import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Leandro Soria | Web Engineer for Marketing Teams';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0b0b0d',
          color: '#ece8dd',
          fontFamily: '"Inter", system-ui, sans-serif',
          backgroundImage:
            'linear-gradient(rgba(236,232,221,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,221,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#807b72', letterSpacing: 2 }}>
          <span>leandrosoria.dev / portfolio / v03</span>
          <span>6 YEARS · 100+ SITES</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{ display: 'inline-flex', padding: '6px 14px', border: '1px solid rgba(236,232,221,0.18)', borderRadius: 6, fontSize: 18, letterSpacing: 1, alignSelf: 'flex-start' }}>
            WEBFLOW / WORDPRESS / HUBSPOT CMS / SHOPIFY · AI-FIRST
          </span>
          <div style={{ fontSize: 96, fontWeight: 500, lineHeight: 1.0, letterSpacing: -3.5 }}>
            Web Engineer<br />
            <span style={{ color: '#807b72' }}>for</span> Marketing Teams.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 18, color: '#807b72' }}>
          <span>Leandro Soria</span>
          <span>Buenos Aires, AR · GMT-3, full US overlap</span>
        </div>
      </div>
    ),
    size,
  );
}
