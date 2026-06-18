// Real signals extracted verbatim from the published GTM Radar editions
// (public/briefings/gtm-radar-2026-w14..w17.pdf). Researched + edited by Kyle Findlay.
// Each card: a company signal, classified + scored, with the roles GTM Radar
// predicted would open — including the "hidden hires" the company likely hasn't
// posted yet — and a link back to the source edition.

export type Strength = 'HOT' | 'WARM' | 'WATCH';

export type Signal = {
  company: string;
  signal: string;       // what actually happened
  type: string;         // signal class
  score: number;        // 1–5, GTM Radar scoring rubric
  strength: Strength;
  read: string;         // the analytical call (≤35 words)
  roles: string[];      // roles likely to open, 60–90 days
  hiddenHires: string[];// predicted roles the company probably hasn't posted yet
  edition: { week: number; pdf: string };
  source: string;
};

const pdf = (w: number) => `/briefings/gtm-radar-2026-w${w}.pdf`;

export const signals: Signal[] = [
  {
    company: 'Clari + Salesloft',
    signal: "Named Rick Hasselman CFO on Apr 2, post-merger — public mandate: 'financial and operational rigor.'",
    type: 'Exec move',
    score: 5,
    strength: 'HOT',
    read: 'Post-merger CFOs with this SaaS scale-finance pedigree drive GTM role rationalization inside 90 days — duplicate orgs consolidate and new VP searches follow.',
    roles: ['VP Sales (merged revenue org)', 'VP RevOps (org consolidation)', 'Director FP&A — GTM', 'VP Sales Enablement'],
    hiddenHires: ['Director of Revenue Strategy', 'VP Pricing & Packaging', 'Director of Investor Relations'],
    edition: { week: 14, pdf: pdf(14) },
    source: 'BusinessWire',
  },
  {
    company: 'Brex',
    signal: 'Capital One closed its $5.15B acquisition Apr 7, with ~$1B committed to integration + retention.',
    type: 'M&A close',
    score: 5,
    strength: 'HOT',
    read: 'Three hiring waves stack: Capital One co-sell sellers now, a two-CRO consolidation at 90–180 days, then retention-cliff exits across mid-tenure Brex VPs.',
    roles: ['VP Enterprise Sales (F1000 co-sell)', 'Director Strategic Alliances', 'Director Integration RevOps', 'Director Sales Enablement'],
    hiddenHires: ['VP Brand Strategy', 'Head of Enterprise Partnerships (F500)', 'Director of Retention / Stay-Bonus Eng.', 'VP International GTM (EMEA + LATAM)', 'Head of Developer / API Ecosystem'],
    edition: { week: 15, pdf: pdf(15) },
    source: 'Capital One newsroom',
  },
  {
    company: 'Mercury',
    signal: 'Reportedly in advanced talks for a $5B+ round (Apr 7) — rumor-stage, not confirmed.',
    type: 'Funding · rumored',
    score: 3,
    strength: 'WATCH',
    read: "Rumors don't trigger real recruiter motion. The disciplined play is passive research only — build the alumni shortlist now, act when the round actually prints.",
    roles: ['VP Enterprise Sales (scale-up banking)', 'CRO (full-GTM ownership)', 'VP Product Marketing', 'Director Sales Enablement'],
    hiddenHires: ['VP International GTM (UK/EU)', 'Head of VC / Accelerator Channel', 'Director Enterprise Finance Ops (vertical GTM)'],
    edition: { week: 15, pdf: pdf(15) },
    source: 'The Information (reported) · verify',
  },
  {
    company: 'Ramp',
    signal: 'Fourth straight monthly AI release (Apr 16): token-spend dashboard + Claude/ChatGPT finance workflows.',
    type: 'Product launch',
    score: 4,
    strength: 'WARM',
    read: 'Product velocity tracks enterprise hiring at Ramp — the same category expansion that drove 70%+ GTM headcount growth at Brex two years prior.',
    roles: ['VP Enterprise Sales', 'Director Solutions Consulting (finance ops)', 'Director Customer Success', 'VP Product Marketing'],
    hiddenHires: ['VP International GTM (EMEA-first)', 'Director of Channel / ISV Partnerships', 'Head of Finance Vertical GTM (CFO ICP)'],
    edition: { week: 16, pdf: pdf(16) },
    source: 'Ramp blog',
  },
  {
    company: 'Crescendo',
    signal: 'Crossed $100M ARR in 24 months and opened UK/Europe with Dr. Martens, RealVNC as anchor logos.',
    type: 'Geo expansion',
    score: 5,
    strength: 'HOT',
    read: 'Fastest-scaling AI BPO in market. A UK office on the ground makes a UK CRO or VP Sales EMEA the immediate exec hire, with a CX layer scaling underneath.',
    roles: ['VP Sales UK/EMEA', 'Director CS EMEA', 'UK Marketing Lead'],
    hiddenHires: ['UK CS Lead', 'Implementation Lead UK', '8–12 UK Enterprise AEs'],
    edition: { week: 17, pdf: pdf(17) },
    source: 'Crescendo press',
  },
  {
    company: 'Sierra',
    signal: 'Acquired Paris-based Fragment (Apr 23) — third acquisition of 2026 and first EU footprint.',
    type: 'M&A · EU expansion',
    score: 4,
    strength: 'WARM',
    read: "Paris engineering capacity, but no EMEA AE bench or CS leadership behind it. Bret Taylor's network closes the top hires; the cohort underneath is the opportunity.",
    roles: ['Enterprise AE EMEA', 'Solutions Engineer EMEA', 'Director CS EMEA'],
    hiddenHires: ['VP Sales EMEA (no named EU GTM leader)', 'EMEA CS Lead', '4–6 EMEA Enterprise AEs'],
    edition: { week: 17, pdf: pdf(17) },
    source: 'Sierra blog',
  },
];
