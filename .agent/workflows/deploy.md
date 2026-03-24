---
description: How to deploy the application to Vercel
---

# Deployment Workflow

1. Ensure all changes are committed and pushed to your git repository.
// turbo
2. Install the Vercel CLI if you haven't already:
```bash
npm i -g vercel
```
3. Link your project to Vercel (if not already linked):
```bash
vercel link
```
4. Deploy the project to preview/production:
```bash
vercel --prod
```
5. Run Prisma migrations if necessary:
```bash
npx prisma db push
```
