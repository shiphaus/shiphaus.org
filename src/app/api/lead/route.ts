import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Check if we're in development mode (no real Upstash credentials)
const isDevelopment =
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.UPSTASH_REDIS_REST_URL.includes('your_url_here') ||
  process.env.UPSTASH_REDIS_REST_TOKEN.includes('your_token_here');

// Only initialize Redis if we have real credentials
let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

if (!isDevelopment) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
  });
}

interface LeadApplication {
  id: string;
  name: string;
  email: string;
  city: string;
  twitter: string;
  linkedin: string;
  whatYouBuild: string;
  why: string;
  whoYouInvite: string;
  timestamp: string;
  [key: string]: string;
}

const sanitize = (str: string | undefined, maxLen: number = 500): string => {
  if (!str) return '';
  return str.trim().slice(0, maxLen);
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (skip in development)
    if (!isDevelopment && ratelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

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

    // Sanitize application data
    const applicationData: LeadApplication = {
      id,
      name: sanitize(name, 100),
      email: sanitize(email.toLowerCase(), 254),
      city: sanitize(city, 100),
      twitter: sanitize(twitter, 100),
      linkedin: sanitize(linkedin, 200),
      whatYouBuild: sanitize(whatYouBuild, 500),
      why: sanitize(why, 1000),
      whoYouInvite: sanitize(whoYouInvite, 500),
      timestamp: new Date().toISOString(),
    };

    if (isDevelopment) {
      // Development mode: just log to console
      console.log('📝 [DEV MODE] Lead application received:');
      console.log(JSON.stringify(applicationData, null, 2));
      console.log('💡 Set up Upstash Redis credentials to enable real storage');
    } else if (redis) {
      // Check for duplicate email (production only)
      const isDuplicate = await redis.sismember('lead_emails', email.toLowerCase());
      if (isDuplicate) {
        return NextResponse.json(
          { error: 'Email already submitted' },
          { status: 400 }
        );
      }

      // Store using pipeline for efficiency
      const pipeline = redis.pipeline();
      pipeline.hset(id, applicationData);
      pipeline.rpush('lead_applications', id);
      pipeline.sadd('lead_emails', email.toLowerCase());
      await pipeline.exec();
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Lead application error:', error);
    return NextResponse.json(
      { error: "Didn't work. Try again?" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.ADMIN_API_KEY}`;

    if (!process.env.ADMIN_API_KEY || authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (isDevelopment) {
      // Development mode: return empty array
      console.log('📝 [DEV MODE] No applications stored (development mode)');
      return NextResponse.json({ applications: [], note: 'Development mode - no storage' });
    }

    if (!redis) {
      return NextResponse.json({ applications: [] });
    }

    // Get all application IDs
    const ids = await redis.lrange('lead_applications', 0, -1);

    if (!ids || ids.length === 0) {
      return NextResponse.json({ applications: [] });
    }

    // Fetch all applications using pipeline (fixes N+1 problem)
    const pipeline = redis.pipeline();
    ids.forEach(id => pipeline.hgetall(id));
    const results = await pipeline.exec();

    const applications = results
      .filter(result => result && typeof result === 'object')
      .map(data => data as LeadApplication);

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
