export type Company = { name: string; domain: string; addedW17?: boolean };

export type Bucket = {
  key: string;
  label: string;
  companies: Company[];
};

export const watchlist: Bucket[] = [
  {
    key: 'ai_native',
    label: 'AI-Native',
    companies: [
      { name: 'Harvey', domain: 'harvey.ai' },
      { name: 'Writer', domain: 'writer.com' },
      { name: 'Glean', domain: 'glean.com' },
      { name: 'Cresta', domain: 'cresta.com' },
      { name: 'Observe.AI', domain: 'observe.ai' },
      { name: 'Electric', domain: 'electric.ai' },
      { name: 'Gong', domain: 'gong.io' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Sierra', domain: 'sierra.ai', addedW17: true },
      { name: 'Decagon', domain: 'decagon.ai', addedW17: true },
      { name: 'Hebbia', domain: 'hebbia.com', addedW17: true },
      { name: 'Forethought', domain: 'forethought.ai', addedW17: true },
      { name: 'Maven AGI', domain: 'mavenagi.com', addedW17: true },
      { name: 'Crescendo', domain: 'crescendo.ai', addedW17: true },
      { name: 'EvenUp', domain: 'evenuplaw.com', addedW17: true },
    ],
  },
  {
    key: 'revtech',
    label: 'RevTech',
    companies: [
      { name: 'Salesloft', domain: 'salesloft.com' },
      { name: 'Outreach', domain: 'outreach.io' },
      { name: 'Clari', domain: 'clari.com' },
      { name: '6sense', domain: '6sense.com' },
      { name: 'Demandbase', domain: 'demandbase.com' },
      { name: 'Apollo.io', domain: 'apollo.io' },
      { name: 'ZoomInfo', domain: 'zoominfo.com' },
      { name: 'Common Room', domain: 'commonroom.io' },
      { name: 'UserGems', domain: 'usergems.com' },
      { name: 'Clay', domain: 'clay.com', addedW17: true },
      { name: 'Sybill', domain: 'sybill.ai', addedW17: true },
      { name: 'Lavender', domain: 'lavender.ai', addedW17: true },
    ],
  },
  {
    key: 'fintech_cyber',
    label: 'Fintech + Cyber',
    companies: [
      { name: 'Ramp', domain: 'ramp.com' },
      { name: 'Brex', domain: 'brex.com' },
      { name: 'Mercury', domain: 'mercury.com' },
      { name: 'Rho', domain: 'rho.co' },
      { name: 'Abnormal Security', domain: 'abnormalsecurity.com' },
      { name: 'Vectra AI', domain: 'vectra.ai' },
      { name: 'Dropzone AI', domain: 'dropzone.ai' },
      { name: 'Prophet Security', domain: 'prophetsecurity.ai' },
      { name: 'Sysdig', domain: 'sysdig.com' },
      { name: 'Red Points', domain: 'redpoints.com' },
    ],
  },
  {
    key: 'ai_late_adopter',
    label: 'AI-Late Adopter',
    companies: [
      { name: 'Zendesk', domain: 'zendesk.com' },
      { name: 'DocuSign', domain: 'docusign.com' },
      { name: 'Box', domain: 'box.com' },
      { name: 'Dropbox', domain: 'dropbox.com' },
      { name: 'Twilio', domain: 'twilio.com' },
      { name: 'Intercom', domain: 'intercom.com' },
      { name: 'Okta', domain: 'okta.com' },
      { name: 'Atlassian', domain: 'atlassian.com' },
      { name: 'Asana', domain: 'asana.com' },
      { name: 'Monday.com', domain: 'monday.com' },
      { name: 'Smartsheet', domain: 'smartsheet.com' },
      { name: 'Zoom', domain: 'zoom.us' },
      { name: 'Samsara', domain: 'samsara.com' },
      { name: 'Klaviyo', domain: 'klaviyo.com' },
      { name: 'PagerDuty', domain: 'pagerduty.com', addedW17: true },
      { name: 'Procore', domain: 'procore.com', addedW17: true },
    ],
  },
  {
    key: 'incumbent_context',
    label: 'Incumbent Context',
    companies: [
      { name: 'HubSpot', domain: 'hubspot.com' },
      { name: 'Gainsight', domain: 'gainsight.com' },
    ],
  },
];

export const watchlistTotal = watchlist.reduce((n, b) => n + b.companies.length, 0);
