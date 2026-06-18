# GTM Radar — Interactive Homepage Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three interactions to the homepage — a click-to-expand watchlist web, an editions picker, and sticky numbered section rubrics with a nav contact CTA.

**Architecture:** Pure Astro components + CSS/SVG + small vanilla `<script>` blocks (same pattern as existing `Nav.astro` / `SignalCard.astro`). No new runtime dependencies. All content is data-driven from `src/content/watchlist.ts` and `src/content/briefings.ts`. Sticky rubrics use native `position: sticky` (no JS). The watchlist panel dims the page with a fixed scrim while staying in flow.

**Tech Stack:** Astro 6, Tailwind v4 (`@theme` tokens in `src/styles/global.css`), vanilla TS in component scripts.

## Global Constraints

Copied from the spec; every task implicitly includes these:

- No new runtime dependencies. Pure CSS/SVG + vanilla `<script>`.
- Every colour and font references an existing token (`var(--color-*)`, `var(--font-*)`). Add new named tokens to `@theme`/`:root` rather than inlining hex/oklch.
- Animate only `transform`/`opacity`; use `var(--ease-out)` (cubic-bezier(.2,.6,.2,1)), never the default `ease`.
- Support `prefers-reduced-motion: reduce` — disable line-draw and tick pulse; sticky pinning is layout and is unaffected.
- All names/weeks/dates/counts come from the data files. No fabricated content. Counts derive from data (`watchlistTotal`, `briefings.length`), never hardcoded.
- Interactive triggers are real `<button>`s with `:focus-visible` rings and correct `aria-*`.
- Headings stay roman (no italic display). Section rubric is number-then-label (inline/stacked), never the skinny tag-left/header-right two-column pattern.
- No horizontal scroll at 320 / 375 / 414 / 768 px. `html, body { overflow-x: clip }` already in place via Tailwind reset; verify.
- **No unit-test framework exists.** Verify each task with `npm run build` (must complete with no errors) and the listed manual checks via `npm run dev` (http://localhost:4321 or next free port).

---

## File Structure

**Create:**
- `src/components/SectionRubric.astro` — sticky numbered section header (V1 index-rule). Props: `num`, `label`, `total`.
- `src/components/EditionsPicker.astro` — the "editions published" stat tile (button) + hover/tap popover of the 4 weeks. Self-contained grid cell.
- `src/components/WatchlistTree.astro` — the expandable watchlist panel + dim scrim + open/close script. (The trigger button lives in `RadarProof.astro`.)

**Modify:**
- `src/styles/global.css` — `--nav-h` token, rubric styles, stat-tile button styles, editions popover + tick pulse, watchlist tree/panel/scrim styles, reduced-motion rules.
- `src/components/Nav.astro` — add Contact pill CTA; remove "Contact" from inline links.
- `src/components/RadarProof.astro` — replace tiles 1 & 2 with `EditionsPicker` and the watchlist trigger button; render `WatchlistTree` after the grid; drop the section kicker; add `SectionRubric`.
- `src/components/SignalExamples.astro`, `Workflows.astro`, `HowItWorks.astro`, `ProofArchive.astro`, `About.astro` — add `SectionRubric`; set `scroll-mt` to `var(--nav-h)`.

**Section → number → id map (used in Tasks 2 & 5):**

| # | label | section id | component |
|---|-------|-----------|-----------|
| 01 | Proof of work | `#gtm-radar` | RadarProof |
| 02 | Signal examples | `#signals` | SignalExamples |
| 03 | Workflows I can build | `#workflows` | Workflows |
| 04 | How it works | `#how` | HowItWorks |
| 05 | Proof & archive | `#proof` | ProofArchive |
| 06 | About Kyle | `#about` | About |

---

## Task 1: SectionRubric component + styles

**Files:**
- Create: `src/components/SectionRubric.astro`
- Modify: `src/styles/global.css` (append rubric styles + `--nav-h`)

**Interfaces:**
- Produces: `<SectionRubric num="01" label="Proof of work" total={6} />` → renders `<div class="rubric">` with `.rubric-num`, `.rubric-label`, `.rubric-rule`, `.rubric-of`. `total` defaults to `6`.

- [ ] **Step 1: Create the component**

Create `src/components/SectionRubric.astro`:

```astro
---
interface Props {
  num: string;   // "01"
  label: string; // "Proof of work"
  total?: number;
}
const { num, label, total = 6 } = Astro.props;
const totalStr = String(total).padStart(2, '0');
---
<div class="rubric">
  <span class="rubric-num">{num}</span>
  <span class="rubric-label">{label}</span>
  <span class="rubric-rule" aria-hidden="true"></span>
  <span class="rubric-of">{num}—{totalStr}</span>
</div>
```

- [ ] **Step 2: Add the token + styles**

In `src/styles/global.css`, add `--nav-h` inside the existing `@theme` block (next to `--container-content`):

```css
  --nav-h: 56px;
```

Then append at the end of the file:

```css
/* sticky numbered section rubric (V1 index-rule) */
.rubric {
  position: sticky;
  top: var(--nav-h);
  z-index: 20;
  display: flex;
  align-items: baseline;
  gap: 14px;
  background: var(--color-paper);
  padding: 16px 0 11px;
}
.rubric-num {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1;
  color: var(--color-accent);
  opacity: .6;
  font-variant-numeric: tabular-nums;
}
.rubric-label {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.9rem;
  line-height: 1.1;
  letter-spacing: -.015em;
  white-space: nowrap;
}
.rubric-rule {
  flex: 1;
  min-width: 24px;
  align-self: center;
  height: 0;
  border-bottom: 1px solid var(--color-rule);
}
.rubric-of {
  font-family: var(--font-mono);
  font-size: .7rem;
  color: var(--color-muted);
  opacity: .7;
  white-space: nowrap;
}
@media (max-width: 640px) {
  .rubric-label { font-size: 1.35rem; }
  .rubric-num { font-size: 1.05rem; }
  .rubric-of { display: none; }
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: completes with "Complete!" and no errors. (The component isn't wired in yet — this only proves it compiles.)

- [ ] **Step 4: Commit**

```bash
git add src/components/SectionRubric.astro src/styles/global.css
git commit -m "feat: add SectionRubric sticky header component + styles"
```

---

## Task 2: Wire rubrics into the six sections

**Files:**
- Modify: `src/components/RadarProof.astro` (add rubric, drop kicker)
- Modify: `src/components/SignalExamples.astro`, `Workflows.astro`, `HowItWorks.astro`, `ProofArchive.astro`, `About.astro` (add rubric, fix scroll-mt)

**Interfaces:**
- Consumes: `SectionRubric` from Task 1.

- [ ] **Step 1: RadarProof — import, drop kicker, add rubric, fix scroll-mt**

In `src/components/RadarProof.astro` frontmatter, add the import after the existing import:

```astro
import SectionRubric from './SectionRubric.astro';
```

Change the opening tag and drop the kicker. Replace:

```astro
<section id="gtm-radar" class="py-24 border-b border-rule scroll-mt-20">
  <p class="kicker">Proof of work · GTM Radar</p>
  <h2 class="font-serif text-4xl md:text-5xl leading-[1.06] mt-4 max-w-[720px]">A working intelligence system, not a slide.</h2>
```

with:

```astro
<section id="gtm-radar" class="py-24 border-b border-rule scroll-mt-[var(--nav-h)]">
  <SectionRubric num="01" label="Proof of work" />
  <h2 class="font-serif text-4xl md:text-5xl leading-[1.06] mt-8 max-w-[720px]">A working intelligence system, not a slide.</h2>
```

- [ ] **Step 2: SignalExamples — import + rubric + scroll-mt**

In `src/components/SignalExamples.astro` frontmatter add:

```astro
import SectionRubric from './SectionRubric.astro';
```

Replace:

```astro
<section id="signals" class="py-16 scroll-mt-20">
  <h2 class="font-serif text-3xl md:text-4xl max-w-[640px]">Real signals, scored and turned into action.</h2>
```

with:

```astro
<section id="signals" class="py-16 scroll-mt-[var(--nav-h)]">
  <SectionRubric num="02" label="Signal examples" />
  <h2 class="font-serif text-3xl md:text-4xl mt-8 max-w-[640px]">Real signals, scored and turned into action.</h2>
```

- [ ] **Step 3: Workflows — import + rubric + scroll-mt**

In `src/components/Workflows.astro` frontmatter add:

```astro
import SectionRubric from './SectionRubric.astro';
```

Replace:

```astro
<section id="workflows" class="py-20 border-b border-rule scroll-mt-20">
  <h2 class="font-serif text-3xl md:text-4xl max-w-[640px]">Repeatable systems, not one-off reports.</h2>
```

with:

```astro
<section id="workflows" class="py-20 border-b border-rule scroll-mt-[var(--nav-h)]">
  <SectionRubric num="03" label="Workflows I can build" />
  <h2 class="font-serif text-3xl md:text-4xl mt-8 max-w-[640px]">Repeatable systems, not one-off reports.</h2>
```

- [ ] **Step 4: HowItWorks — import + rubric + scroll-mt**

In `src/components/HowItWorks.astro` frontmatter add:

```astro
import SectionRubric from './SectionRubric.astro';
```

Replace:

```astro
<section id="how" class="py-24 border-b border-rule scroll-mt-20">
  <h2 class="font-serif text-4xl md:text-5xl leading-[1.06] max-w-[640px]">The loop, end to end.</h2>
```

with:

```astro
<section id="how" class="py-24 border-b border-rule scroll-mt-[var(--nav-h)]">
  <SectionRubric num="04" label="How it works" />
  <h2 class="font-serif text-4xl md:text-5xl leading-[1.06] mt-8 max-w-[640px]">The loop, end to end.</h2>
```

- [ ] **Step 5: ProofArchive — import + rubric + scroll-mt**

In `src/components/ProofArchive.astro` frontmatter add:

```astro
import SectionRubric from './SectionRubric.astro';
```

Replace:

```astro
<section id="proof" class="py-16 scroll-mt-20">
  <h2 class="font-serif text-3xl md:text-4xl">The receipts.</h2>
```

with:

```astro
<section id="proof" class="py-16 scroll-mt-[var(--nav-h)]">
  <SectionRubric num="05" label="Proof & archive" />
  <h2 class="font-serif text-3xl md:text-4xl mt-8">The receipts.</h2>
```

- [ ] **Step 6: About — import + rubric + scroll-mt**

In `src/components/About.astro` frontmatter add:

```astro
import SectionRubric from './SectionRubric.astro';
```

Replace:

```astro
<section id="about" class="py-20 border-b border-rule scroll-mt-20">
  <div class="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-10 items-start">
```

with:

```astro
<section id="about" class="py-20 border-b border-rule scroll-mt-[var(--nav-h)]">
  <SectionRubric num="06" label="About Kyle" />
  <div class="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-10 items-start mt-8">
```

- [ ] **Step 7: Verify build + manual scroll check**

Run: `npm run build` → Expected: "Complete!", no errors.
Run: `npm run dev`, open the served URL. Manual checks:
- Each of the six sections shows its `NN / label` header.
- Scrolling down: each rubric pins under the nav and is pushed out by the next; body text scrolls cleanly under it (no see-through).
- Clicking a nav link lands the section with its rubric just under the nav (not hidden).

- [ ] **Step 8: Commit**

```bash
git add src/components/RadarProof.astro src/components/SignalExamples.astro src/components/Workflows.astro src/components/HowItWorks.astro src/components/ProofArchive.astro src/components/About.astro
git commit -m "feat: add sticky numbered rubrics to the six content sections"
```

---

## Task 3: Nav contact CTA

**Files:**
- Modify: `src/components/Nav.astro`

**Interfaces:**
- Produces: a `#contact`-anchored pill in the nav; inline link list no longer contains "Contact".

- [ ] **Step 1: Remove "Contact" from the links array**

In `src/components/Nav.astro` frontmatter, change:

```astro
const links = [
  { id: 'gtm-radar', label: 'GTM Radar' },
  { id: 'signals', label: 'Signals' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'how', label: 'How it works' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
```

to:

```astro
const links = [
  { id: 'gtm-radar', label: 'GTM Radar' },
  { id: 'signals', label: 'Signals' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'how', label: 'How it works' },
  { id: 'about', label: 'About' },
];
```

- [ ] **Step 2: Add the Contact pill, grouped on the right with the links + toggle**

Replace this block:

```astro
    <button id="nav-toggle" class="ml-auto sm:hidden text-ink text-xl self-center" aria-label="Toggle menu" aria-expanded="false">☰</button>

    <ul id="nav-list" class="hidden sm:flex ml-auto gap-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted self-center
                             absolute sm:static top-full left-0 right-0 bg-paper sm:bg-transparent border-b sm:border-0 border-rule
                             flex-col sm:flex-row p-6 sm:p-0">
      {links.map((l) => (
        <li>
          <a href={`#${l.id}`} data-nav={l.id} class="nav-link block pb-0.5 border-b-2 border-transparent hover:text-ink hover:border-accent transition">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>
```

with:

```astro
    <div class="ml-auto flex items-center gap-4 sm:gap-5 self-center">
      <ul id="nav-list" class="hidden sm:flex gap-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted
                               absolute sm:static top-full left-0 right-0 bg-paper sm:bg-transparent border-b sm:border-0 border-rule
                               flex-col sm:flex-row p-6 sm:p-0">
        {links.map((l) => (
          <li>
            <a href={`#${l.id}`} data-nav={l.id} class="nav-link block pb-0.5 border-b-2 border-transparent hover:text-ink hover:border-accent transition">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" class="inline-flex items-center px-4 py-2 bg-accent text-paper text-[10.5px] font-mono font-semibold uppercase tracking-[0.14em] rounded-full hover:opacity-90 transition shrink-0">
        Contact
      </a>
      <button id="nav-toggle" class="sm:hidden text-ink text-xl shrink-0" aria-label="Toggle menu" aria-expanded="false">☰</button>
    </div>
  </div>
</nav>
```

(The `#nav-list` id and `data-nav` attributes are unchanged, so the existing toggle + active-highlight script keeps working.)

- [ ] **Step 3: Verify build + manual check**

Run: `npm run build` → "Complete!".
Run: `npm run dev`. Manual checks:
- Nav shows wordmark left; links + terracotta "Contact" pill right; hamburger on mobile.
- Clicking "Contact" smooth-scrolls to the bottom contact section.
- "Contact" appears only as the pill (not in the inline link list).
- Mobile (≤640px): hamburger still opens the link menu; Contact pill visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add nav Contact pill CTA, drop duplicate inline Contact link"
```

---

## Task 4: Editions picker

**Files:**
- Create: `src/components/EditionsPicker.astro`
- Modify: `src/styles/global.css` (append stat-tile + editions styles)
- Modify: `src/components/RadarProof.astro` (use the component as the first tile)

**Interfaces:**
- Consumes: `briefings` from `src/content/briefings.ts` (`{week, year, dateRange, summary, pdf}`).
- Produces: `<EditionsPicker />` — a grid-cell `<div class="stat-tile ed-tile">` containing `#ed-trigger` button + `#ed-pop` popover.

- [ ] **Step 1: Create the component**

Create `src/components/EditionsPicker.astro`:

```astro
---
import { briefings } from '../content/briefings';
const editions = [...briefings].sort((a, b) => b.week - a.week);
---
<div class="stat-tile ed-tile">
  <button class="ed-trigger" id="ed-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="ed-pop">
    <span class="tile-n">{briefings.length}</span>
    <span class="tile-l">editions published</span>
    <span class="ed-ticks" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="ed-hint" aria-hidden="true">browse →</span>
  </button>
  <div class="ed-pop" id="ed-pop" role="menu" aria-label="GTM Radar editions" hidden>
    <p class="ed-ph">GTM Radar · open an edition</p>
    {editions.map((e) => (
      <a class="ed-row" role="menuitem" href={e.pdf} target="_blank" rel="noopener">
        <span class="ed-wk">Week {e.week}</span>
        <span class="ed-dt">{e.dateRange}</span>
        <span class="ed-go">Open PDF →</span>
      </a>
    ))}
  </div>
</div>

<script>
  const trigger = document.getElementById('ed-trigger');
  const pop = document.getElementById('ed-pop');
  const wrap = trigger?.closest('.ed-tile') as HTMLElement | null;
  let open = false;
  const show = () => { open = true; pop?.removeAttribute('hidden'); trigger?.setAttribute('aria-expanded', 'true'); };
  const hide = () => { open = false; pop?.setAttribute('hidden', ''); trigger?.setAttribute('aria-expanded', 'false'); };

  trigger?.addEventListener('click', () => (open ? hide() : show()));
  document.addEventListener('click', (e) => {
    if (open && wrap && !wrap.contains(e.target as Node)) hide();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) { hide(); trigger?.focus(); }
  });
  // desktop: also open on hover
  if (window.matchMedia('(hover: hover)').matches && wrap) {
    wrap.addEventListener('mouseenter', show);
    wrap.addEventListener('mouseleave', hide);
  }
</script>
```

- [ ] **Step 2: Append the stat-tile + editions styles to `global.css`**

```css
/* shared stat-tile button look (matches the static tiles in RadarProof) */
.stat-tile { position: relative; background: var(--color-card); }
.tile-n { display: block; font-family: var(--font-serif); font-size: 1.875rem; line-height: 1; color: var(--color-ink); }
.tile-l { display: block; font-family: var(--font-mono); font-size: 11.5px; text-transform: uppercase; letter-spacing: .05em; color: color-mix(in srgb, var(--color-ink) 60%, transparent); margin-top: 6px; }

/* editions trigger */
.ed-trigger {
  display: block; width: 100%; text-align: left; cursor: pointer;
  background: transparent; border: 0; padding: 24px 20px;
  transition: background-color .2s var(--ease-out);
}
.ed-trigger:hover { background: color-mix(in srgb, var(--color-accent) 5%, transparent); }
.ed-trigger:focus-visible { outline: 2px solid var(--color-accent); outline-offset: -2px; }
.ed-ticks { display: flex; gap: 5px; margin-top: 12px; }
.ed-ticks i { width: 24px; height: 4px; border-radius: 2px; background: var(--color-rule); }
.ed-ticks i { animation: edpulse 2.4s ease-in-out infinite; }
.ed-ticks i:nth-child(2) { animation-delay: .2s; }
.ed-ticks i:nth-child(3) { animation-delay: .4s; }
.ed-ticks i:nth-child(4) { animation-delay: .6s; }
@keyframes edpulse { 0%, 100% { background: var(--color-rule); } 40% { background: var(--color-accent); } }
.ed-hint { font-family: var(--font-mono); font-size: 9px; letter-spacing: .04em; color: var(--color-muted); opacity: .75; margin-top: 8px; display: block; }

/* editions popover */
.ed-pop {
  position: absolute; top: calc(100% + 6px); left: 0; z-index: 30; width: max(100%, 280px);
  background: var(--color-card); border: 1px solid var(--color-rule); border-radius: 10px;
  box-shadow: 0 18px 44px -24px color-mix(in srgb, var(--color-ink) 55%, transparent); overflow: hidden;
}
.ed-pop[hidden] { display: none; }
.ed-ph { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--color-accent); padding: 11px 14px; border-bottom: 1px solid var(--color-rule); }
.ed-row { display: flex; align-items: baseline; gap: 10px; padding: 10px 14px; border-bottom: 1px solid color-mix(in srgb, var(--color-rule) 60%, transparent); transition: background-color .15s var(--ease-out); }
.ed-row:last-child { border-bottom: 0; }
.ed-row:hover { background: var(--color-paper); }
.ed-wk { font-family: var(--font-mono); font-weight: 600; font-size: 11px; flex: 0 0 64px; color: var(--color-ink); }
.ed-dt { font-family: var(--font-mono); font-size: 10px; color: var(--color-muted); flex: 1; }
.ed-go { font-family: var(--font-mono); font-size: 10px; color: var(--color-accent); }
@media (prefers-reduced-motion: reduce) {
  .ed-ticks i { animation: none; }
}
```

- [ ] **Step 3: Use the component in RadarProof**

In `src/components/RadarProof.astro` frontmatter, add the import:

```astro
import EditionsPicker from './EditionsPicker.astro';
```

Change the `tiles` array (drop the editions entry — it becomes the component; keep the rest, and the "63" entry is replaced in Task 5):

```astro
const tiles = [
  { n: '4', label: 'editions published' },
  { n: '63', label: 'companies tracked' },
  { n: '6', label: 'sectors covered' },
  { n: '30–90d', label: 'scoring window' },
];
```

to:

```astro
const tiles = [
  { n: '6', label: 'sectors covered' },
  { n: '30–90d', label: 'scoring window' },
];
```

Replace the tiles grid:

```astro
  <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule rounded-lg overflow-hidden mt-10">
    {tiles.map((t) => (
      <div class="bg-card px-5 py-6">
        <p class="font-serif text-3xl md:text-4xl text-ink">{t.n}</p>
        <p class="font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink/60 mt-1.5">{t.label}</p>
      </div>
    ))}
  </div>
```

with:

```astro
  <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule rounded-lg overflow-visible mt-10">
    <EditionsPicker />
    <div class="bg-card px-5 py-6">
      <p class="font-serif text-3xl md:text-4xl text-ink">63</p>
      <p class="font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink/60 mt-1.5">companies tracked</p>
    </div>
    {tiles.map((t) => (
      <div class="bg-card px-5 py-6">
        <p class="font-serif text-3xl md:text-4xl text-ink">{t.n}</p>
        <p class="font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink/60 mt-1.5">{t.label}</p>
      </div>
    ))}
  </div>
```

(Note: `overflow-hidden` → `overflow-visible` so the popover can escape the grid. The hairline separators come from `gap-px bg-rule` and are unaffected. The plain "63" tile here is replaced by the interactive trigger in Task 5.)

- [ ] **Step 4: Verify build + manual check**

Run: `npm run build` → "Complete!".
Run: `npm run dev`. Manual checks:
- The first tile shows "4 / editions published" with the four ticks pulsing left-to-right.
- Desktop: hovering the tile opens the popover; moving away closes it. Clicking a week opens the correct PDF in a new tab.
- Mobile/tap: tapping the tile toggles the popover; tapping outside closes it; `Esc` closes it.
- Reduced-motion (emulate in devtools): ticks stop pulsing; popover still works.

- [ ] **Step 5: Commit**

```bash
git add src/components/EditionsPicker.astro src/styles/global.css src/components/RadarProof.astro
git commit -m "feat: add editions picker affordance to GTM Radar stat tile"
```

---

## Task 5: Watchlist tree (click-to-expand web + dim)

**Files:**
- Create: `src/components/WatchlistTree.astro`
- Modify: `src/styles/global.css` (append tree/panel/scrim styles)
- Modify: `src/components/RadarProof.astro` (replace the plain "63" tile with the trigger button; render `WatchlistTree` after the grid)

**Interfaces:**
- Consumes: `watchlist`, `watchlistTotal` from `src/content/watchlist.ts`. The trigger `#wl-trigger` lives in RadarProof; `WatchlistTree` owns `#wl-panel`, `#wl-scrim`, `#wl-close` and the open/close script that references `#wl-trigger`.

- [ ] **Step 1: Create the component (panel + scrim + script)**

Create `src/components/WatchlistTree.astro`:

```astro
---
import { watchlist, watchlistTotal } from '../content/watchlist';
const segColors = [
  'var(--color-cat-1)', 'var(--color-cat-2)', 'var(--color-cat-3)',
  'var(--color-cat-4)', 'var(--color-cat-5)', 'var(--color-cat-6)',
];
const branches = watchlist.map((b, i) => ({
  label: b.label,
  count: b.companies.length,
  color: segColors[i % segColors.length],
  companies: b.companies.map((c) => c.name),
}));
---
<div class="wl-scrim" id="wl-scrim" hidden></div>
<div class="wl-panel" id="wl-panel" role="dialog" aria-modal="true" aria-label={`The full watchlist — ${watchlistTotal} companies across ${branches.length} sectors`} hidden>
  <button class="wl-close" id="wl-close" type="button" aria-label="Close watchlist">esc ✕</button>
  <p class="wl-ptitle">{watchlistTotal} companies · {branches.length} sectors · the full watchlist</p>
  <div class="wl-tree">
    <div class="wl-hub"><span class="wl-hub-n">{watchlistTotal}</span><span class="wl-hub-l">COMPANIES</span></div>
    <div class="wl-spine" aria-hidden="true"></div>
    <div class="wl-branches">
      {branches.map((b) => (
        <div class="wl-branch">
          <div class="wl-sector">
            <span class="wl-dot" style={`background:${b.color}`}></span>
            <span class="wl-sn">{b.label}</span>
            <span class="wl-sc">{b.count}</span>
          </div>
          <div class="wl-cos">
            {b.companies.map((n) => <span class="wl-co">{n}</span>)}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

<script>
  const trigger = document.getElementById('wl-trigger');
  const panel = document.getElementById('wl-panel');
  const scrim = document.getElementById('wl-scrim');
  const closeBtn = document.getElementById('wl-close');
  const mq = window.matchMedia('(min-width: 768px)');
  let open = false;

  function openPanel() {
    if (!mq.matches) return; // desktop-only
    open = true;
    panel?.removeAttribute('hidden');
    scrim?.removeAttribute('hidden');
    document.body.classList.add('wl-open');
    trigger?.setAttribute('aria-expanded', 'true');
    closeBtn?.focus();
  }
  function closePanel() {
    open = false;
    panel?.setAttribute('hidden', '');
    scrim?.setAttribute('hidden', '');
    document.body.classList.remove('wl-open');
    trigger?.setAttribute('aria-expanded', 'false');
    trigger?.focus();
  }

  trigger?.addEventListener('click', () => (open ? closePanel() : openPanel()));
  scrim?.addEventListener('click', closePanel);
  closeBtn?.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) closePanel();
  });
  // minimal focus trap: keep Tab within the panel while open
  panel?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !open) return;
    const f = panel.querySelectorAll<HTMLElement>('button, a[href]');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  // if shrunk to mobile while open, close
  mq.addEventListener('change', () => { if (!mq.matches && open) closePanel(); });
</script>
```

- [ ] **Step 2: Append tree/panel/scrim styles to `global.css`**

```css
/* watchlist trigger cue (on the 63 tile) — desktop only */
.wl-cue { display: none; }
@media (min-width: 768px) and (hover: hover) {
  .wl-cue { display: block; font-family: var(--font-mono); font-size: 9px; letter-spacing: .04em; color: var(--color-muted); opacity: .75; margin-top: 8px; }
}

/* dim scrim */
.wl-scrim {
  position: fixed; inset: 0; z-index: 40;
  background: color-mix(in srgb, var(--color-paper) 82%, transparent);
}
.wl-scrim[hidden] { display: none; }

/* expandable panel (in flow, lifted above the scrim) */
.wl-panel {
  position: relative; z-index: 45; margin: 22px 0 4px;
  background: var(--color-card); border: 1px solid var(--color-rule); border-radius: 12px;
  padding: 22px 22px 24px;
  box-shadow: 0 20px 50px -28px color-mix(in srgb, var(--color-ink) 50%, transparent);
}
.wl-panel[hidden] { display: none; }
.wl-close { position: absolute; top: 12px; right: 14px; background: 0; border: 0; cursor: pointer; font-family: var(--font-mono); font-size: 12px; color: var(--color-muted); }
.wl-close:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.wl-ptitle { font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 16px; }

.wl-tree { display: flex; align-items: stretch; gap: 0; }
.wl-hub { flex: 0 0 auto; align-self: center; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 74px; height: 74px; border-radius: 50%; background: var(--color-accent); color: var(--color-card); margin-right: 6px; }
.wl-hub-n { font-family: var(--font-serif); font-size: 28px; line-height: 1; }
.wl-hub-l { font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .1em; margin-top: 3px; }
.wl-spine { flex: 0 0 28px; border-left: 2px solid color-mix(in srgb, var(--color-accent) 35%, transparent); margin: 18px 0; }
.wl-branches { flex: 1; min-width: 0; }
.wl-branch { display: flex; align-items: flex-start; gap: 12px; padding: 9px 0; border-bottom: 1px solid color-mix(in srgb, var(--color-rule) 55%, transparent); }
.wl-branch:last-child { border-bottom: 0; }
.wl-sector { flex: 0 0 150px; display: flex; align-items: center; gap: 7px; padding-top: 2px; }
.wl-dot { width: 9px; height: 9px; border-radius: 50%; flex: 0 0 auto; }
.wl-sn { font-family: var(--font-mono); font-size: 11px; font-weight: 600; color: var(--color-ink); }
.wl-sc { font-family: var(--font-mono); font-size: 10px; color: var(--color-muted); margin-left: auto; padding-right: 6px; }
.wl-cos { display: flex; flex-wrap: wrap; gap: 5px 6px; flex: 1; min-width: 0; border-left: 1px solid color-mix(in srgb, var(--color-rule) 55%, transparent); padding-left: 14px; }
.wl-co { font-family: var(--font-mono); font-size: 10.5px; color: var(--color-ink); background: var(--color-paper); border: 1px solid var(--color-rule); border-radius: 5px; padding: 2px 7px; white-space: nowrap; }

/* line-draw reveal on open (staggered branches) */
.wl-open .wl-branch { animation: wlrise .5s var(--ease-out) backwards; }
.wl-open .wl-branch:nth-child(2) { animation-delay: .06s; }
.wl-open .wl-branch:nth-child(3) { animation-delay: .12s; }
.wl-open .wl-branch:nth-child(4) { animation-delay: .18s; }
.wl-open .wl-branch:nth-child(5) { animation-delay: .24s; }
.wl-open .wl-branch:nth-child(6) { animation-delay: .30s; }
@keyframes wlrise { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }

@media (prefers-reduced-motion: reduce) {
  .wl-open .wl-branch { animation: none; }
}
```

- [ ] **Step 3: Swap the plain "63" tile for the trigger button + render the panel in RadarProof**

In `src/components/RadarProof.astro` frontmatter, add the import:

```astro
import WatchlistTree from './WatchlistTree.astro';
```

Replace the plain "63" tile added in Task 4:

```astro
    <div class="bg-card px-5 py-6">
      <p class="font-serif text-3xl md:text-4xl text-ink">63</p>
      <p class="font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink/60 mt-1.5">companies tracked</p>
    </div>
```

with:

```astro
    <button id="wl-trigger" type="button" class="stat-tile ed-trigger" aria-expanded="false" aria-controls="wl-panel">
      <span class="tile-n">{watchlistTotal}</span>
      <span class="tile-l">companies tracked</span>
      <span class="wl-cue" aria-hidden="true">explore →</span>
    </button>
```

Ensure `watchlistTotal` is imported in RadarProof (it already imports `{ watchlist, watchlistTotal }` at the top — leave as is).

Then render the panel immediately after the closing `</div>` of the tiles grid (before the coverage-bar block):

```astro
  <WatchlistTree />
```

- [ ] **Step 4: Verify build + manual check**

Run: `npm run build` → "Complete!".
Run: `npm run dev`. Manual checks (desktop ≥768px):
- The "63 / companies tracked" tile shows the "explore →" cue and a pointer cursor.
- Click → page dims to ~18%, the tree panel appears below the tiles with all six sectors and every company name; branches stagger in.
- Close via `✕`, `Esc`, or clicking the dimmed area; focus returns to the tile.
- Keyboard: Tab stays within the panel while open.
- Reduced-motion: branches appear without the slide; dim still applies.
- Mobile (<768px): clicking the tile does nothing special; the coverage bar below remains the watchlist view; no dim, no panel.

- [ ] **Step 5: Commit**

```bash
git add src/components/WatchlistTree.astro src/styles/global.css src/components/RadarProof.astro
git commit -m "feat: add click-to-expand watchlist web with dim-the-page focus"
```

---

## Task 6: Cross-cutting verification pass

**Files:** none (verification + any small fixes uncovered).

- [ ] **Step 1: Full responsive sweep**

Run `npm run dev`. In devtools, check 320 / 375 / 414 / 768 / desktop:
- No horizontal scroll at any width.
- Rubric labels stay on one line (if "Workflows I can build" overflows at 320px, reduce `.rubric-label` mobile size to `1.2rem` in `global.css` and re-check).
- Editions popover fits within viewport (doesn't clip off-screen at the left tile position).
- Watchlist tree only triggers ≥768px; coverage bar is the mobile fallback.

- [ ] **Step 2: Keyboard + a11y pass**
- Tab to the editions tile → `Enter` opens the popover; `Esc` closes.
- Tab to the watchlist tile (desktop) → `Enter` opens; focus moves to close; `Esc`/Tab-trap work; focus returns.
- All interactive elements show a visible `:focus-visible` ring.

- [ ] **Step 3: Reduced-motion pass**

Emulate `prefers-reduced-motion: reduce`:
- Editions ticks static; watchlist branches appear without slide; hero/section reveals already collapse (existing rule). Sticky pinning still works.

- [ ] **Step 4: Final build**

Run: `npm run build`
Expected: "Complete!", 4 pages built, no errors/warnings.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive + a11y polish for GTM Radar interactions"
```

(Skip if no changes were needed in this task.)

---

## Self-Review

- **Spec coverage:** Feature 1 (watchlist web) → Task 5. Feature 2 (editions picker) → Task 4. Feature 3 (sticky rubrics) → Tasks 1–2; nav contact CTA → Task 3. Dim/scrim, animation, reduced-motion, mobile fallback, accessibility → covered in Tasks 4–6. Section→number map matches the spec table.
- **Placeholder scan:** No TBD/TODO; all component code is complete; all CSS provided.
- **Type/selector consistency:** `#wl-trigger` (RadarProof) ↔ `#wl-panel`/`#wl-scrim`/`#wl-close` (WatchlistTree) match between Task 5 markup and script. `#ed-trigger`/`#ed-pop` consistent within Task 4. `.stat-tile`, `.tile-n`, `.tile-l`, `.ed-trigger` reused consistently. `--nav-h` defined in Task 1, referenced in Tasks 1–2. `--color-cat-1..6` already exist in `global.css` from the prior redesign.
