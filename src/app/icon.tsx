import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0b0b0d', color: '#ece8dd',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700, fontSize: 14, letterSpacing: -0.5,
          borderRadius: 6,
        }}
      >
        LS
      </div>
    ),
    size,
  );
}
