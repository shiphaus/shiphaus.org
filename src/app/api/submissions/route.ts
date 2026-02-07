import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSubmissionsByUser } from '@/lib/redis-data';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const submissions = await getSubmissionsByUser(session.user.email);
  return NextResponse.json(submissions);
}
