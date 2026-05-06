# Exotic Cloudz — Mobile Hookah Catering

Production booking site for **Exotic Cloudz** (San Antonio, TX). Vite + React + TypeScript + Tailwind. Public-facing pages: hero, packages, FAQ, contact, 3-step booking flow. Backend: Google Apps Script (logs to a Sheet + emails owner) with Formspree fallback.

---

## 1. Customize the business info

Open `src/data/business.ts` and replace the placeholders:

```ts
phoneDigits: '2105550123',           // ← your real number, digits only
phoneDisplay: '(210) 555-0123',      // ← your real number, formatted
instagramHandle: 'exoticcloudz',     // ← your real IG handle (no @)
instagramUrl: 'https://instagram.com/exoticcloudz',
```

That single file controls the nav, hero, footer, FAQ, and contact section.

## 2. Local development

```bash
npm install
cp .env.example .env.local
# Edit .env.local — paste your Apps Script URL and/or Formspree URL
npm run dev          # opens http://localhost:5173
```

## 3. Production build

```bash
npm run build        # outputs to dist/
npm run preview      # serve dist/ locally to smoke-test
```

---

## 4. Backend — Google Apps Script (primary) + Formspree (fallback)

You picked **both**: Apps Script is the primary write path; Formspree catches submissions if Apps Script is down.

### A. Set up Google Apps Script (15 min)

1. Create a Google Sheet. Add this header row:
   `Submitted At | Package | Date | Time | Name | Phone | Address | Flavors | Source | User Agent`
2. Open https://script.google.com → **New project**.
3. Paste the contents of `google-apps-script/Code.gs`.
4. Edit the constants at the top:
   - `SHEET_ID` — copy from the sheet URL: `docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
   - `OWNER_EMAIL` — already set to `aitest0203@gmail.com` (change if needed)
5. **Deploy → New deployment → type "Web app"**:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Authorize when prompted, then copy the deployment URL (ends in `/exec`).
7. That URL goes into `VITE_BOOKING_ENDPOINT`.

### B. Set up Formspree fallback (5 min)

1. Sign up at https://formspree.io (free tier: 50 submissions/month).
2. Create a new form. Copy the endpoint URL (`https://formspree.io/f/xxxxxxxx`).
3. That URL goes into `VITE_FORMSPREE_ENDPOINT`.

### Why Apps Script needs `Content-Type: text/plain`

Apps Script Web Apps reject CORS preflight (OPTIONS) requests. To stay in the "simple request" lane, the frontend posts JSON with `Content-Type: text/plain;charset=utf-8`. The script reads `e.postData.contents` and parses it with `JSON.parse`. **Do not change the Content-Type** — it's not a bug, it's the workaround.

---

## 5. Deploy to Cloudflare Pages (your chosen host)

### Option A — Direct upload (fastest path to live, ~5 min)

```bash
# 1. Install wrangler (Cloudflare CLI) globally
npm install -g wrangler

# 2. Build locally
npm run build

# 3. Authenticate with Cloudflare (browser flow)
wrangler login

# 4. Deploy the dist/ folder to a new Pages project
wrangler pages deploy dist --project-name=exotic-cloudz

# That's it — wrangler will print your live URL:
#   https://exotic-cloudz.pages.dev
```

### Option B — GitHub-connected (recommended for ongoing)

```bash
# 1. Push to GitHub
git remote add origin https://github.com/<your-user>/exotic-cloudz.git
git push -u origin main
```

Then in the Cloudflare dashboard:

1. **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub, pick the `exotic-cloudz` repo.
3. **Build settings**:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
4. **Environment variables** (Settings → Environment variables → Production):
   - `VITE_BOOKING_ENDPOINT` = your Apps Script `/exec` URL
   - `VITE_FORMSPREE_ENDPOINT` = your Formspree `/f/...` URL
5. **Save and Deploy**.

Every push to `main` redeploys automatically. Preview deploys are auto-created for every branch / PR.

### SPA routing

`public/_redirects` ships with `/* /index.html 200`, which tells Cloudflare Pages to serve `index.html` for all unknown routes. Required because this app uses client-side state for views (no React Router yet, but ready for it).

### Custom domain

In the Cloudflare Pages dashboard:

1. **Custom domains → Set up a custom domain**.
2. Enter `exoticcloudz.com` (or whatever you've registered).
3. Cloudflare auto-issues an SSL cert and updates DNS if your domain is on Cloudflare. If your registrar is elsewhere, follow the CNAME instructions shown.

---

## 6. Vercel deployment (alternative)

Repo also ships with a `vercel.json` if you'd rather use Vercel:

```bash
npm install -g vercel
vercel login
vercel link
vercel env add VITE_BOOKING_ENDPOINT production
vercel env add VITE_FORMSPREE_ENDPOINT production
vercel --prod
```

---

## 7. Project structure

```
.
├── google-apps-script/
│   └── Code.gs                # Booking receiver (Web App backend → Sheet + email)
├── public/
│   ├── Exotic Clouds.png      # Brand logo (referenced as /Exotic Clouds.png)
│   ├── _redirects             # SPA fallback for Cloudflare Pages / Netlify
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── BookingFlow.tsx    # 3-step package → date → details flow
│   │   ├── ContactStrip.tsx   # Phone, Instagram, email, hours, service area
│   │   ├── ExoticCloudzApp.tsx
│   │   ├── FAQ.tsx            # Public FAQ accordion
│   │   ├── Hero.tsx
│   │   └── SuccessView.tsx
│   ├── data/
│   │   ├── business.ts        # ★ phone, IG, email, hours — edit here
│   │   └── packages.tsx       # 3 package definitions
│   ├── lib/
│   │   └── submitBooking.ts   # POST → Apps Script (primary) → Formspree (fallback)
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── .env.example
├── index.html                 # SEO meta, OG tags, LocalBusiness JSON-LD
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json                # Vercel config (optional)
└── vite.config.ts
```

## 8. What customers see

- **Home** — hero with logo + "Book Reservation" CTA, package grid, FAQ, contact.
- **Booking** — 3-step flow: pick package → date/time → name/phone/address/flavors.
- **Success** — confirmation card with booking summary and "we'll text you" message.
- **Contact** — `tel:` and `mailto:` deep links so a single tap dials/emails on mobile.
- **Mobile-first** — designed phone-first; nav menu collapses on small screens.
