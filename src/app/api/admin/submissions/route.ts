import { NextRequest, NextResponse } from 'next/server';
import { getPendingSubmissions, getSubmissionsByEvent } from '@/lib/redis-data';

export async function GET(request: NextRequest) {
  try {
    const eventId = request.nextUrl.searchParams.get('event');

    if (eventId) {
      const submissions = await getSubmissionsByEvent(eventId);
      return NextResponse.json(submissions);
    }

    const submissions = await getPendingSubmissions();
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
