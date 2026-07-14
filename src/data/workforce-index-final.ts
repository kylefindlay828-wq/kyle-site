// Source of truth for the FINAL Workforce Transformation Index (/proofworks).
// Forked from workforce-index.ts so the V1/V2 pages keep rendering unchanged.
// Differences: full cluster names (labels attach directly to bubbles), roles
// expanded to 8–12 per cluster, and a `dir` hint for label placement.
export type Cluster = {
  id: string; label: string; x: number; y: number; r: number;
  dir: 'E' | 'W' | 'N' | 'S' | 'NE' | 'NW' | 'SE' | 'SW'; // preferred label side
  zone: 'priority' | 'develop' | 'automate' | 'watch' | 'ai';
  zoneLabel: string; color: string; opportunity: string;
  industries: string[]; roles: string[]; summary: string;
  whyChanging: string[]; internalDevelopment: string[]; externalHiring: string[];
  marketExamples?: string[];
};

export const clusters: Cluster[] = [
  {
    id: 'field-service-operations', label: 'Field-service operations', x: 8.6, y: 8.9, r: 26, dir: 'E',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'large',
    industries: ['HVAC', 'Plumbing', 'Electrical', 'Facilities services', 'Appliance repair'],
    roles: ['Dispatcher', 'Estimator', 'Scheduler', 'Service coordinator', 'Branch operator', 'Field sales representative', 'Service manager', 'Route planner', 'Parts coordinator', 'Operations supervisor'],
    summary: 'Large, fragmented service businesses with workflow-heavy coordination and significant room to develop trusted internal operators.',
    whyChanging: ['Scheduling and dispatch are becoming more data-driven', 'Estimating and customer communication can be accelerated', 'Branches need people who can connect tools to real operations'],
    internalDevelopment: ['Dispatchers into workflow leads', 'Estimators into pricing and systems roles', 'Coordinators into implementation roles'],
    externalHiring: ['Technical workflow builders', 'Systems implementation specialists'],
  },
  {
    id: 'healthcare-administration', label: 'Healthcare administration', x: 8.0, y: 9.15, r: 26, dir: 'N',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'large',
    industries: ['Hospital systems', 'Clinics', 'Dental groups', 'Home health', 'Behavioral health'],
    roles: ['Patient-access representative', 'Scheduling coordinator', 'Intake specialist', 'Medical biller', 'Claims specialist', 'Revenue-cycle analyst', 'Care coordinator', 'Prior-authorization specialist', 'Patient-operations lead', 'Practice administrator'],
    summary: 'A large administrative workforce with complex workflows, high coordination needs, and strong internal-development potential.',
    whyChanging: ['Documentation and intake are increasingly software-mediated', 'Scheduling and claims workflows are under cost pressure', 'Human judgment remains important in exceptions and patient coordination'],
    internalDevelopment: ['Schedulers into patient-operations leads', 'Claims staff into workflow and quality roles', 'Coordinators into implementation roles'],
    externalHiring: ['Healthcare workflow specialists', 'Automation and integration builders'],
  },
  {
    id: 'logistics-coordination', label: 'Logistics coordination', x: 8.75, y: 8.35, r: 26, dir: 'E',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'large',
    industries: ['Trucking', 'Freight forwarding', 'Warehousing', 'Distribution', 'Last-mile delivery'],
    roles: ['Dispatcher', 'Fleet coordinator', 'Carrier manager', 'Transportation planner', 'Warehouse coordinator', 'Load planner', 'Freight broker', 'Supply-chain analyst', 'Import/export coordinator', 'Operations coordinator'],
    summary: 'Large operator populations and measurable gains from better routing, communication, exception handling, and planning.',
    whyChanging: ['Routing and planning are becoming more automated', 'Operators still manage exceptions and relationships', 'Workflow improvements can be measured in time, cost, and errors'],
    internalDevelopment: ['Dispatchers into network-operations roles', 'Coordinators into planning and systems roles', 'Account managers into logistics intelligence roles'],
    externalHiring: ['Workflow implementation specialists', 'Data and integration talent'],
  },
  {
    id: 'insurance-operations', label: 'Insurance operations', x: 8.05, y: 8.1, r: 21, dir: 'SE',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'medium-large',
    industries: ['Property and casualty', 'Health insurance', 'Benefits administration', 'Specialty insurance'],
    roles: ['Claims coordinator', 'Underwriting assistant', 'Policy-operations specialist', 'Compliance analyst', 'Customer-operations representative', 'Claims adjuster', 'Billing specialist', 'Underwriter', 'Operations analyst', 'Renewals specialist'],
    summary: 'Document-heavy, rules-heavy work with significant judgment, exceptions, and customer impact.',
    whyChanging: ['Document review and summarization are accelerating', 'Exception handling remains human-intensive', 'Compliance and customer workflows require traceability'],
    internalDevelopment: ['Claims staff into exception-management roles', 'Policy operations into workflow-design roles', 'Compliance staff into evaluation roles'],
    externalHiring: ['Insurance automation specialists', 'Technical compliance builders'],
  },
  {
    id: 'construction-planning', label: 'Construction planning', x: 7.55, y: 8.05, r: 21, dir: 'W',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'medium-large',
    industries: ['Commercial construction', 'Residential building', 'Infrastructure', 'Specialty contractors'],
    roles: ['Estimator', 'Scheduler', 'Project coordinator', 'Procurement analyst', 'BIM specialist', 'Project manager', 'Preconstruction manager', 'Cost analyst', 'Planning manager', 'Project-controls analyst'],
    summary: 'Planning and coordination are increasingly software-mediated while field knowledge remains highly valuable.',
    whyChanging: ['Preconstruction modeling is becoming more capable', 'Estimating and scheduling workflows are increasingly integrated', 'Project risk can be identified earlier'],
    internalDevelopment: ['Estimators into preconstruction systems roles', 'Project coordinators into implementation roles', 'Schedulers into planning-intelligence roles'],
    externalHiring: ['BIM and data specialists', 'Workflow integration talent'],
  },
  {
    id: 'manufacturing-planning', label: 'Manufacturing planning', x: 7.25, y: 7.7, r: 26, dir: 'W',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'large',
    industries: ['Industrial manufacturing', 'Automotive', 'Consumer goods', 'Food production'],
    roles: ['Production planner', 'Procurement coordinator', 'Quality coordinator', 'Maintenance planner', 'Supply planner', 'Materials manager', 'Scheduling analyst', 'Process engineer', 'Inventory analyst', 'Operations planner'],
    summary: 'Valuable operational knowledge, complex dependencies, and growing pressure to connect planning systems with frontline reality.',
    whyChanging: ['Planning systems are becoming more predictive', 'Maintenance and quality workflows are becoming data-rich', 'Operational context remains hard to replace'],
    internalDevelopment: ['Planners into systems and optimization roles', 'Quality staff into evaluation roles', 'Maintenance coordinators into predictive-operations roles'],
    externalHiring: ['Industrial data specialists', 'Systems integration talent'],
  },
  {
    id: 'customer-account-operations', label: 'Customer / account operations', x: 8.2, y: 7.55, r: 26, dir: 'SE',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'large',
    industries: ['Software', 'Professional services', 'Healthcare', 'Financial services', 'Retail'],
    roles: ['Account manager', 'Customer-success manager', 'Onboarding specialist', 'Renewals manager', 'Support lead', 'Account director', 'Implementation specialist', 'Client-services manager', 'Partnerships manager', 'Customer-operations analyst'],
    summary: 'Relationship judgment remains important while tooling rapidly changes research, communication, and account management.',
    whyChanging: ['Account intelligence can be assembled faster', 'Risk and renewal signals can be surfaced earlier', 'Routine communication can be automated'],
    internalDevelopment: ['Account managers into customer-intelligence roles', 'CSMs into workflow and adoption roles', 'Support leads into systems roles'],
    externalHiring: ['Customer-systems specialists', 'Automation and analytics talent'],
  },
  {
    id: 'professional-services', label: 'Professional services', x: 7.65, y: 7.35, r: 16, dir: 'S',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'medium',
    industries: ['Consulting', 'Accounting', 'Legal services', 'Agencies'],
    roles: ['Engagement manager', 'Analyst', 'Project manager', 'Client-services lead', 'Operations manager', 'Consultant', 'Delivery manager', 'Practice coordinator', 'Resource manager', 'Associate'],
    summary: 'High-value knowledge work and meaningful budgets, but a more competitive and already-served market.',
    whyChanging: ['Research and synthesis are accelerating', 'Delivery models are becoming more productized', 'Clients expect faster output'],
    internalDevelopment: ['Analysts into systems-assisted advisory roles', 'Engagement managers into workflow-design roles', 'Operations managers into automation roles'],
    externalHiring: ['Domain-specific builders', 'Knowledge-systems specialists'],
  },
  {
    id: 'property-operations', label: 'Property operations', x: 7.05, y: 7.3, r: 16, dir: 'SW',
    zone: 'priority', zoneLabel: 'Build before replacing', color: '#4c9dff', opportunity: 'medium',
    industries: ['Property management', 'Real-estate services', 'Facilities management', 'Multifamily housing'],
    roles: ['Property coordinator', 'Maintenance scheduler', 'Leasing-operations specialist', 'Vendor manager', 'Regional operator', 'Assistant property manager', 'Facilities coordinator', 'Resident-services lead', 'Operations manager', 'Portfolio analyst'],
    summary: 'Recurring coordination, vendor management, and fragmented systems create room for internal operator development.',
    whyChanging: ['Scheduling and resident communication can be streamlined', 'Vendor and maintenance workflows are fragmented', 'Regional visibility is often weak'],
    internalDevelopment: ['Coordinators into operations-systems roles', 'Schedulers into workflow leads', 'Regional operators into implementation roles'],
    externalHiring: ['Property-technology implementation talent', 'Systems integration specialists'],
  },
  {
    id: 'public-administration', label: 'Public administration', x: 6.1, y: 8.05, r: 26, dir: 'W',
    zone: 'develop', zoneLabel: 'Develop selectively', color: '#6fb0d8', opportunity: 'large',
    industries: ['Federal government', 'State government', 'Municipal government', 'Education administration'],
    roles: ['Program coordinator', 'Benefits administrator', 'Case-operations specialist', 'Procurement analyst', 'Compliance officer', 'Scheduling coordinator', 'Grants administrator', 'Policy analyst', 'Records manager', 'Program manager'],
    summary: 'Large workforces and high development value, but slower adoption and buying cycles.',
    whyChanging: ['Case and benefits workflows are document-heavy', 'Procurement and compliance require traceability', 'Public systems often have significant process debt'],
    internalDevelopment: ['Program staff into service-design roles', 'Case operations into workflow roles', 'Procurement staff into systems roles'],
    externalHiring: ['Civic-technology implementation talent', 'Security and compliance specialists'],
  },
  {
    id: 'hospitality-operations', label: 'Hospitality operations', x: 5.95, y: 6.7, r: 16, dir: 'SW',
    zone: 'develop', zoneLabel: 'Develop selectively', color: '#6fb0d8', opportunity: 'medium',
    industries: ['Restaurants', 'Hotels', 'Venues', 'Travel operations'],
    roles: ['General manager', 'Scheduling coordinator', 'Revenue manager', 'Guest-operations lead', 'Event-operations manager', 'Front-office manager', 'Food & beverage manager', 'Multi-unit operator', 'Reservations manager', 'Operations supervisor'],
    summary: 'Large workforces but uneven budgets; the opportunity is concentrated in management, scheduling, revenue, and multi-unit operations.',
    whyChanging: ['Scheduling and demand planning are becoming more automated', 'Multi-unit operators need better visibility', 'Frontline work remains physical'],
    internalDevelopment: ['Managers into multi-unit systems roles', 'Schedulers into workforce-planning roles', 'Guest operations into experience systems roles'],
    externalHiring: ['Hospitality systems specialists', 'Revenue-operations talent'],
  },
  {
    id: 'ai-labs-technical-talent', label: 'AI labs / technical talent', x: 9.35, y: 6.35, r: 21, dir: 'W',
    zone: 'ai', zoneLabel: 'AI labs', color: '#9b7ff0', opportunity: 'medium-large',
    industries: ['Frontier AI labs', 'AI infrastructure', 'Software', 'Cybersecurity', 'Specialized technical services'],
    roles: ['Software engineer', 'ML engineer', 'Research engineer', 'Technical product manager', 'AI-infrastructure engineer', 'Applied-AI operator', 'Data engineer', 'Research scientist', 'Solutions engineer', 'Evaluation specialist'],
    summary: 'A smaller workforce than many distributed service sectors, but extremely high spend per worker and a crowded talent market.',
    whyChanging: ['Tooling and capability requirements change quickly', 'Demand is concentrated among fewer, high-spending employers', 'Specialized technical talent commands premium pricing'],
    internalDevelopment: ['Engineers into AI-systems and agent-infrastructure roles', 'Technical product managers into applied-AI workflow roles', 'Operators into evaluation, deployment, and implementation roles'],
    externalHiring: ['Specialist research and engineering talent', 'AI infrastructure and deployment specialists'],
    marketExamples: ['Mercor and other technical-talent marketplaces', 'Specialized AI recruiting platforms', 'Expert networks serving frontier labs'],
  },
  {
    id: 'routine-clerical', label: 'Routine clerical work', x: 9.0, y: 3.25, r: 16, dir: 'E',
    zone: 'automate', zoneLabel: 'Automate or redesign', color: '#d67a5f', opportunity: 'medium',
    industries: ['Cross-industry'],
    roles: ['Data-entry clerk', 'Reporting analyst', 'Invoice processor', 'Transcriptionist', 'Administrative assistant', 'File clerk', 'Order processor', 'Records clerk'],
    summary: 'High automation pressure and weaker economics for heavy development investment in the existing task bundle.',
    whyChanging: ['Tasks are standardized and repetitive', 'Work is highly computer-mediated', 'Automation can remove large portions of the role'],
    internalDevelopment: ['Move high-potential employees into exception handling', 'Develop coordination and quality-control capability'],
    externalHiring: ['Automation operators and supervisors'],
  },
  {
    id: 'frontline-physical', label: 'Frontline physical work', x: 4.35, y: 4.75, r: 16, dir: 'E',
    zone: 'watch', zoneLabel: 'Watch, don\'t lead', color: '#7c8695', opportunity: 'medium',
    industries: ['Construction', 'Hospitality', 'Janitorial services', 'Warehousing', 'Agriculture'],
    roles: ['Laborer', 'Cleaner', 'Line worker', 'Warehouse handler', 'Grounds worker', 'Machine operator', 'Assembler', 'Material handler'],
    summary: 'Large workforce but less direct workflow ownership; opportunity may emerge through movement into supervision, coordination, and planning.',
    whyChanging: ['Physical tasks remain difficult to automate', 'Digital tools may improve scheduling and supervision', 'The strongest pathway may be upward mobility rather than role redesign'],
    internalDevelopment: ['Frontline workers into leads and supervisors', 'Experienced workers into scheduling and quality roles'],
    externalHiring: ['Operational technology and implementation talent'],
  },
];

export const notes = {
  bubbleSize: 'Modeled commercial opportunity',
  methodologyStatus: 'Founder hypothesis',
};
