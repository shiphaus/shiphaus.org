import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Redirect old /chapter/ URLs to new flat structure
  const chapterEventMatch = path.match(/^\/chapter\/([^/]+)\/event\/([^/]+)$/);
  if (chapterEventMatch) {
    const [, chapterId, eventId] = chapterEventMatch;
    return NextResponse.redirect(new URL(`/${chapterId}/${eventId}`, req.url), 301);
  }

  const chapterMatch = path.match(/^\/chapter\/([^/]+)$/);
  if (chapterMatch) {
    const [, chapterId] = chapterMatch;
    return NextResponse.redirect(new URL(`/${chapterId}`, req.url), 301);
  }

  // Existing admin middleware below...
  const isAdminApi = path.startsWith('/api/admin');

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
  matcher: ['/api/admin/:path*', '/chapter/:path*'],
};
