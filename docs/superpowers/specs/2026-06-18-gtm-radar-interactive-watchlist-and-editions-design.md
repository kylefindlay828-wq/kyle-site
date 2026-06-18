# GTM Radar — interactive watchlist web + editions picker

**Date:** 2026-06-18
**Scope:** Two related interactions added to the **GTM Radar** section (`src/components/RadarProof.astro`) of the homepage. No changes to information architecture, routing, or copy intent.

---

## Goal

Make the two strongest stat tiles in the GTM Radar section interactive, to turn flat numbers into proof you can explore:

1. **"63 companies tracked"** → a click-to-expand **branching-tree web** of the full watchlist (all 63 companies across 6 sectors), shown in-page with the rest of the section dimmed for focus. Purpose is **scope/showpiece**, not a filtering tool.
2. **"4 editions published"** → an **obviously-interactive picker** that lists the four weekly editions and opens the chosen PDF directly.

Both reuse real data already in the repo. No fabricated content.

---

## Data sources (already in repo)

- `src/content/watchlist.ts` — `watchlist` (6 buckets, 63 companies, each `{name, domain, addedW17?}`) and `watchlistTotal`.
- `src/content/briefings.ts` — `briefings` (4 editions: `{week, year, dateRange, summary, pdf}`).
- PDFs in `public/briefings/`.

Sector colors reuse the `--color-cat-1…6` tokens already added to `src/styles/global.css`.

---

## Feature 1 — Watchlist web (branching tree)

### Trigger & states
- **Desktop (≥ 768px):** the "63 companies tracked" tile is a button. **Hover** = affordance cue only (pointer cursor, subtle lift, faint "explore →" hint). **Click** = expand.
- On expand:
  - The tree panel unfolds **in place** inside the GTM Radar section (in normal page flow, pushing content below down).
  - The **rest of the page dims to ~18% opacity** (a spotlight overlay or a class on the section/page wrapper) and is non-interactive while open. The tile + tree panel stay at full opacity.
  - Connector **lines animate outward** from the central "63" hub to the six sector branches (staggered, transform/opacity or SVG stroke-dashoffset; ≤ ~600ms total).
- **Close:** `Esc`, click outside the panel, or the panel's `✕`. Returns focus to the tile.

### Layout (desktop)
- Left: circular **hub** — "63 / COMPANIES" on the accent fill.
- A vertical **spine** + six **branch rows**, one per sector in `watchlist` order. Each row:
  - Sector node: color dot (`--color-cat-N`) + sector label + live count.
  - Companies: every company name in that bucket as small mono chips, wrapping.
- Panel header label: "63 companies · 6 sectors · the full watchlist".
- **No Week-17 / "new" highlighting** (explicitly dropped — avoids raising a question the page doesn't answer; the methodology PDF covers maintenance).

### Mobile (< 768px)
- The full horizontal tree is **not** rendered. The existing **coverage bar + sector legend** already in `RadarProof.astro` remains the mobile representation of the watchlist (it lists all 6 sectors with counts).
- The "63 companies" tile shows **no expand cue** on mobile and is not a tree trigger. Nothing looks broken; the desktop tree is a progressive enhancement.

### Accessibility & motion
- Tile is a real `<button>` with `aria-expanded`. Expanded panel uses `role="dialog"` + `aria-modal="true"` semantics with focus moved into it, focus trapped while open, focus returned to the tile on close, `Esc` to close.
- `prefers-reduced-motion: reduce` → no line-draw animation; panel and content appear instantly (opacity only, ≤ 150ms). Dim still applies (it's state, not motion).
- Animate only `transform` / `opacity`; use the existing `--ease-out` token.

---

## Feature 2 — Editions picker

### Trigger & states
- The "4 editions published" tile is a button.
- **Resting cue:** the four tick-marks beneath the "4" **pulse sequentially** on a slow loop (~2.4s, color animates `--color-rule` → `--color-accent`, staggered ~0.2s) to signal interactivity. Pointer cursor; subtle lift on hover.
- **Open:** hover (desktop) or tap (mobile) opens a **popover** anchored to the tile.
  - Header: "GTM Radar · open an edition".
  - Rows newest-first (Week 17 → 14): `Week NN` · `dateRange` · `Open PDF →`, from `briefings`.
- **Action:** clicking a row opens that edition's PDF in a new tab (`target="_blank" rel="noopener"`) — same behavior as the Proof & archive cards. (Decision: **straight to the PDF** — no inline preview.)

### Accessibility & motion
- Button with `aria-expanded` / `aria-haspopup`; popover keyboard-navigable (arrow/tab through rows, `Esc` closes, focus returns to tile). On touch, tap toggles (no hover dependency).
- `prefers-reduced-motion: reduce` → tick pulse disabled (static ticks); popover appears instantly.

---

## Implementation notes

- **Astro components** (no new runtime deps; pure CSS/SVG + small inline `<script>` for open/close + keyboard, consistent with the existing Nav/SignalCard scripts):
  - New `src/components/WatchlistTree.astro` — renders the tile button + the tree panel from `watchlist`.
  - New `src/components/EditionsPicker.astro` — renders the tile button + popover from `briefings`.
  - `src/components/RadarProof.astro` — swap the two static tiles for these components; keep the other two tiles and the coverage bar unchanged.
  - Shared styles in `src/styles/global.css` (reuse tokens; add only named tokens if needed, per the project's token discipline).
- **Dim mechanism:** a class toggled on the section (or a lightweight overlay within the section) that fades sibling content to ~18% and blocks pointer events while the tree is open. Must not cause horizontal scroll or layout shift.
- **Honest content:** all names/weeks/dates come from the data files; counts derive from the data (no hardcoded totals that can drift).

---

## Out of scope (deferred)

- PDF inline preview / "non-downloadable" rendering (explicitly deferred — straight-to-PDF chosen).
- A full mobile version of the tree (mobile keeps the coverage bar).
- Filtering/search within the watchlist (this is a showpiece, not a tool).
- Changes to the Proof & archive section.

---

## Verification

- `npm run build` clean; local preview via `astro dev`.
- Manual checks: tree opens/closes via click, `Esc`, click-outside, `✕`; focus returns to tile; page dims and restores. Editions popover opens on hover (desktop) and tap (mobile); each row opens the correct PDF.
- Responsive at 320 / 375 / 768 / desktop — no horizontal scroll; mobile shows coverage bar, not the tree.
- `prefers-reduced-motion: reduce` disables the line-draw and tick pulse.
