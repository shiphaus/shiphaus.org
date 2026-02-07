import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const isAdminApi = req.nextUrl.pathname.startsWith('/api/admin');

  if (!isAdminApi) {
    return NextResponse.next();
  }

  // Check for NextAuth session cookie (don't import auth — Edge runtime can't fetch discovery docs)
  const token =
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('authjs.session-token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify session and admin status via internal API call
  const sessionUrl = new URL('/api/auth/session', req.url);
  try {
    const res = await fetch(sessionUrl, {
      headers: { cookie: req.headers.get('cookie') || '' },
    });

    if (!res.ok) throw new Error('session fetch failed');

    const session = await res.json();
    const isAdmin = session?.user?.isAdmin === true;

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
