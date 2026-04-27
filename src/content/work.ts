export type Link = {
  label: string;
  url: string;
  kind: 'web' | 'instagram';
};

export type Photo = {
  src: string;
  alt?: string;
  caption?: string;
  featured?: boolean;
};

export type Role = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  photos?: Photo[];
  links?: Link[];
};

export const roles: Role[] = [
  {
    id: 'experiential',
    title: 'Experiential Production',
    subtitle: 'Producer / Artist Liaison · Stichting Tenclub · Wildeburg · Landjuweel · Into the Woods · ADE · Lightning in a Bottle · Insider Expeditions',
    body:
      "Producing across venues, festivals, and expeditions — Stichting Tenclub in Amsterdam, the Dutch festival circuit (Wildeburg, Landjuweel, Into the Woods, ADE), California's Lightning in a Bottle, and luxury trips through Antarctica, the Bahamas, Egypt, and Brazil with Insider Expeditions. Calm-under-pressure work — translating creative vision into live reality.",
    photos: [
      { src: '/photos/work/experiential-1.jpg' },
      { src: '/photos/work/experiential-4.jpeg', featured: true },
      {
        src: '/photos/work/experiential-10.jpeg',
        alt: 'Site map review at Lightning in a Bottle, produced by Do LaB, 2025',
        caption: 'Site map review · Lightning in a Bottle · Do LaB · 2025',
        featured: true,
      },
      { src: '/photos/work/experiential-2.png' },
      { src: '/photos/work/experiential-3.jpeg' },
      { src: '/photos/work/experiential-5.jpeg' },
      { src: '/photos/work/experiential-6.jpeg' },
      { src: '/photos/work/experiential-7.jpeg' },
      { src: '/photos/work/experiential-8.jpeg' },
      { src: '/photos/work/experiential-9.jpeg' },
    ],
    links: [
      { label: 'Stichting Tenclub', url: 'https://tenclub.nl/', kind: 'web' },
      { label: '@tenclub_theartofcuriosity', url: 'https://www.instagram.com/tenclub_theartofcuriosity/', kind: 'instagram' },
      { label: 'Wildeburg', url: 'https://wildeburg.nl/', kind: 'web' },
      { label: '@wildeburg', url: 'https://www.instagram.com/wildeburg/', kind: 'instagram' },
      { label: 'Landjuweel', url: 'https://ruigoord.nl/en/ruigoord-gatherings/landjuweel/', kind: 'web' },
      { label: '@landjuweel.festival', url: 'https://www.instagram.com/landjuweel.festival/', kind: 'instagram' },
      { label: '@intothewoodsfestival', url: 'https://www.instagram.com/intothewoodsfestival/', kind: 'instagram' },
      { label: 'ADE', url: 'https://www.amsterdam-dance-event.nl/', kind: 'web' },
      { label: '@amsterdamdanceevent', url: 'https://www.instagram.com/amsterdamdanceevent/', kind: 'instagram' },
      { label: 'Lightning in a Bottle', url: 'https://www.libfestival.org/', kind: 'web' },
      { label: '@libfestival', url: 'https://www.instagram.com/libfestival/', kind: 'instagram' },
      { label: 'Insider Expeditions', url: 'https://insiderexpeditions.com/', kind: 'web' },
      { label: '@insiderexpeditions', url: 'https://www.instagram.com/insiderexpeditions/', kind: 'instagram' },
    ],
  },
  {
    id: 'neptune',
    title: 'Neptune Retail Solutions',
    subtitle: 'Account Manager · CPG portfolio',
    body:
      'Directly managed $3M+ per year in CPG campaigns (~$6–7M total across tenure), plus $5–6M more as second or third on the account. Clients: Beyond Meat, FIJI, POM, Wonderful Pistachios, GoodRx, Ripple, Sapporo, Halo Top, Hormel, Lakers.',
    photos: [
      { src: '/photos/work/neptune-1.jpg' },
      { src: '/photos/work/neptune-2.JPG' },
      { src: '/photos/work/neptune-3.JPG' },
      { src: '/photos/work/neptune-4.JPG' },
      { src: '/photos/work/neptune-5.JPG' },
    ],
    links: [
      { label: 'neptuneretailsolutions.com', url: 'https://neptuneretailsolutions.com/', kind: 'web' },
    ],
  },
];

export const education = [
  { school: 'University of Colorado Boulder', detail: 'BA Strategic Communications' },
  { school: 'Santa Monica College', detail: '' },
];
