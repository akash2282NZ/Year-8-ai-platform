# NZ Year 8 AI Learning Platform — Classroom-Ready

Folders:
- `api/` — Express + Prisma (Postgres) + JWT auth + roles + Hugging Face tutor
- `web/` — Next.js App Router, login, student home, teacher & admin dashboards

## One‑Click Deploy Overview
- **Backend on Railway:** connects to free Postgres plugin
- **Frontend on Vercel:** set `NEXT_PUBLIC_API_URL` to your Railway URL
- **AI:** set `HUGGINGFACE_API_KEY` on Railway

## Quickstart (No Terminal Needed)
1. Create a new GitHub repo → Upload these folders.
2. On **Railway** → New Project → Deploy from GitHub → pick `/api` as root (Set service root to api/).
   - Add variables:
```
DATABASE_URL=postgresql://... (Railway Postgres)
HUGGINGFACE_API_KEY=your_hf_token
JWT_SECRET=change_me
PORT=8080
```
   - Open a Railway Shell and run:
```
npx prisma migrate deploy
npm run seed
```
3. On **Vercel** → New Project → pick `/web` as root (Set project root to web/).
   - Add env var:
```
NEXT_PUBLIC_API_URL=https://<your-railway-service>.up.railway.app
```
4. Visit your Vercel site → **Login** (try demo accounts below).

## Demo Accounts
- Admin: `admin@example.com` / `Admin@123`
- Teacher: `teacher@example.com` / `Teacher@123`
- Student: `student@example.com` / `Student@123`

## API Endpoints (selected)
- `POST /auth/register | /auth/login`
- `GET /lessons` (auth)
- `GET /worksheets/topic/:topicId` (auth)
- `POST /worksheets/submit` (auth) → updates difficulty level
- `GET /progress/me` (auth)
- `POST /tutor/hint` (auth) → Hugging Face

## Notes
- Seed includes NZ Year 8 coverage scaffold (Maths, Science, English). Extend content in `prisma/seed.js`.
- For mobile, the UI is responsive and works on Android phones.