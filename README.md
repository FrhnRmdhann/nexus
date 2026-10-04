# NEXUS — Phase 1 (Foundation)

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind 3 · PostgreSQL · Prisma · sesi JWT (jose) + bcrypt.

## Menjalankan
```bash
npm install
cp .env.example .env                 # isi AUTH_SECRET: openssl rand -base64 32
docker compose up -d                 # PostgreSQL lokal (atau pakai DATABASE_URL milikmu)
npx prisma migrate dev --name init   # membuat tabel + prisma/migrations (commit folder ini)
npm run dev                          # http://localhost:3000
```
User pertama: buka `/register`, isi form, otomatis login ke `/dashboard`.

Cek kualitas: `npm run typecheck && npm run lint`. Produksi: `npm run db:deploy && npm run build`.

## Arsitektur
`app/actions` (controller + validasi Zod) → `services` (logika bisnis) → `lib/db` (Prisma).
User ID selalu dari sesi server (`lib/session.ts`), tidak pernah dari client.
Middleware = lapis proteksi 1, `(app)/layout.tsx` = lapis 2.

## Belum ada di Phase 1
Rate limiting login, test otomatis (Phase 6), focus trap penuh pada drawer mobile, sinkronisasi tema dari DB di perangkat baru,
dan semua modul (halaman modul berisi penanda "belum diimplementasikan").
