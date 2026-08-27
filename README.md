# Voidworks

Next.js + TypeScript front-end met schone routes (`/`, `/login`, `/prijzen`, enz.), custom UI-componenten en Supabase-integratie.

## Lokaal starten

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase koppelen

1. Maak een nieuw Supabase-project.
2. Open **SQL Editor** en voer `supabase/schema.sql` uit.
3. Ga naar **Project Settings > API** en kopieer Project URL + anon/publishable key.
4. Zet die in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Zet in Supabase Auth de Site URL op je uiteindelijke domein en voeg lokaal `http://localhost:3000/auth/callback` toe als redirect URL.

## Wat Supabase doet

- Auth: login en registratie.
- `profiles`: klantprofielen.
- `inquiries`: contactaanvragen.
- `projects`: projecten per klant.
- `support_tickets`: supportverzoeken.

RLS staat in het schema aan. Klanten kunnen alleen hun eigen project/ticketdata zien.

## Voor livegang

Voeg rate limiting of Turnstile toe aan het publieke contactformulier, controleer privacy/voorwaarden juridisch en configureer e-mailtemplates/domeinen in Supabase.
