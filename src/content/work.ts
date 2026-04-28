export type Link = {
  label: string;
  url: string;
  kind: 'web' | 'instagram';
};

export type Photo = {
  src: string;
  alt?: string;
  caption?: string;
  body?: string;
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
    body: [
      'Owned the customer experience end-to-end on programs where the stakes were live and the room was full.',
      'Artist liaison and producer at Tenclub (Amsterdam), the Dutch festival circuit — Wildeburg, Landjuweel, Into the Woods, ADE — and Lightning in a Bottle in California. The seat where artist contracts, sponsor activations, ops vendors, and creative direction collide, and someone has to make the call in real time.',
      'Onboard producer for Insider Expeditions in Antarctica and the Bahamas; trip design and sales for Egypt and Brazil.',
      "The thread under all of it: translate a creative vision into operational reality, manage stakeholders with conflicting incentives, and deliver under conditions that don't tolerate a second take. The same operator skill that scales inside an early-stage GTM team.",
    ].join('\n\n'),
    photos: [
      { src: '/photos/work/experiential-4.jpeg', caption: 'On-site · Lightning in a Bottle' },
      {
        src: '/photos/work/experiential-2.png',
        caption: 'Site build with Willem Jan de Graaff, stage & art producer · Lightning in a Bottle · Do LaB',
        featured: true,
      },
      {
        src: '/photos/work/Landjuweel-6.jpg',
        alt: 'Kyle looking at art at Landjuweel festival, Ruigoord, Amsterdam',
        caption: 'Landjuweel · Ruigoord, NL · 📸 @cassadycreationsc',
        body:
          "A legendary arts, culture, and music festival rooted in Amsterdam's free-spirited community. Born in the 1970s from a squatter movement resisting port expansion, the area was legalized in 2000 and now thrives as a hub for creativity and self-expression. Landjuweel is its largest annual gathering, radiating art, music, and loving energy. Every year feels like a once-in-a-lifetime experience. 💼🔊 @houseofchicollective @landjuweel.festival",
        featured: true,
      },
      { src: '/photos/work/experiential-3.jpeg', caption: 'Soundcheck · Lightning in a Bottle' },
      { src: '/photos/work/tenclub.jpg', caption: 'Stichting Tenclub · Amsterdam' },
      { src: '/photos/work/Landjuweel-5.jpg', caption: 'Landjuweel · Ruigoord, NL' },
      { src: '/photos/work/experiential-1.jpg', caption: 'With Annemieke Jonas, head of pre-production · Into the Woods' },
      { src: '/photos/work/experiential-5.jpeg', caption: 'Onboard · Insider Expeditions · Bahamas' },
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
      { src: '/photos/work/neptune-2.JPG' },
      { src: '/photos/work/neptune-3.JPG' },
      { src: '/photos/work/neptune-4.JPG' },
      { src: '/photos/work/neptune-5.JPG' },
      { src: '/photos/work/neptune-6.JPG' },
    ],
    links: [
      { label: 'neptuneretailsolutions.com', url: 'https://neptuneretailsolutions.com/', kind: 'web' },
    ],
  },
];

export const education = [
  {
    school: 'University of Colorado Boulder',
    detail: 'BA Strategic Communications, Minor in Leadership Studies · 2019',
  },
  {
    school: 'Santa Monica College',
    detail: 'AA · 2016 (transferred to CU Boulder)',
  },
];
