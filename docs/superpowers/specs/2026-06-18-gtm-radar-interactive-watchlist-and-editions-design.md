# GTM Radar — interactive homepage enhancements

**Date:** 2026-06-18
**Scope:** Three interactions on the homepage: two on the **GTM Radar** section (`src/components/RadarProof.astro`), and one **page-wide** (sticky section rubrics across all content sections + a nav contact CTA, touching `Nav.astro`, every section component, and `global.css`). No changes to information architecture, routing, or copy intent.

> Note: filename retains the original `…watchlist-and-editions` slug; this doc now also covers the sticky section rubrics (Feature 3).

---

## Goal

Turn flat numbers and a static page into something explorable and guided:

1. **"63 companies tracked"** → a click-to-expand **branching-tree web** of the full watchlist (all 63 companies across 6 sectors), shown in-page with the rest of the section dimmed for focus. Purpose is **scope/showpiece**, not a filtering tool.
2. **"4 editions published"** → an **obviously-interactive picker** that lists the four weekly editions and opens the chosen PDF directly.
3. **Sticky numbered section rubrics** → each content section gets a big, artistic "01 / Proof of work" header that **pins to the top while reading and is pushed out by the next section's header** — giving the page a guided case-study feel and doubling as the "where am I" indicator. Plus a persistent **nav contact CTA**.

All reuse real data already in the repo. No fabricated content.

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

## Feature 3 — Sticky section rubrics + nav contact CTA

### The rubric (V1 "index rule" treatment, chosen)
Each of the six content sections gets a header, all on **one line**:
- Mono number in terracotta (`var(--color-accent)`, ~0.6 opacity), tabular figures.
- Section label in the site serif (`--font-serif`), ~30px.
- A hairline rule that runs to the right edge, ending with a small `NN—06` progress marker.

The six sections and their numbers:

| # | Label | Section id |
|---|-------|-----------|
| 01 | Proof of work | `#gtm-radar` (RadarProof) |
| 02 | Signal examples | `#signals` (SignalExamples) |
| 03 | Workflows I can build | `#workflows` (Workflows) |
| 04 | How it works | `#how` (HowItWorks) |
| 05 | Proof & archive | `#proof` (ProofArchive) |
| 06 | About Kyle | `#about` (About) |

Hero and Contact (FinalCta) are **not** numbered (intro and close).

### Pin behavior
- Each rubric is `position: sticky` and pins just **below the sticky nav** (offset = nav height). As the next section scrolls up, its rubric pushes the previous one out of the pinned slot (native sticky stacking — no JS).
- The rubric background is opaque paper so body content scrolls cleanly beneath it; no layout shift, no horizontal scroll.
- The pinned rubric **is** the "where am I" indicator — the separate nav section-pill idea is **dropped** to avoid redundancy.
- Replaces the per-section eyebrows that were removed in the earlier Hallmark pass. This is a deliberate, ordinal, page-as-case-study device — number stacked/inline with the label, **never** the banned skinny tag-left/header-right two-column pattern.

### Nav contact CTA
- Add a persistent **"Contact"** button in the nav top-right (the slot the dropped section-pill would have used), styled as a terracotta pill matching the hero CTA voice.
- Smooth-scrolls to `#contact` (the FinalCta section). Reuses existing `scroll-behavior: smooth` + `scroll-padding-top`.
- Remove the now-duplicate "Contact" entry from the inline nav link list; remaining inline links: GTM Radar · Signals · Workflows · How it works · About.

### Accessibility & motion
- Sticky pinning is layout, not animation — unaffected by reduced-motion. Anchor links + `scroll-margin-top` on sections must account for both nav and pinned-rubric height so deep links land correctly.
- The existing in-nav active-link highlight (IntersectionObserver in `Nav.astro`) stays and continues to reflect the current section.

---

## Implementation notes

- **Astro components** (no new runtime deps; pure CSS/SVG + small inline `<script>` for open/close + keyboard, consistent with the existing Nav/SignalCard scripts):
  - New `src/components/WatchlistTree.astro` — renders the tile button + the tree panel from `watchlist`.
  - New `src/components/EditionsPicker.astro` — renders the tile button + popover from `briefings`.
  - `src/components/RadarProof.astro` — swap the two static tiles for these components; keep the other two tiles and the coverage bar unchanged.
  - New `src/components/SectionRubric.astro` — renders the V1 sticky numbered header (props: number, label, total). Placed at the top of each of the six content sections.
  - `src/components/Nav.astro` — drop the dropped section-pill idea (never built); add the "Contact" pill CTA top-right; remove "Contact" from the inline link array.
  - The six section components (`RadarProof`, `SignalExamples`, `Workflows`, `HowItWorks`, `ProofArchive`, `About`) — add the `SectionRubric` at the top and adjust `scroll-margin-top` for the nav + pinned-rubric height.
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
- Sticky rubrics pin under the nav and push each other out on scroll; backgrounds opaque (no bleed-through); no layout shift or horizontal scroll. Anchor links land correctly under nav + rubric.
- Nav "Contact" pill smooth-scrolls to `#contact`; "Contact" no longer duplicated in inline links.
- Responsive at 320 / 375 / 768 / desktop — no horizontal scroll; mobile shows coverage bar, not the tree; rubrics remain legible/one-line.
- `prefers-reduced-motion: reduce` disables the line-draw and tick pulse (sticky pinning unaffected).
