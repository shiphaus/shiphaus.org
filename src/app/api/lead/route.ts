import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, city, twitter, linkedin, whatYouBuild, why, whoYouInvite } = body;

    // Validate required fields
    if (!name || !email || !city || !whatYouBuild || !why) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate unique ID
    const id = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store application data
    const applicationData = {
      id,
      name,
      email,
      city,
      twitter: twitter || '',
      linkedin: linkedin || '',
      whatYouBuild,
      why,
      whoYouInvite: whoYouInvite || '',
      timestamp: new Date().toISOString(),
    };

    await kv.hset(id, applicationData);
    await kv.rpush('lead_applications', id);

    console.log('New lead application:', id);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Lead application error:', error);
    return NextResponse.json(
      { error: "Didn't work. Try again?" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all application IDs
    const ids = await kv.lrange('lead_applications', 0, -1);

    if (!ids || ids.length === 0) {
      return NextResponse.json({ applications: [] });
    }

    // Fetch each application
    const applications = await Promise.all(
      ids.map(async (id) => {
        const data = await kv.hgetall(id as string);
        return data;
      })
    );

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
