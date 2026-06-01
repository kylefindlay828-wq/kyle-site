export type Briefing = {
  week: number;
  year: number;
  dateRange: string;
  summary: string;
  pdf: string;
};

export const briefings: Briefing[] = [
  {
    week: 14,
    year: 2026,
    dateRange: 'Mar 30 – Apr 5',
    summary: 'Funding signals, executive moves, and the recruiter playbook for Week 14.',
    pdf: '/briefings/gtm-radar-2026-w14.pdf',
  },
  {
    week: 15,
    year: 2026,
    dateRange: 'Apr 6 – Apr 12',
    summary: 'Mercury hiring, Brex integration economics, Harvey-Axiom, and playbook.',
    pdf: '/briefings/gtm-radar-2026-w15.pdf',
  },
  {
    week: 16,
    year: 2026,
    dateRange: 'Apr 13 – Apr 19',
    summary: 'Atlassian AI governance release, Ramp valuation reset, Salesloft, and playbook.',
    pdf: '/briefings/gtm-radar-2026-w16.pdf',
  },
  {
    week: 17,
    year: 2026,
    dateRange: 'Apr 20 – Apr 26',
    summary: 'Watchlist expansion surfaces 4 launches at AI-native CX cohort: Sierra (Paris), Crescendo ($100M ARR + UK), Clay (MCP), Decagon (GCP).',
    pdf: '/briefings/gtm-radar-2026-w17.pdf',
  },
];

export const loomEmbedUrl = '';

export const memo = {
  title: 'How GTM Radar scales inside a retained search firm',
  summary: 'A one-page memo on how GTM Radar could scale inside a retained search firm.',
  pdf: '/briefings/gtm-radar-memo.pdf',
};

export const methodology = {
  title: 'Methodology & Decision Log',
  summary: 'How the watchlist was built — five buckets, three filters, the scoring rubric, and every pivotal scope call made during the build.',
  pdf: '/briefings/gtm-radar-methodology.pdf',
};
