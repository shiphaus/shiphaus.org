import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request: NextRequest) {
  try {
    // Get all subscriber emails from the set
    const emails = await kv.smembers('subscribers');

    // Get details for each subscriber
    const subscribers = await Promise.all(
      emails.map(async (email) => {
        const details = await kv.hgetall(`subscriber:${email}`);
        return details;
      })
    );

    // Sort by timestamp (newest first)
    subscribers.sort((a: any, b: any) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return NextResponse.json({
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
