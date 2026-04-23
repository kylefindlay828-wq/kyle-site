export type Role = {
  company: string;
  subtitle?: string;
  period: string;
  summary: string;
};

export const roles: Role[] = [
  {
    company: 'Insider Expeditions',
    period: 'May 2025 – Mar 2026',
    summary:
      'Client operations and expedition logistics for a luxury travel company running high-touch programs for ultra-high-net-worth clients.',
  },
  {
    company: 'Amsterdam festivals',
    subtitle: 'Multiple clients',
    period: 'Jan 2022 – May 2025',
    summary:
      'International festival coordination across a roster of European clients — production, client ops, and on-site event execution.',
  },
  {
    company: 'Neptune Retail Solutions',
    subtitle: 'Formerly News America Marketing',
    period: 'Aug 2019 – Sep 2021',
    summary:
      'Directly managed $3M+ per year in CPG campaigns (~$6–7M total across tenure), plus another $5–6M across programs where I ran point as 2nd or 3rd on the account. Clients: Beyond Meat, FIJI, POM, Wonderful Pistachios, GoodRx, Ripple, Sapporo, Halo Top, Hormel, Lakers.',
  },
  {
    company: 'Wilde Brands',
    period: 'Nov 2018 – Jun 2019',
    summary: 'Marketing intern on a challenger CPG brand — contributed to launch campaigns and retail partnerships.',
  },
];

export const education = [
  { school: 'University of Colorado Boulder', detail: 'BA Strategic Communications' },
  { school: 'Santa Monica College', detail: '' },
];
