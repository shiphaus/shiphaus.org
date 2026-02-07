import { NextRequest, NextResponse } from 'next/server';
import { getAllEvents, createEvent } from '@/lib/redis-data';
import { Event } from '@/types';

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, chapterId, date, location, lumaUrl, imageUrl } = body;

    if (!title || !chapterId || !date || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const event: Event = {
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      chapterId,
      date,
      location,
      builderCount: 0,
      projectCount: 0,
      status: 'upcoming',
      lumaUrl: lumaUrl || undefined,
      imageUrl: imageUrl || undefined,
    };

    await createEvent(event);
    return NextResponse.json(event);
  } catch (error) {
    console.error('Event create error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
