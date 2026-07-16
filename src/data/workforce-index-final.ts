// Source of truth for the FINAL Workforce Transformation Index (/proofworks).
// GROUNDED EDITION — bubble positions and sizes are now derived from public data:
//   x  = AI task exposure            → Eloundou et al. 2023 ("GPTs are GPTs")
//   y  = augmentation vs. automation → Anthropic Economic Index (assist vs. replace)
//   r  = U.S. employment in the mapped occupations → BLS OEWS (May 2025)
// Each cluster carries a `metrics` block with the figures + source URLs shown in
// the detail panel, so every position is traceable.
export type Source = { label: string; short: string; url: string };
export type Metrics = {
  occupations: string; // dominant BLS occupations mapped
  employment: string; // headline employment figure
  exposure: string; // AI task-exposure band + source
  lean: string; // augmentation vs automation + source
  sources: Source[];
};
export type Cluster = {
  id: string; label: string; x: number; y: number; r: number;
  dir: 'E' | 'W' | 'N' | 'S' | 'NE' | 'NW' | 'SE' | 'SW'; // preferred label side
  zone: 'priority' | 'develop' | 'automate' | 'watch' | 'ai';
  zoneLabel: string; color: string; opportunity: string;
  industries: string[]; roles: string[]; summary: string;
  whyChanging: string[]; internalDevelopment: string[]; externalHiring: string[];
  metrics: Metrics;
  marketExamples?: string[];
};

const BLS: Source = { label: 'BLS Occupational Employment & Wage Statistics (May 2025)', short: 'BLS OEWS ↗', url: 'https://www.bls.gov/oes/' };
const ELO: Source = { label: 'Eloundou et al. 2023 — “GPTs are GPTs” (LLM occupational exposure)', short: 'Eloundou et al. 2023 ↗', url: 'https://arxiv.org/abs/2303.10130' };
const AEI: Source = { label: 'Anthropic Economic Index (augmentation vs. automation)', short: 'Anthropic Economic Index ↗', url: 'https://www.anthropic.com/news/the-anthropic-economic-index' };

export const clusters: Cluster[] = [
  {
    id: 'field-service-operations', label: 'Field-service operations', x: 6.2, y: 6.6, r: 14, dir: 'W',
    zone: 'develop', zoneLabel: 'Develop selectively', color: '#6fb0d8', opportunity: 'medium',
    industries: ['HVAC', 'Plumbing', 'Electrical', 'Facilities services', 'Appliance repair'],
    roles: ['Dispatcher', 'Estimator', 'Scheduler', 'Service coordinator', 'Branch operator', 'Field sales representative', 'Service manager', 'Route planner', 'Parts coordinator', 'Operations supervisor'],
    summary: 'Large, fragmented service businesses with workflow-heavy coordination and significant room to develop trusted internal operators.',
    whyChanging: ['Scheduling and dispatch are becoming more data-driven', 'Estimating and customer communication can be accelerated', 'Branches need people who can connect tools to real operations'],
    internalDevelopment: ['Dispatchers into workflow leads', 'Estimators into pricing and systems roles', 'Coordinators into implementation roles'],
    externalHiring: ['Technical workflow builders', 'Systems implementation specialists'],
    metrics: {
      occupations: 'Dispatchers, exc. police/fire (SOC 43-5032)',
      employment: '≈219,000 dispatchers',
      exposure: 'Medium — scheduling & comms tasks partly exposed (Eloundou 2023)',
      lean: 'Augmentation-leaning — coordinates physical work (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'healthcare-administration', label: 'Healthcare administration', x: 7.4, y: 6.7, r: 21, dir: 'S',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'large',
    industries: ['Hospital systems', 'Clinics', 'Dental groups', 'Home health', 'Behavioral health'],
    roles: ['Patient-access representative', 'Scheduling coordinator', 'Intake specialist', 'Medical biller', 'Claims specialist', 'Revenue-cycle analyst', 'Care coordinator', 'Prior-authorization specialist', 'Patient-operations lead', 'Practice administrator'],
    summary: 'A large administrative workforce with complex workflows, high coordination needs, and strong internal-development potential.',
    whyChanging: ['Documentation and intake are increasingly software-mediated', 'Scheduling and claims workflows are under cost pressure', 'Human judgment remains important in exceptions and patient coordination'],
    internalDevelopment: ['Schedulers into patient-operations leads', 'Claims staff into workflow and quality roles', 'Coordinators into implementation roles'],
    externalHiring: ['Healthcare workflow specialists', 'Automation and integration builders'],
    metrics: {
      occupations: 'Medical secretaries (43-6013), billing (43-3021) & claims clerks (43-9041)',
      employment: '≈1.5M across mapped roles',
      exposure: 'Medium–high — records, billing & intake tasks exposed (Eloundou 2023)',
      lean: 'Mixed — clerical automates, coordination augments (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'logistics-coordination', label: 'Logistics coordination', x: 6.3, y: 6.4, r: 15, dir: 'W',
    zone: 'develop', zoneLabel: 'Develop selectively', color: '#6fb0d8', opportunity: 'medium',
    industries: ['Trucking', 'Freight forwarding', 'Warehousing', 'Distribution', 'Last-mile delivery'],
    roles: ['Dispatcher', 'Fleet coordinator', 'Carrier manager', 'Transportation planner', 'Warehouse coordinator', 'Load planner', 'Freight broker', 'Supply-chain analyst', 'Import/export coordinator', 'Operations coordinator'],
    summary: 'Large operator populations and measurable gains from better routing, communication, exception handling, and planning.',
    whyChanging: ['Routing and planning are becoming more automated', 'Operators still manage exceptions and relationships', 'Workflow improvements can be measured in time, cost, and errors'],
    internalDevelopment: ['Dispatchers into network-operations roles', 'Coordinators into planning and systems roles', 'Account managers into logistics intelligence roles'],
    externalHiring: ['Workflow implementation specialists', 'Data and integration talent'],
    metrics: {
      occupations: 'Cargo & freight agents (43-5011), transport/distribution mgrs (11-3071)',
      employment: '≈317,000 across mapped roles',
      exposure: 'Medium — documentation & planning tasks exposed (Eloundou 2023)',
      lean: 'Augmentation-leaning — humans own exceptions (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'insurance-operations', label: 'Insurance operations', x: 8.7, y: 7.8, r: 18, dir: 'E',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'medium-large',
    industries: ['Property and casualty', 'Health insurance', 'Benefits administration', 'Specialty insurance'],
    roles: ['Claims coordinator', 'Underwriting assistant', 'Policy-operations specialist', 'Compliance analyst', 'Customer-operations representative', 'Claims adjuster', 'Billing specialist', 'Underwriter', 'Operations analyst', 'Renewals specialist'],
    summary: 'Document-heavy, rules-heavy work with significant judgment, exceptions, and customer impact.',
    whyChanging: ['Document review and summarization are accelerating', 'Exception handling remains human-intensive', 'Compliance and customer workflows require traceability'],
    internalDevelopment: ['Claims staff into exception-management roles', 'Policy operations into workflow-design roles', 'Compliance staff into evaluation roles'],
    externalHiring: ['Insurance automation specialists', 'Technical compliance builders'],
    metrics: {
      occupations: 'Claims adjusters (13-1031), underwriters (13-2053), policy clerks (43-9041)',
      employment: '≈740,000 across mapped roles',
      exposure: 'High — document- & rules-heavy tasks strongly exposed (Eloundou 2023)',
      lean: 'Augmentation-leaning — judgment & exceptions stay human (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'construction-planning', label: 'Construction planning', x: 7.6, y: 7.5, r: 14, dir: 'N',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'medium',
    industries: ['Commercial construction', 'Residential building', 'Infrastructure', 'Specialty contractors'],
    roles: ['Estimator', 'Scheduler', 'Project coordinator', 'Procurement analyst', 'BIM specialist', 'Project manager', 'Preconstruction manager', 'Cost analyst', 'Planning manager', 'Project-controls analyst'],
    summary: 'Planning and coordination are increasingly software-mediated while field knowledge remains highly valuable.',
    whyChanging: ['Preconstruction modeling is becoming more capable', 'Estimating and scheduling workflows are increasingly integrated', 'Project risk can be identified earlier'],
    internalDevelopment: ['Estimators into preconstruction systems roles', 'Project coordinators into implementation roles', 'Schedulers into planning-intelligence roles'],
    externalHiring: ['BIM and data specialists', 'Workflow integration talent'],
    metrics: {
      occupations: 'Cost estimators (13-1051); schedulers under project-mgmt specialists',
      employment: '≈221,000 cost estimators',
      exposure: 'Medium–high — estimating & analytical tasks exposed (Eloundou 2023)',
      lean: 'Augmentation-leaning — field knowledge stays valuable (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'manufacturing-planning', label: 'Manufacturing planning', x: 6.8, y: 7.1, r: 19, dir: 'W',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'medium-large',
    industries: ['Industrial manufacturing', 'Automotive', 'Consumer goods', 'Food production'],
    roles: ['Production planner', 'Procurement coordinator', 'Quality coordinator', 'Maintenance planner', 'Supply planner', 'Materials manager', 'Scheduling analyst', 'Process engineer', 'Inventory analyst', 'Operations planner'],
    summary: 'Valuable operational knowledge, complex dependencies, and growing pressure to connect planning systems with frontline reality.',
    whyChanging: ['Planning systems are becoming more predictive', 'Maintenance and quality workflows are becoming data-rich', 'Operational context remains hard to replace'],
    internalDevelopment: ['Planners into systems and optimization roles', 'Quality staff into evaluation roles', 'Maintenance coordinators into predictive-operations roles'],
    externalHiring: ['Industrial data specialists', 'Systems integration talent'],
    metrics: {
      occupations: 'Production/planning clerks (43-5061), purchasing agents (13-1023)',
      employment: '≈911,000 across mapped roles',
      exposure: 'Medium — planning & procurement documentation exposed (Eloundou 2023)',
      lean: 'Augmentation-leaning — operational context hard to replace (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'customer-account-operations', label: 'Customer / account operations', x: 8.6, y: 6.9, r: 27, dir: 'SE',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'very large',
    industries: ['Software', 'Professional services', 'Healthcare', 'Financial services', 'Retail'],
    roles: ['Account manager', 'Customer-success manager', 'Onboarding specialist', 'Renewals manager', 'Support lead', 'Account director', 'Implementation specialist', 'Client-services manager', 'Partnerships manager', 'Customer-operations analyst'],
    summary: 'Relationship judgment remains important while tooling rapidly changes research, communication, and account management.',
    whyChanging: ['Account intelligence can be assembled faster', 'Risk and renewal signals can be surfaced earlier', 'Routine communication can be automated'],
    internalDevelopment: ['Account managers into customer-intelligence roles', 'CSMs into workflow and adoption roles', 'Support leads into systems roles'],
    externalHiring: ['Customer-systems specialists', 'Automation and analytics talent'],
    metrics: {
      occupations: 'Customer service reps (43-4051), sales managers (11-2022)',
      employment: '≈3.4M across mapped roles',
      exposure: 'High — CSRs among the most-exposed occupations (Eloundou 2023)',
      lean: 'Mixed — live response assist, some automation (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'professional-services', label: 'Professional services', x: 8.3, y: 8.3, r: 27, dir: 'N',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'very large',
    industries: ['Consulting', 'Accounting', 'Legal services', 'Agencies'],
    roles: ['Engagement manager', 'Analyst', 'Project manager', 'Client-services lead', 'Operations manager', 'Consultant', 'Delivery manager', 'Practice coordinator', 'Resource manager', 'Associate'],
    summary: 'High-value knowledge work and meaningful budgets, but a more competitive and already-served market.',
    whyChanging: ['Research and synthesis are accelerating', 'Delivery models are becoming more productized', 'Clients expect faster output'],
    internalDevelopment: ['Analysts into systems-assisted advisory roles', 'Engagement managers into workflow-design roles', 'Operations managers into automation roles'],
    externalHiring: ['Domain-specific builders', 'Knowledge-systems specialists'],
    metrics: {
      occupations: 'Management analysts (13-1111), accountants (13-2011), PM specialists (13-1082)',
      employment: '≈3.7M across mapped roles',
      exposure: 'High — accountants named “fully exposed”; analyst work highly exposed (Eloundou 2023)',
      lean: 'Augmentation-leaning — advisory judgment stays human (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'property-operations', label: 'Property operations', x: 6.0, y: 6.3, r: 16, dir: 'SW',
    zone: 'develop', zoneLabel: 'Develop selectively', color: '#6fb0d8', opportunity: 'medium',
    industries: ['Property management', 'Real-estate services', 'Facilities management', 'Multifamily housing'],
    roles: ['Property coordinator', 'Maintenance scheduler', 'Leasing-operations specialist', 'Vendor manager', 'Regional operator', 'Assistant property manager', 'Facilities coordinator', 'Resident-services lead', 'Operations manager', 'Portfolio analyst'],
    summary: 'Recurring coordination, vendor management, and fragmented systems create room for internal operator development.',
    whyChanging: ['Scheduling and resident communication can be streamlined', 'Vendor and maintenance workflows are fragmented', 'Regional visibility is often weak'],
    internalDevelopment: ['Coordinators into operations-systems roles', 'Schedulers into workflow leads', 'Regional operators into implementation roles'],
    externalHiring: ['Property-technology implementation talent', 'Systems integration specialists'],
    metrics: {
      occupations: 'Property, real-estate & community-assoc. managers (11-9141)',
      employment: '≈466,000 property managers',
      exposure: 'Medium — admin & comms exposed; on-site work is not (Eloundou 2023)',
      lean: 'Augmentation-leaning (AEI); varies widely within the code',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'public-administration', label: 'Public administration', x: 7.0, y: 6.0, r: 17, dir: 'S',
    zone: 'develop', zoneLabel: 'Develop selectively', color: '#6fb0d8', opportunity: 'medium',
    industries: ['Federal government', 'State government', 'Municipal government', 'Education administration'],
    roles: ['Program coordinator', 'Benefits administrator', 'Case-operations specialist', 'Procurement analyst', 'Compliance officer', 'Scheduling coordinator', 'Grants administrator', 'Policy analyst', 'Records manager', 'Program manager'],
    summary: 'Large workforces and high development value, but slower adoption and buying cycles.',
    whyChanging: ['Case and benefits workflows are document-heavy', 'Procurement and compliance require traceability', 'Public systems often have significant process debt'],
    internalDevelopment: ['Program staff into service-design roles', 'Case operations into workflow roles', 'Procurement staff into systems roles'],
    externalHiring: ['Civic-technology implementation talent', 'Security and compliance specialists'],
    metrics: {
      occupations: 'Eligibility interviewers, govt (43-4061), compliance officers (13-1041)',
      employment: '≈585,000 across mapped roles (lower-bound subset)',
      exposure: 'Medium–high — eligibility & case work is rules-based (Eloundou 2023)',
      lean: 'Mixed — records automate, casework augments (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'hospitality-operations', label: 'Hospitality operations', x: 5.2, y: 5.6, r: 16, dir: 'SW',
    zone: 'develop', zoneLabel: 'Develop selectively', color: '#6fb0d8', opportunity: 'medium',
    industries: ['Restaurants', 'Hotels', 'Venues', 'Travel operations'],
    roles: ['General manager', 'Scheduling coordinator', 'Revenue manager', 'Guest-operations lead', 'Event-operations manager', 'Front-office manager', 'Food & beverage manager', 'Multi-unit operator', 'Reservations manager', 'Operations supervisor'],
    summary: 'Large workforces but uneven budgets; the opportunity is concentrated in management, scheduling, revenue, and multi-unit operations.',
    whyChanging: ['Scheduling and demand planning are becoming more automated', 'Multi-unit operators need better visibility', 'Frontline work remains physical'],
    internalDevelopment: ['Managers into multi-unit systems roles', 'Schedulers into workforce-planning roles', 'Guest operations into experience systems roles'],
    externalHiring: ['Hospitality systems specialists', 'Revenue-operations talent'],
    metrics: {
      occupations: 'Food-service managers (11-9051), lodging managers (11-9081)',
      employment: '≈405,000 across mapped roles',
      exposure: 'Low–medium — scheduling exposed; service delivery is physical (Eloundou 2023)',
      lean: 'Mixed — physical service limits automation (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'ai-labs-technical-talent', label: 'AI labs / technical talent', x: 9.3, y: 8.0, r: 22, dir: 'E',
    zone: 'ai', zoneLabel: 'AI labs', color: '#9b7ff0', opportunity: 'large',
    industries: ['Frontier AI labs', 'AI infrastructure', 'Software', 'Cybersecurity', 'Specialized technical services'],
    roles: ['Software engineer', 'ML engineer', 'Research engineer', 'Technical product manager', 'AI-infrastructure engineer', 'Applied-AI operator', 'Data engineer', 'Research scientist', 'Solutions engineer', 'Evaluation specialist'],
    summary: 'A smaller workforce than many distributed service sectors, but extremely high spend per worker and a crowded talent market.',
    whyChanging: ['Tooling and capability requirements change quickly', 'Demand is concentrated among fewer, high-spending employers', 'Specialized technical talent commands premium pricing'],
    internalDevelopment: ['Engineers into AI-systems and agent-infrastructure roles', 'Technical product managers into applied-AI workflow roles', 'Operators into evaluation, deployment, and implementation roles'],
    externalHiring: ['Specialist research and engineering talent', 'AI infrastructure and deployment specialists'],
    metrics: {
      occupations: 'Software developers (15-1252); ML/research eng. subsumed here',
      employment: '≈1.7M software developers',
      exposure: 'Highest — Computer & Math is 37.2% of all Claude usage (AEI)',
      lean: 'Augmentation-leaning — but a crowded, high-spend talent market (AEI)',
      sources: [BLS, AEI, ELO],
    },
    marketExamples: ['Mercor and other technical-talent marketplaces', 'Specialized AI recruiting platforms', 'Expert networks serving frontier labs'],
  },
  {
    id: 'routine-clerical', label: 'Routine clerical work', x: 8.7, y: 3.2, r: 29, dir: 'E',
    zone: 'automate', zoneLabel: 'Automate or redesign', color: '#d67a5f', opportunity: 'very large',
    industries: ['Cross-industry'],
    roles: ['Data-entry clerk', 'Reporting analyst', 'Invoice processor', 'Transcriptionist', 'Administrative assistant', 'File clerk', 'Order processor', 'Records clerk'],
    summary: 'High automation pressure and weaker economics for heavy development investment in the existing task bundle.',
    whyChanging: ['Tasks are standardized and repetitive', 'Work is highly computer-mediated', 'Automation can remove large portions of the role'],
    internalDevelopment: ['Move high-potential employees into exception handling', 'Develop coordination and quality-control capability'],
    externalHiring: ['Automation operators and supervisors'],
    metrics: {
      occupations: 'Data-entry keyers (43-9021), office clerks (43-9061), bookkeeping clerks (43-3031)',
      employment: '≈4.4M across mapped roles',
      exposure: 'High — routine text & record tasks directly exposed (Eloundou 2023)',
      lean: 'Automation-leaning — large parts of the task bundle can be removed (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
  {
    id: 'frontline-physical', label: 'Frontline physical work', x: 4.0, y: 4.3, r: 31, dir: 'W',
    zone: 'watch', zoneLabel: 'Watch, don\'t lead', color: '#7c8695', opportunity: 'very large',
    industries: ['Construction', 'Hospitality', 'Janitorial services', 'Warehousing', 'Agriculture'],
    roles: ['Laborer', 'Cleaner', 'Line worker', 'Warehouse handler', 'Grounds worker', 'Machine operator', 'Assembler', 'Material handler'],
    summary: 'Large workforce but less direct workflow ownership; opportunity may emerge through movement into supervision, coordination, and planning.',
    whyChanging: ['Physical tasks remain difficult to automate', 'Digital tools may improve scheduling and supervision', 'The strongest pathway may be upward mobility rather than role redesign'],
    internalDevelopment: ['Frontline workers into leads and supervisors', 'Experienced workers into scheduling and quality roles'],
    externalHiring: ['Operational technology and implementation talent'],
    metrics: {
      occupations: 'Laborers & material movers (53-7062), janitors & cleaners (37-2011)',
      employment: '≈5.4M across mapped roles',
      exposure: 'Low — physical-labor occupations are in the least-exposed set (Eloundou 2023)',
      lean: 'Minimal direct AI exposure; pathway is upward mobility (AEI)',
      sources: [BLS, ELO, AEI],
    },
  },
];

export const notes = {
  unitOfAnalysis: 'Work clusters (groups of related occupations), not whole industries',
  xAxis: 'AI task exposure — Eloundou et al. 2023, “GPTs are GPTs”',
  yAxis: 'Augmentation vs. automation lean — Anthropic Economic Index',
  bubbleSize: 'U.S. employment in the mapped occupations — BLS OEWS, May 2025',
  sources: [BLS, ELO, AEI] as Source[],
  caveat: 'Positions are banded from public exposure/usage research (not a proprietary score); employment reflects the mapped occupations and may include minor cross-cluster overlap.',
};
