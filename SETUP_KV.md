# Vercel KV Setup Instructions

## Once you have Vercel access:

### 1. Create KV Database in Vercel

Go to: Vercel Dashboard → Your Project → Storage → Create Database → KV (Upstash Redis)

Or: Vercel Dashboard → Integrations → Add Upstash Redis

### 2. Copy Environment Variables

Vercel will automatically add these to your project:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. For Local Development

Copy the env vars from Vercel to `.env.local`:

```bash
# In Vercel Dashboard:
# Settings → Environment Variables → Copy each one

# Then create .env.local with those values
```

Or use:
```bash
vercel env pull .env.local
```

### 4. Test Locally

```bash
npm run dev
```

Submit an email at http://localhost:3000

View subscribers at:
```bash
curl http://localhost:3000/api/subscribers
```

### 5. Deploy

```bash
git push
```

Vercel will auto-deploy with the KV environment variables.

## View Subscribers

**In Production:**
```bash
curl https://shiphaus.org/api/subscribers
```

**In Vercel Dashboard:**
Go to: Storage → Your KV Database → Data Browser

Look for:
- `subscribers` (set of all emails)
- `subscriber:{email}` (details for each subscriber)

## Done!

Subscribers will now persist across all deployments.
