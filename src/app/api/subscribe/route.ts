import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Need a valid email' },
        { status: 400 }
      );
    }

    // Check for duplicates
    const exists = await kv.sismember('subscribers', email);
    if (exists) {
      return NextResponse.json(
        { error: 'Already subscribed' },
        { status: 400 }
      );
    }

    // Add subscriber to set
    await kv.sadd('subscribers', email);

    // Store timestamp
    await kv.hset(`subscriber:${email}`, {
      email,
      timestamp: new Date().toISOString(),
    });

    console.log('New subscriber:', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: "Didn't work. Try again?" },
      { status: 500 }
    );
  }
}
