# Nitin Kumar — Portfolio

One Next.js 16 app, two experiences layered on the same URL.

`/` server-renders the complete, indexable portfolio. On top of it, **Nitin OS** boots as a
client-only overlay — a desktop environment with a boot sequence, resizable windows, a terminal,
a voice assistant and 16 apps. Leaving the OS is remembered, so later visits go straight to the
written page. Crawlers only ever see the page, never the overlay.

## Routes

| Route | Rendering | Purpose |
| --- | --- | --- |
| `/` | Static | Landing: hero, featured work, experience, capabilities, services, FAQ, contact |
| `/projects` | Static | All 17 projects, client-filtered but fully server-rendered |
| `/projects/[slug]` | SSG (17 pages) | Per-project case study: problem → what I built → outcome |
| `/experience` | Static | Full career detail with achievement-level breakdown |
| `/resume` | Static | HTML résumé + PDF download |
| `/os` | Static shell + client app | Nitin OS on its own URL |
| `/api/ask-nitin` | Dynamic | AI assistant (streaming + JSON) |
| `/api/weather` | Dynamic | Live weather for the OS Weather app |

`/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` and `/opengraph-image` are all generated.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev
```

### Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes, in production** | Canonical origin, no trailing slash. Drives canonical tags, Open Graph URLs, `sitemap.xml`, `robots.txt` and every JSON-LD `@id`. If unset the deployed site advertises `http://localhost:3000`. |
| `OPENAI_API_KEY` | For the assistant | Server-only. Never prefix with `NEXT_PUBLIC_`. |
| `OPENAI_MODEL` | No | Defaults to `gpt-5.6-luna`. |

## Content

All written content lives in two files — no copy is hard-coded in components:

- `src/data/data.jsx` — facts: contact details, education, projects, tech lists.
- `src/data/content.js` — narrative: positioning, career achievements, per-project case-study copy, capabilities, services, FAQ.

`src/data/nitinProfile.js` composes both into the single knowledge document handed to the AI assistant, so the assistant and the pages can never drift apart. Every claim there traces back to `Nitin_Resume.tex`.

Adding a project: add it to `personalDataObj.projects`, then add a matching entry (keyed by title) to `projectNarratives` in `content.js`. It automatically appears in the grid, gets a static case-study page, enters the sitemap and joins the assistant's knowledge base.

## Ask Nitin assistant

`POST /api/ask-nitin`

```jsonc
{ "question": "…", "history": [], "stream": true }  // stream:true → text/plain token stream
```

Layered before any model call: per-IP rate limit (30 / 10 min), length caps, control-character stripping, prompt-injection term matching, and a topic gate — so off-topic and hostile input never reach the API.

## SEO

Person / WebSite / ProfilePage / ItemList / FAQPage / BreadcrumbList / CreativeWork JSON-LD, per-route canonicals, generated OG cards, and fonts self-hosted via `next/font`.

## Nitin OS

- **Windows** — drag, resize from any of eight edges, snap to half-screen or maximise by dragging to an edge.
- **Nitin Voice** (`⌘J`) — speech recognition and synthesis. Local intents ("open projects", "switch to
  light mode") run instantly; everything else streams from `/api/ask-nitin` and is read aloud.
- **Résumé app** — the live résumé with ten languages and dark/light, plus the verified PDF.
- **Terminal** — `help`, `neofetch`, `ls`, `skills`, `experience`, `projects`, `cat <project>`,
  `open <app>`, `hire`. Arrow keys walk history.
- **Phone layout** (≤760px) — home screen of app icons, full-screen app sheets that swipe down to
  dismiss, and a thumb-reachable control bar.

Every app reads from `src/data/content.js`, so the OS and the website can never disagree.

## Theme & language

Every surface — site, nav, footer, chat widget, résumé and the OS — supports **dark / light /
system** and **10 languages** (English, हिन्दी, العربية, Español, Français, Deutsch, Português,
日本語, 한국어, 中文). Arabic switches the whole document to RTL.

- Preference lives in `nk-site-prefs` and is applied by a blocking script in `<head>` *before*
  first paint, so light mode never flashes dark.
- `?lang=` and `?theme=` make any page shareable in a specific language:
  `/projects?lang=hi&theme=light`.
- **SSR always renders English + dark.** That is deliberate — it is the HTML search engines index,
  and it means there is no hydration mismatch. Preferences apply immediately after mount.
- Translated: navigation, headings, labels, buttons, hero, assistant chrome.
  Not translated: project case studies, achievement bullets, FAQ answers — dense technical claims
  drawn from the verified résumé. A `technicalNote` says so in the reader's language.

Strings live in `src/data/siteI18n.js` (site) and `src/data/resumeI18n.js` (résumé + language list).
Missing keys fall back to English automatically.

## Résumé

`/resume` renders English + dark on the server (that is what gets indexed) and restores the
visitor's stored preference after hydration. `?lang=` and `?theme=` make it shareable —
`/resume?lang=ja&theme=light` — and Arabic switches the document to RTL.
