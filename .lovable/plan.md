# Plan

## 1. Live-tracking skill progress (+1% twice/week, capped at 100%)

Instead of hardcoded percentages, compute each skill's level from a per-skill `startDate` + `startLevel`. Formula: `level = min(100, startLevel + floor(weeksElapsed * 2))`, where a "week" = 7 days and increments happen on fixed weekdays (Mon + Thu) so growth is deterministic and identical across visits.

- Edit `src/routes/index.tsx`: replace the `skills` array with objects `{ name, startLevel, startDate }`, and a `computeLevel()` helper. Values passed to `<SkillBar />` are computed at render time.
- Anchor `startDate` to today so the currently displayed levels (72, 65, 60, 80, 68) remain the starting point, then tick up over time.
- No backend needed — deterministic from the current date.

## 2. Light / Dark mode toggle

- Add a `ThemeToggle` component (`src/components/ThemeToggle.tsx`) using a shadcn `Button` with sun/moon icons from `lucide-react`. Store choice in `localStorage` and toggle `.dark` class on `<html>`.
- Add a small pre-hydration script in `src/routes/__root.tsx` (via `scripts` or inline `<script>` in the shell) to set the class before paint and avoid flash.
- Mount `<ThemeToggle />` fixed top-right on the home page.
- Extend `src/styles.css` with a `.dark` block overriding tokens:
  - Background: deep near-black with slight purple tint
  - Foreground: near-white
  - Primary: vibrant fuchsia pink
  - Accent: purple
  - Ring / chart highlights: turquoise
  - `--old-pink` remapped to fuchsia so existing `text-old-pink` usage (H1, quote) looks great in dark mode too.

## 3. Hover effects

- **Buttons** (ThemeToggle + any `<Button>`): scale-up + shadow + color transition via Tailwind (`hover:scale-105 hover:shadow-lg transition-all`).
- **"What I Want to Learn" cards**: lift + border glow + icon bounce (`hover:-translate-y-1 hover:border-primary hover:shadow-xl`).
- **All icons on the page** (section-card icon badges, learning goal emojis, skill list bullets `▸`, language tags): add `transition-transform hover:scale-125 hover:rotate-6` (or similar per icon type). Wrap emoji spans so hover targets each icon individually.

## 4. Fixes

### Heading & landmark
- `src/routes/index.tsx`: change H1 to `Shabanu Aliahmad — Skill Growth Tracker` (add tagline styling so name stays visually dominant), matching the `<title>`.
- Wrap the page body in a single `<main>` element.

### robots.txt
- Create `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://skill-canvas-charm.lovable.app/sitemap.xml
  ```

### sitemap.xml
- Create `src/routes/sitemap[.]xml.ts` server route returning XML for `/` with `BASE_URL = "https://skill-canvas-charm.lovable.app"`.

### llms.txt
- Create `public/llms.txt` summarizing: site purpose (personal skill growth tracker), owner (Shabanu Aliahmad), key sections, tech stack, and a link back to `/`.

### Structured data (JSON-LD)
- In `src/routes/index.tsx` `head()`, add a `scripts` entry with `application/ld+json` `Person` schema: name, description, `knowsAbout` (HTML/CSS/JS/Python/Java/Canva), `url`.

### Google Search Console
- Not something I can wire up in code alone — will call this out in the closing message and suggest connecting via the connectors flow / adding a verification meta tag once they have one.

## Files touched
- `src/routes/index.tsx` (H1, `<main>`, computed skills, hover classes, JSON-LD, ThemeToggle mount)
- `src/components/ThemeToggle.tsx` (new)
- `src/components/SectionCard.tsx`, `SkillTag.tsx`, `SkillBar.tsx` (hover polish)
- `src/routes/__root.tsx` (pre-hydration theme script)
- `src/styles.css` (`.dark` tokens, hover transitions)
- `src/routes/sitemap[.]xml.ts` (new)
- `public/robots.txt` (new)
- `public/llms.txt` (new)

## Out of scope / needs you
- Connecting Google Search Console: requires you to verify the domain. I'll add a placeholder meta verification hook if you paste your GSC token, or you can connect through Lovable's connectors panel.
