# 🚀 Deployment Guide (Vercel + Neon + Prisma)

This guide explains how to deploy your Next.js app to Vercel and connect it to your Neon Postgres database, addressing the common challenges with serverless database connections.

## 1. Prepare Your Code
We have already added the necessary `postinstall` script to your `package.json`. This ensures Prisma Client is generated automatically during Vercel's build process.

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

## 2. Push to GitHub
Make sure your latest code is committed and pushed to your GitHub repository.

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 3. Deploy on Vercel

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `antigravity-ide-testing` repository.

## 4. Configure Environment Variables (CRITICAL STEP)

In the Vercel project setup screen (or under Settings > Environment Variables later), you must add your database connection string.

**The Challenge:** Serverless functions (like Next.js API routes) can open too many connections to the database, causing it to crash or reject connections.
**The Solution:** Use **Neon's Pooled Connection String**.

1.  Go to your [Neon Console](https://console.neon.tech).
2.  In the **Connection Details** widget, look for a checkbox or toggle that says **"Pooled connection"** (or look for the URL containing `pooler` or port `6543` instead of `5432` usually, though Neon handles this smartly).
    *   *Note: Neon's default connection string usually supports serverless well, but ensuring you use the pooled version is best practice.*
3.  Copy that connection string.
4.  In Vercel, add a new Environment Variable:
    *   **Name:** `DATABASE_URL`
    *   **Value:** `postgres://user:pass@...neondb?sslmode=require` (Paste your pooled string here)

## 5. Deploy
Click **Deploy**.

Vercel will:
1.  Install dependencies (`npm install`).
2.  Run `prisma generate` (via our `postinstall` hook).
3.  Build the Next.js app (`npm run build`).

## 6. Database Migrations (Production)
Since `prisma db push` updates the schema directly, you might want to run this manually from your local machine pointing to the production DB, or set up a proper migration workflow.

For now, since you are using `db push`:
1.  Ensure your local `.env` has the production DB URL (or use a separate `.env.production`).
2.  Run `npx prisma db push` locally to ensure the production database has the latest schema.

## Troubleshooting

### "PrismaClient is unable to run in Vercel"
*   **Cause:** The Prisma Client wasn't generated for the Linux environment Vercel uses.
*   **Fix:** The `postinstall` script we added fixes this.

### "Too many connections"
*   **Cause:** Serverless functions scaling up.
*   **Fix:** Ensure you are using the **Pooled Connection String** from Neon in your Vercel Environment Variables.

### "Module not found"
*   **Cause:** `node_modules` caching issues.
*   **Fix:** Redeploy with "Redeploy without cache" in Vercel.
