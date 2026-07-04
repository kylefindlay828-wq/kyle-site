// European / international layer for GTM Radar — Betts-fit, AI-reshaped GTM.
// Same three filters as the US watchlist: active GTM hiring need, no internal
// recruiting army / brand magnet, matches the firm's documented pattern.
// NOTE: stage/funding specifics to be re-verified before anything goes public.

export type EuCompany = { name: string; hq: string; why: string };
export type EuBucket = { label: string; companies: EuCompany[] };

export const watchlistEu: EuBucket[] = [
  {
    label: 'AI-Native',
    companies: [
      { name: 'Synthesia', hq: 'London', why: 'AI video for enterprise comms; classic enterprise-sales build.' },
      { name: 'DeepL', hq: 'Cologne', why: 'Enterprise AI translation; expanding US + enterprise GTM from an EU base.' },
      { name: 'n8n', hq: 'Berlin', why: 'AI workflow automation; PLG→enterprise transition = a GTM build-out.' },
    ],
  },
  {
    label: 'RevTech',
    companies: [
      { name: 'Cognism', hq: 'London', why: 'EU sales-intelligence (ZoomInfo analog); AI-enriched B2B data; volume AE hiring.' },
      { name: 'Aircall', hq: 'Paris / NY', why: 'Cloud calling + AI call intelligence; scaling RevTech GTM across US + EU.' },
      { name: 'Attio', hq: 'London', why: 'AI-native CRM; fast-scaling, building its first real GTM org.' },
    ],
  },
  {
    label: 'Fintech + Cyber',
    companies: [
      { name: 'Adyen', hq: 'Amsterdam', why: 'Public payments platform embedding AI in risk/ops; runs specialized external search.' },
      { name: 'Payhawk', hq: 'London / Sofia', why: 'EU spend management (Ramp/Brex analog); AI features; GTM scaling across Europe.' },
      { name: 'Tines', hq: 'Dublin', why: 'Security workflow automation with AI; scaling enterprise GTM, no internal army.' },
    ],
  },
  {
    label: 'Incumbent / AI-Late',
    companies: [
      { name: 'Celonis', hq: 'Munich', why: 'Process mining + AI; pre-IPO, massive GTM org, PE-backed.' },
      { name: 'Personio', hq: 'Munich', why: 'HR platform adding AI; mid-cap, GTM-heavy across DACH.' },
      { name: 'Pigment', hq: 'Paris', why: 'AI-infused business planning; scaling enterprise GTM, US + EU.' },
    ],
  },
];

// The reject pile — proof the filter is real, not "add every hot EU name."
export const watchlistEuExcluded = [
  { name: 'Mistral', why: 'EU brand-magnet foundation model — inbound talent magnet, no need for search.' },
  { name: 'SAP', why: 'Too big; huge internal TA army.' },
  { name: 'Helsing', why: 'Defense AI; different recruiter network / clearance-driven hiring.' },
];

export const watchlistEuTotal = watchlistEu.reduce((n, b) => n + b.companies.length, 0);
