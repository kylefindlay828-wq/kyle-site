export type Link = {
  label: string;
  url: string;
  kind: 'web' | 'instagram';
};

export type Role = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  photo?: string;
  detailPhotos?: string[];
  links?: Link[];
};

export const roles: Role[] = [
  {
    id: 'tenclub',
    title: 'Stichting Tenclub',
    subtitle: 'Producer · Amsterdam',
    body:
      "A member-based creative society in central Amsterdam for the arts, poetry, science, and the abstract — a curious-minded crowd in a room full of art deco and copper bath tubs. I produce. Ideas in, live events out.",
    photo: '/photos/work/tenclub.jpg',
    links: [
      { label: 'tenclub.nl', url: 'https://tenclub.nl/', kind: 'web' },
      { label: '@tenclub_theartofcuriosity', url: 'https://www.instagram.com/tenclub_theartofcuriosity/', kind: 'instagram' },
    ],
  },
  {
    id: 'festivals',
    title: 'Festival Production',
    subtitle: 'Producer / Artist Liaison · Wildeburg · Landjuweel · Into the Woods · ADE · Lightning in a Bottle',
    body:
      "The festivals I come back to. Backstage production and artist support across the Dutch festival circuit and California's Lightning in a Bottle — calm-under-pressure work with crews and performers, translating creative vision into live reality.",
    photo: '/photos/work/festivals.jpg',
    links: [
      { label: 'Wildeburg', url: 'https://wildeburg.nl/', kind: 'web' },
      { label: '@wildeburg', url: 'https://www.instagram.com/wildeburg/', kind: 'instagram' },
      { label: 'Landjuweel', url: 'https://ruigoord.nl/en/ruigoord-gatherings/landjuweel/', kind: 'web' },
      { label: '@landjuweel.festival', url: 'https://www.instagram.com/landjuweel.festival/', kind: 'instagram' },
      { label: '@intothewoodsfestival', url: 'https://www.instagram.com/intothewoodsfestival/', kind: 'instagram' },
      { label: 'ADE', url: 'https://www.amsterdam-dance-event.nl/', kind: 'web' },
      { label: '@amsterdamdanceevent', url: 'https://www.instagram.com/amsterdamdanceevent/', kind: 'instagram' },
      { label: 'Lightning in a Bottle', url: 'https://www.libfestival.org/', kind: 'web' },
      { label: '@libfestival', url: 'https://www.instagram.com/libfestival/', kind: 'instagram' },
    ],
  },
  {
    id: 'insider',
    title: 'Insider Expeditions',
    subtitle: 'Assistant Producer · Antarctica · Bahamas · Egypt · Brazil',
    body:
      "Luxury expedition production for high-touch groups traveling to places most people only see on postcards. Pre-production, sales, logistics, on-site delivery — the human-first work of making a complicated trip feel effortless to the people on it.",
    photo: '/photos/work/insider.jpg',
    links: [
      { label: 'insiderexpeditions.com', url: 'https://insiderexpeditions.com/', kind: 'web' },
      { label: '@insiderexpeditions', url: 'https://www.instagram.com/insiderexpeditions/', kind: 'instagram' },
    ],
  },
  {
    id: 'neptune',
    title: 'Neptune Retail Solutions',
    subtitle: 'Account Manager · CPG portfolio',
    body:
      'Directly managed $3M+ per year in CPG campaigns (~$6–7M total across tenure), plus $5–6M more as second or third on the account. Clients: Beyond Meat, FIJI, POM, Wonderful Pistachios, GoodRx, Ripple, Sapporo, Halo Top, Hormel, Lakers.',
    photo: '/photos/work/neptune.jpg',
    links: [
      { label: 'neptuneretailsolutions.com', url: 'https://neptuneretailsolutions.com/', kind: 'web' },
    ],
  },
  {
    id: 'wilde',
    title: 'Wilde Brands',
    subtitle: 'Marketing · Boulder, CO',
    body:
      'Early marketing at a challenger CPG brand out of Boulder. Launch campaigns, retail work, and the scrappy do-it-all startup stretch that teaches you what matters.',
    photo: '/photos/work/wilde.jpg',
    links: [
      { label: 'wildebrands.com', url: 'https://www.wildebrands.com/', kind: 'web' },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: 'CU Boulder · Santa Monica College',
    body:
      'BA Strategic Communications, University of Colorado Boulder. Started at Santa Monica College.',
    photo: '/photos/work/education.jpg',
    links: [],
  },
];
