import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Shiphaus - Build in a Day';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-2px',
            marginBottom: 16,
          }}
        >
          Shiphaus
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#FF6B35',
            fontWeight: 600,
          }}
        >
          Build in a Day
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
            marginTop: 24,
          }}
        >
          New York &middot; Chicago &middot; Boulder &middot; Malaysia
        </div>
      </div>
    ),
    { ...size },
  );
}
