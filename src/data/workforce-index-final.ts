// Source of truth for the Workforce Transformation Index (/proofworks).
//
// AXES (modeled founder hypothesis):
//   x = how urgently the workflow needs to change
//   y = how much value comes from developing the people doing the work
//   r = modeled commercial opportunity (NOT measured revenue)
// COLOR = market status: underserved | emerging | crowded | low-fit
//
// IMPORTANT: bubble position/size and every Rating below are MODELED judgments.
// Only the `sourced` block (BLS employment/wage, O*NET tasks, Eloundou exposure,
// AEI usage) is externally sourced. Source links do NOT calculate the position.
export type Rating = 'Low' | 'Medium' | 'High';
export type Size = 'Small' | 'Medium' | 'Large';
export type Crowding = 'underserved' | 'emerging' | 'crowded' | 'low-fit';
export type PriorityStatus = 'priority' | 'adjacent' | 'watch';
export type Source = { name: string; year: string; supports: string; url: string };

export type Cluster = {
  id: string; label: string; x: number; y: number; r: number;
  dir: 'E' | 'W' | 'N' | 'S' | 'NE' | 'NW' | 'SE' | 'SW';
  crowding: Crowding; priority: boolean; priorityStatus: PriorityStatus;
  industries: string[]; summary: string;
  decision: {
    internalDevelopment: Rating; roleEvolution: Rating; taskAutomation: Rating;
    externalHiring: Rating; displacement: Rating; commercialOpportunity: Size; evidenceConfidence: Rating;
  };
  outcomes: { develop: string[]; redeploy: string[]; automate: string[]; hire: string[] };
  whyHere: { urgency: string; developmentValue: string; crowding: string; fit: string };
  sourced: {
    occupationLabel: string; occupationCode: string;
    employment: string; employmentYear: string; wage: string; wageYear: string;
    exposure: string; usage?: string;
  };
  commercial: {
    addressableWorkforce: Size; employerUrgency: Rating; spendingCapacity: Rating;
    repeatability: Rating; crowding: Crowding; modeledSpend: Size;
  };
  sources: Source[];
  marketExamples?: string[]; marketExamplesNote?: string;
};

const S = {
  bls: (soc: string): Source => ({ name: 'BLS OEWS / EP', year: 'May 2025 wage', supports: 'Median wage (OEWS May 2025); employment (year as shown beside the figure)', url: `https://www.onetonline.org/link/summary/${soc}` }),
  onet: (soc: string): Source => ({ name: 'O*NET Online', year: '2025', supports: 'Tasks & work activities', url: `https://www.onetonline.org/link/summary/${soc}` }),
  eloundou: { name: 'Eloundou et al.', year: '2023', supports: 'Theoretical AI task exposure', url: 'https://arxiv.org/abs/2303.10130' } as Source,
  aei: { name: 'Anthropic Economic Index', year: '2025', supports: 'Observed AI usage by occupation group', url: 'https://www.anthropic.com/news/the-anthropic-economic-index' } as Source,
};

export const clusters: Cluster[] = [
  {
    id: 'healthcare-administration', label: 'Healthcare administration', x: 8.4, y: 8.3, r: 36, dir: 'NE',
    crowding: 'underserved', priority: true, priorityStatus: 'priority',
    industries: ['Hospital systems', 'Clinics', 'Dental groups', 'Home health', 'Behavioral health'],
    summary: 'A very large administrative workforce running document-heavy workflows under acute cost pressure — with little dedicated implementation talent.',
    decision: { internalDevelopment: 'High', roleEvolution: 'High', taskAutomation: 'High', externalHiring: 'Medium', displacement: 'Medium', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Patient-access representative', 'Scheduling coordinator', 'Medical biller', 'Claims specialist', 'Revenue-cycle analyst', 'Care coordinator', 'Practice administrator'],
      redeploy: ['Scheduler → patient-operations lead', 'Biller → revenue-cycle systems analyst', 'Claims specialist → denials & appeals workflow lead', 'Coordinator → implementation specialist'],
      automate: ['First-pass claim coding', 'Eligibility & benefit checks', 'Appointment reminders', 'Prior-authorization drafting', 'EOB & status reporting', 'Routine patient messaging'],
      hire: ['Healthcare workflow specialist', 'RCM automation engineer', 'Integration specialist (HL7/FHIR)', 'Solutions consultant', 'Data analyst'],
    },
    whyHere: {
      urgency: 'Documentation, intake, billing, and claims are software-mediated and under sustained cost pressure.',
      developmentValue: 'Staff hold payer rules, exception handling, and patient-coordination knowledge that is hard to replace.',
      crowding: 'Revenue-cycle vendors exist, but implementation talent for provider back-offices is thin.',
      fit: 'High: very large workforce, urgent workflows, repeatable across systems and specialties.',
    },
    sourced: { occupationLabel: 'Medical Secretaries & Administrative Assistants', occupationCode: '43-6013', employment: '850,000', employmentYear: 'EP 2024', wage: '$45,930', wageYear: 'May 2025', exposure: 'Medium–high (Eloundou)', usage: 'Office & Administrative Support — lower observed usage (AEI)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'High', spendingCapacity: 'Medium', repeatability: 'High', crowding: 'underserved', modeledSpend: 'Large' },
    sources: [S.bls('43-6013.00'), S.onet('43-6013.00'), S.eloundou, S.aei],
  },
  {
    id: 'customer-account-operations', label: 'Customer / account operations', x: 8.9, y: 7.0, r: 34, dir: 'SE',
    crowding: 'emerging', priority: true, priorityStatus: 'priority',
    industries: ['Software', 'Professional services', 'Healthcare', 'Financial services', 'Retail'],
    summary: 'A cross-industry function where relationship judgment stays valuable while research, communication, and account workflows change fast.',
    decision: { internalDevelopment: 'High', roleEvolution: 'High', taskAutomation: 'High', externalHiring: 'Medium', displacement: 'Medium', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Account manager', 'Customer-success manager', 'Onboarding specialist', 'Renewals manager', 'Support lead', 'Customer-operations analyst'],
      redeploy: ['CSM → workflow & adoption specialist', 'Account manager → customer-intelligence lead', 'Support lead → systems & enablement lead', 'Onboarding → implementation specialist'],
      automate: ['First-response drafting', 'Ticket triage & routing', 'Account research', 'Renewal & risk-signal surfacing', 'Routine follow-ups', 'QBR & report prep'],
      hire: ['Customer-systems specialist', 'RevOps / automation analyst', 'Integration specialist', 'Solutions engineer', 'Data analyst'],
    },
    whyHere: {
      urgency: 'Research, communication, and account workflows are changing fast across every industry.',
      developmentValue: 'Relationship judgment and account context stay valuable even as tooling changes.',
      crowding: 'RevOps and CS tooling is widespread, so some competition exists — an emerging market.',
      fit: 'Strong and highly repeatable, with rising competition.',
    },
    sourced: { occupationLabel: 'Customer Service Representatives', occupationCode: '43-4051', employment: '2,814,000', employmentYear: 'EP 2024', wage: '$44,770', wageYear: 'May 2025', exposure: 'High — CSRs among the most-exposed occupations (Eloundou)', usage: 'Augmentation-leaning (AEI)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'High', spendingCapacity: 'Medium', repeatability: 'High', crowding: 'emerging', modeledSpend: 'Large' },
    sources: [S.bls('43-4051.00'), S.onet('43-4051.00'), S.eloundou, S.aei],
  },
  {
    id: 'field-service-operations', label: 'Field-service operations', x: 7.4, y: 8.1, r: 28, dir: 'W',
    crowding: 'underserved', priority: true, priorityStatus: 'priority',
    industries: ['HVAC', 'Plumbing', 'Electrical', 'Facilities services', 'Appliance repair'],
    summary: 'Large, fragmented service businesses with workflow-heavy back-office coordination and significant room to develop trusted internal operators.',
    decision: { internalDevelopment: 'High', roleEvolution: 'High', taskAutomation: 'Medium', externalHiring: 'Medium', displacement: 'Low', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Dispatcher', 'Estimator', 'Scheduler', 'Service coordinator', 'Branch operator', 'Service manager', 'Operations supervisor'],
      redeploy: ['Dispatcher → workflow operations lead', 'Estimator → pricing & systems specialist', 'Coordinator → implementation specialist', 'Branch operator → regional systems lead'],
      automate: ['First-pass scheduling', 'Routine customer updates', 'Call & message triage', 'Quote drafting', 'Status reporting', 'Basic route optimization'],
      hire: ['Technical workflow builder', 'Systems implementation specialist', 'Integration specialist', 'Automation engineer', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Scheduling, dispatch, quoting, and customer communication are going data-driven while fragmented operators feel margin and labor pressure.',
      developmentValue: 'Dispatchers and estimators hold route, customer, and pricing context that is hard to replace.',
      crowding: 'Few firms specialize in implementation talent for field-service back offices.',
      fit: 'High: underserved, workflow-heavy, and repeatable across thousands of branches.',
    },
    sourced: { occupationLabel: 'Dispatchers, Except Police, Fire, and Ambulance', occupationCode: '43-5032', employment: '202,810', employmentYear: 'OEWS May 2025', wage: '$50,340', wageYear: 'May 2025', exposure: 'Medium (Eloundou)', usage: 'Office & Administrative Support — lower observed usage (AEI)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'High', spendingCapacity: 'Medium', repeatability: 'High', crowding: 'underserved', modeledSpend: 'Large' },
    sources: [S.bls('43-5032.00'), S.onet('43-5032.00'), S.eloundou, S.aei],
  },
  {
    id: 'manufacturing-planning', label: 'Manufacturing planning', x: 6.8, y: 8.0, r: 28, dir: 'W',
    crowding: 'underserved', priority: true, priorityStatus: 'priority',
    industries: ['Industrial manufacturing', 'Automotive', 'Consumer goods', 'Food production'],
    summary: 'Valuable operational knowledge and complex dependencies, with growing pressure to connect planning systems to frontline reality.',
    decision: { internalDevelopment: 'High', roleEvolution: 'High', taskAutomation: 'Medium', externalHiring: 'Medium', displacement: 'Medium', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Production planner', 'Procurement coordinator', 'Quality coordinator', 'Maintenance planner', 'Supply planner', 'Materials manager'],
      redeploy: ['Planner → systems & optimization specialist', 'Quality staff → evaluation & analytics lead', 'Maintenance coordinator → predictive-operations lead', 'Buyer → supply-systems lead'],
      automate: ['Demand & supply first-pass planning', 'Purchase-order generation', 'Reorder-point checks', 'Quality-report drafting', 'Maintenance scheduling', 'Inventory status reporting'],
      hire: ['Industrial data specialist', 'Systems integration specialist', 'MES/ERP integration specialist', 'Automation engineer', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Planning is becoming predictive and maintenance/quality workflows are data-rich, under continual cost pressure.',
      developmentValue: 'Operational context and cross-dependency knowledge are hard to replace.',
      crowding: 'ERP/MES vendors exist, but implementation talent is scarce.',
      fit: 'High: large planning workforce, repeatable across plants.',
    },
    sourced: { occupationLabel: 'Production, Planning & Expediting Clerks', occupationCode: '43-5061', employment: '388,800', employmentYear: 'EP 2024', wage: '$59,650', wageYear: 'May 2025', exposure: 'Medium (Eloundou)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'Medium', spendingCapacity: 'Medium', repeatability: 'High', crowding: 'underserved', modeledSpend: 'Large' },
    sources: [S.bls('43-5061.00'), S.onet('43-5061.00'), S.eloundou],
  },
  {
    id: 'insurance-operations', label: 'Insurance operations', x: 8.6, y: 7.7, r: 28, dir: 'E',
    crowding: 'emerging', priority: true, priorityStatus: 'priority',
    industries: ['Property and casualty', 'Health insurance', 'Benefits administration', 'Specialty insurance'],
    summary: 'Document- and rules-heavy work with real judgment, exceptions, and customer impact — early competition, still winnable.',
    decision: { internalDevelopment: 'High', roleEvolution: 'High', taskAutomation: 'High', externalHiring: 'Medium', displacement: 'Medium', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Claims coordinator', 'Underwriting assistant', 'Policy-operations specialist', 'Compliance analyst', 'Operations analyst'],
      redeploy: ['Claims staff → exception-management lead', 'Policy ops → workflow-design specialist', 'Compliance analyst → controls & evaluation lead', 'UW assistant → systems underwriter'],
      automate: ['Document intake & summarization', 'First-pass claim triage', 'Policy-issuance checks', 'Routine correspondence', 'Compliance-evidence collection', 'Status reporting'],
      hire: ['Insurance automation specialist', 'Technical compliance builder', 'Integration specialist', 'Data analyst', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Document- and rules-heavy work is a prime automation target and carriers are investing now.',
      developmentValue: 'Judgment on exceptions, edge cases, and compliance stays human.',
      crowding: 'Insurtech and automation vendors are emerging — competition is rising but the market is winnable.',
      fit: 'Strong, with competition — an emerging market.',
    },
    sourced: { occupationLabel: 'Claims Adjusters, Examiners & Investigators', occupationCode: '13-1031', employment: '356,100', employmentYear: 'EP 2024', wage: '$78,000', wageYear: 'May 2025', exposure: 'High — document/rules-heavy (Eloundou)', usage: 'Business & Financial — above-average usage (AEI)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'High', spendingCapacity: 'High', repeatability: 'High', crowding: 'emerging', modeledSpend: 'Large' },
    sources: [S.bls('13-1031.00'), S.onet('13-1031.00'), S.eloundou, S.aei],
  },
  {
    id: 'logistics-coordination', label: 'Logistics coordination', x: 7.9, y: 7.0, r: 28, dir: 'SE',
    crowding: 'underserved', priority: true, priorityStatus: 'priority',
    industries: ['Trucking', 'Freight forwarding', 'Warehousing', 'Distribution', 'Last-mile delivery'],
    summary: 'Large operator populations and measurable gains from better routing, communication, exception handling, and planning.',
    decision: { internalDevelopment: 'High', roleEvolution: 'High', taskAutomation: 'Medium', externalHiring: 'Medium', displacement: 'Medium', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Dispatcher', 'Fleet coordinator', 'Carrier manager', 'Transportation planner', 'Load planner', 'Operations coordinator'],
      redeploy: ['Dispatcher → network-operations lead', 'Coordinator → planning & systems specialist', 'Carrier manager → logistics-intelligence lead', 'Broker → account-systems lead'],
      automate: ['First-pass load matching', 'Track-and-trace updates', 'Carrier check-ins', 'Routine route optimization', 'Exception alerts', 'Status reporting'],
      hire: ['Workflow implementation specialist', 'TMS integration specialist', 'Data engineer', 'Automation engineer', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Routing and planning are automating, margins are thin, and gains are measurable in time, cost, and errors.',
      developmentValue: 'Operators own exception handling and carrier/customer relationships.',
      crowding: 'TMS vendors exist, but dedicated implementation talent is scarce.',
      fit: 'High: large operator base, repeatable across networks.',
    },
    sourced: { occupationLabel: 'Cargo & Freight Agents', occupationCode: '43-5011', employment: '100,600', employmentYear: 'EP 2024', wage: '$52,260', wageYear: 'May 2025', exposure: 'Medium — coordination & documentation (Eloundou)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'High', spendingCapacity: 'Medium', repeatability: 'High', crowding: 'underserved', modeledSpend: 'Large' },
    sources: [S.bls('43-5011.00'), S.onet('43-5011.00'), S.eloundou],
  },
  {
    id: 'construction-planning', label: 'Construction planning', x: 7.0, y: 7.2, r: 20, dir: 'SW',
    crowding: 'underserved', priority: true, priorityStatus: 'priority',
    industries: ['Commercial construction', 'Residential building', 'Infrastructure', 'Specialty contractors'],
    summary: 'Planning and coordination are increasingly software-mediated while field knowledge stays valuable — the opportunity is the office layer.',
    decision: { internalDevelopment: 'High', roleEvolution: 'Medium', taskAutomation: 'Medium', externalHiring: 'Medium', displacement: 'Low', commercialOpportunity: 'Medium', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Estimator', 'Scheduler', 'Project coordinator', 'Procurement analyst', 'Preconstruction manager', 'Project-controls analyst'],
      redeploy: ['Estimator → preconstruction systems specialist', 'Coordinator → implementation specialist', 'Scheduler → planning-intelligence lead', 'Procurement analyst → systems & analytics lead'],
      automate: ['First-pass takeoffs & estimates', 'Bid leveling', 'Schedule updates', 'RFI & submittal drafting', 'Procurement status tracking', 'Progress reporting'],
      hire: ['BIM / data specialist', 'Preconstruction systems builder', 'Integration specialist', 'Automation engineer', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Preconstruction modeling and estimating are increasingly software-mediated.',
      developmentValue: 'Estimators and planners hold field and cost judgment; field execution stays physical.',
      crowding: 'Fragmented, with little dedicated implementation talent for the office layer.',
      fit: 'Good in the office/planning layer; field labor is out of scope.',
    },
    sourced: { occupationLabel: 'Cost Estimators', occupationCode: '13-1051', employment: '221,400', employmentYear: 'EP 2024', wage: '$78,740', wageYear: 'May 2025', exposure: 'Medium–high for planning/estimating; field work is low (Eloundou)' },
    commercial: { addressableWorkforce: 'Medium', employerUrgency: 'Medium', spendingCapacity: 'Medium', repeatability: 'Medium', crowding: 'underserved', modeledSpend: 'Medium' },
    sources: [S.bls('13-1051.00'), S.onet('13-1051.00'), S.eloundou],
  },
  {
    id: 'property-operations', label: 'Property operations', x: 6.6, y: 7.0, r: 24, dir: 'W',
    crowding: 'underserved', priority: true, priorityStatus: 'priority',
    industries: ['Property management', 'Real-estate services', 'Facilities management', 'Multifamily housing'],
    summary: 'Recurring coordination, vendor management, and fragmented systems create room for internal operator development.',
    decision: { internalDevelopment: 'High', roleEvolution: 'High', taskAutomation: 'Medium', externalHiring: 'Medium', displacement: 'Low', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Property coordinator', 'Maintenance scheduler', 'Leasing-operations specialist', 'Vendor manager', 'Regional operator'],
      redeploy: ['Coordinator → operations-systems specialist', 'Scheduler → workflow lead', 'Regional operator → implementation lead', 'Leasing ops → systems & analytics lead'],
      automate: ['Maintenance-ticket triage', 'Resident messaging', 'Vendor scheduling', 'Rent & renewal reminders', 'Turn & inspection reporting', 'Portfolio status reporting'],
      hire: ['PropTech implementation specialist', 'Systems integration specialist', 'Automation engineer', 'Data analyst', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Fragmented systems, streamlining of scheduling/communication, and weak regional visibility drive change.',
      developmentValue: 'Coordinators hold vendor, resident, and property context.',
      crowding: 'PropTech exists, but implementation talent is thin.',
      fit: 'High: recurring coordination, repeatable across portfolios.',
    },
    sourced: { occupationLabel: 'Property, Real Estate & Community Association Managers', occupationCode: '11-9141', employment: '466,100', employmentYear: 'EP 2024', wage: '$69,990', wageYear: 'May 2025', exposure: 'Medium — admin & comms exposed; on-site work is not (Eloundou)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'Medium', spendingCapacity: 'Medium', repeatability: 'High', crowding: 'underserved', modeledSpend: 'Large' },
    sources: [S.bls('11-9141.00'), S.onet('11-9141.00'), S.eloundou],
  },
  {
    id: 'professional-services', label: 'Professional services', x: 7.7, y: 8.6, r: 22, dir: 'N',
    crowding: 'emerging', priority: false, priorityStatus: 'adjacent',
    industries: ['Consulting', 'Accounting', 'Legal services', 'Agencies'],
    summary: 'High-value knowledge work with meaningful budgets — but more competition and existing tooling, so it sits at the edge of the zone.',
    decision: { internalDevelopment: 'Medium', roleEvolution: 'High', taskAutomation: 'High', externalHiring: 'Medium', displacement: 'Medium', commercialOpportunity: 'Medium', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Analyst', 'Engagement manager', 'Project manager', 'Client-services lead', 'Operations manager'],
      redeploy: ['Analyst → AI-assisted advisory', 'Engagement manager → workflow-design lead', 'Operations manager → automation lead', 'PM → delivery-systems lead'],
      automate: ['Research & synthesis first pass', 'Deck & report drafting', 'Data cleaning', 'Meeting notes & actions', 'Status reporting', 'Routine analysis'],
      hire: ['Domain-specific builder', 'Knowledge-systems specialist', 'Data / automation engineer', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Research and synthesis are accelerating and delivery is productizing under client speed expectations.',
      developmentValue: 'Domain expertise and client relationships retain value.',
      crowding: 'A well-served market with meaningful budgets and more competition — it sits at the edge.',
      fit: 'Attractive but competitive — adjacent to the core.',
    },
    sourced: { occupationLabel: 'Management Analysts', occupationCode: '13-1111', employment: '1,075,100', employmentYear: 'EP 2024', wage: '$101,860', wageYear: 'May 2025', exposure: 'High — accountants/analysts highly exposed (Eloundou)', usage: 'Business & Financial — above-average usage (AEI)' },
    commercial: { addressableWorkforce: 'Medium', employerUrgency: 'Medium', spendingCapacity: 'High', repeatability: 'Medium', crowding: 'emerging', modeledSpend: 'Medium' },
    sources: [S.bls('13-1111.00'), S.onet('13-1111.00'), S.eloundou, S.aei],
  },
  {
    id: 'public-administration', label: 'Public administration', x: 5.6, y: 7.9, r: 25, dir: 'W',
    crowding: 'underserved', priority: false, priorityStatus: 'adjacent',
    industries: ['Federal government', 'State government', 'Municipal government', 'Education administration'],
    summary: 'Large workforces and high development value, but slower adoption and buying cycles push near-term urgency lower.',
    decision: { internalDevelopment: 'High', roleEvolution: 'Medium', taskAutomation: 'Medium', externalHiring: 'Medium', displacement: 'Low', commercialOpportunity: 'Large', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Program coordinator', 'Benefits administrator', 'Case-operations specialist', 'Procurement analyst', 'Compliance officer'],
      redeploy: ['Program staff → service-design specialist', 'Case ops → workflow lead', 'Procurement → systems specialist', 'Analyst → data & reporting lead'],
      automate: ['Eligibility first-pass checks', 'Form & case intake', 'Document routing', 'Benefit notices', 'Compliance evidence', 'Status reporting'],
      hire: ['Civic-tech implementation specialist', 'Security & compliance specialist', 'Integration specialist', 'Data analyst', 'Solutions consultant'],
    },
    whyHere: {
      urgency: 'Document-heavy case and benefits work carries process debt, but slow buying cycles lower near-term urgency.',
      developmentValue: 'Program and case knowledge is valuable and durable.',
      crowding: 'GovTech exists and implementation talent is thin, but procurement is hard.',
      fit: 'Valuable but slower — adjacent, not core near-term.',
    },
    sourced: { occupationLabel: 'Eligibility Interviewers, Government Programs', occupationCode: '43-4061', employment: '166,800', employmentYear: 'EP 2024', wage: '$54,210', wageYear: 'May 2025', exposure: 'Medium–high — records & rules-based case work (Eloundou)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'Medium', spendingCapacity: 'Medium', repeatability: 'Medium', crowding: 'underserved', modeledSpend: 'Medium' },
    sources: [S.bls('43-4061.00'), S.onet('43-4061.00'), S.eloundou],
  },
  {
    id: 'hospitality-operations', label: 'Hospitality operations', x: 5.7, y: 6.1, r: 20, dir: 'SW',
    crowding: 'emerging', priority: false, priorityStatus: 'watch',
    industries: ['Restaurants', 'Hotels', 'Venues', 'Travel operations'],
    summary: 'Large workforces but uneven budgets; the opportunity concentrates in management, scheduling, revenue, and multi-unit operations.',
    decision: { internalDevelopment: 'Medium', roleEvolution: 'Medium', taskAutomation: 'Medium', externalHiring: 'Medium', displacement: 'Medium', commercialOpportunity: 'Medium', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['General manager', 'Scheduling coordinator', 'Revenue manager', 'Guest-operations lead', 'Multi-unit operator'],
      redeploy: ['Scheduler → workforce-planning lead', 'Manager → multi-unit systems lead', 'Guest ops → experience-systems lead', 'Revenue manager → revenue-systems lead'],
      automate: ['First-pass shift scheduling', 'Demand & rate forecasting', 'Reservation & guest messaging', 'Review responses', 'Inventory & ordering', 'Reporting'],
      hire: ['Hospitality systems specialist', 'Revenue-operations talent', 'Integration specialist', 'Data analyst'],
    },
    whyHere: {
      urgency: 'Scheduling and demand planning are automating, but budgets are uneven and frontline work stays physical.',
      developmentValue: 'Multi-unit operators and managers hold operational judgment.',
      crowding: 'Hospitality-tech is emerging and budgets are uneven.',
      fit: 'Selective — the management layer only; watch.',
    },
    sourced: { occupationLabel: 'Food Service Managers', occupationCode: '11-9051', employment: '352,800', employmentYear: 'EP 2024', wage: '$69,390', wageYear: 'May 2025', exposure: 'Low–medium — scheduling/admin exposed; service is physical (Eloundou)' },
    commercial: { addressableWorkforce: 'Medium', employerUrgency: 'Medium', spendingCapacity: 'Medium', repeatability: 'Medium', crowding: 'emerging', modeledSpend: 'Medium' },
    sources: [S.bls('11-9051.00'), S.onet('11-9051.00'), S.eloundou],
  },
  {
    id: 'ai-labs-technical-talent', label: 'AI labs / technical talent', x: 9.4, y: 6.6, r: 15, dir: 'N',
    crowding: 'crowded', priority: false, priorityStatus: 'adjacent',
    industries: ['Frontier AI labs', 'AI infrastructure', 'Software', 'Cybersecurity', 'Specialized technical services'],
    summary: 'A crowded benchmark, not a core target: high urgency and very high spend per worker, but a small specialist workforce already served by well-funded talent platforms.',
    decision: { internalDevelopment: 'Low', roleEvolution: 'Medium', taskAutomation: 'Low', externalHiring: 'High', displacement: 'Low', commercialOpportunity: 'Small', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Applied-AI operator', 'Solutions engineer', 'Evaluation specialist'],
      redeploy: ['Engineer → agent-infrastructure lead', 'Technical PM → applied-AI workflow lead', 'Operator → evaluation & deployment lead'],
      automate: ['Boilerplate code', 'Test generation', 'Documentation drafting', 'Eval-harness scaffolding'],
      hire: ['Specialist research & engineering talent', 'AI-infrastructure engineer', 'Applied-AI operator', 'Evaluation specialist'],
    },
    whyHere: {
      urgency: 'Tooling and capability requirements change quickly — urgency is high.',
      developmentValue: 'Talent arrives specialized, so there is less internal-development leverage.',
      crowding: 'A crowded, well-funded talent market already served by dedicated platforms.',
      fit: 'Low as a placement/development target — a benchmark, not a core market.',
    },
    sourced: { occupationLabel: 'Software Developers', occupationCode: '15-1252', employment: '1,693,800', employmentYear: 'EP 2024', wage: '$135,980', wageYear: 'May 2025', exposure: 'Highest (Eloundou)', usage: 'Computer & Mathematical = 37.2% of Claude usage (AEI)' },
    commercial: { addressableWorkforce: 'Small', employerUrgency: 'High', spendingCapacity: 'High', repeatability: 'Low', crowding: 'crowded', modeledSpend: 'Small' },
    sources: [S.bls('15-1252.00'), S.onet('15-1252.00'), S.aei, S.eloundou],
    marketExamples: ['Mercor', 'Scale / Outlier', 'Turing', 'Other specialist technical-talent platforms'],
    marketExamplesNote: 'Adjacent market examples — how the crowded technical-talent segment is already served. These are not Proofworks customers.',
  },
  {
    id: 'routine-clerical', label: 'Routine clerical work', x: 8.6, y: 3.2, r: 20, dir: 'E',
    crowding: 'low-fit', priority: false, priorityStatus: 'watch',
    industries: ['Cross-industry'],
    summary: 'High urgency but weak development economics — the existing task bundle is a candidate to automate or redesign, and automation vendors already crowd it.',
    decision: { internalDevelopment: 'Low', roleEvolution: 'Low', taskAutomation: 'High', externalHiring: 'Low', displacement: 'High', commercialOpportunity: 'Small', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['High-potential clerks into exception handling', 'Staff into quality-control roles'],
      redeploy: ['Clerk → exception-handling specialist', 'Bookkeeper → controls & QA', 'Select staff → coordination roles'],
      automate: ['Data entry', 'Invoice processing', 'Transcription', 'Standard reporting', 'File management', 'Order processing'],
      hire: ['Automation operators & supervisors'],
    },
    whyHere: {
      urgency: 'Standardized, computer-mediated tasks face high automation pressure.',
      developmentValue: 'Limited durable judgment remains in the existing task bundle.',
      crowding: 'Automation and RPA vendors already crowd this — low Proofworks fit.',
      fit: 'Low: automate or redesign, weak development economics.',
    },
    sourced: { occupationLabel: 'Office Clerks, General', occupationCode: '43-9061', employment: '2,646,000', employmentYear: 'EP 2024', wage: '$45,010', wageYear: 'May 2025', exposure: 'High — routine text/record tasks (Eloundou)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'High', spendingCapacity: 'Low', repeatability: 'High', crowding: 'low-fit', modeledSpend: 'Small' },
    sources: [S.bls('43-9061.00'), S.onet('43-9061.00'), S.eloundou],
  },
  {
    id: 'frontline-physical', label: 'Frontline physical work', x: 4.1, y: 4.3, r: 18, dir: 'E',
    crowding: 'low-fit', priority: false, priorityStatus: 'watch',
    industries: ['Construction', 'Hospitality', 'Janitorial services', 'Warehousing', 'Agriculture'],
    summary: 'Large workforce but little direct workflow ownership; near-term priority is low — opportunity emerges through movement into supervision and coordination.',
    decision: { internalDevelopment: 'Low', roleEvolution: 'Medium', taskAutomation: 'Low', externalHiring: 'Low', displacement: 'Low', commercialOpportunity: 'Small', evidenceConfidence: 'Medium' },
    outcomes: {
      develop: ['Frontline workers into leads & supervisors'],
      redeploy: ['Worker → team lead / supervisor', 'Experienced worker → scheduling & quality role'],
      automate: ['Some scheduling & reporting (physical tasks resist automation)'],
      hire: ['Operational-technology / implementation talent'],
    },
    whyHere: {
      urgency: 'Physical tasks are hard to automate, so near-term workflow-change pressure is low.',
      developmentValue: 'Limited direct workflow ownership; value emerges through upward mobility.',
      crowding: 'Not a served implementation market, but low fit near-term.',
      fit: 'Low near-term; watch.',
    },
    sourced: { occupationLabel: 'Laborers & Freight, Stock & Material Movers, Hand', occupationCode: '53-7062', employment: '2,988,900', employmentYear: 'EP 2024', wage: '$40,240', wageYear: 'May 2025', exposure: 'Low — lowest-overlap set (Eloundou)' },
    commercial: { addressableWorkforce: 'Large', employerUrgency: 'Low', spendingCapacity: 'Low', repeatability: 'Low', crowding: 'low-fit', modeledSpend: 'Small' },
    sources: [S.bls('53-7062.00'), S.onet('53-7062.00'), S.eloundou],
  },
];

export const CROWD: Record<Crowding, { c: string; label: string; status: string }> = {
  underserved: { c: '#4c9dff', label: 'Underserved', status: 'Underserved' },
  emerging: { c: '#e0a458', label: 'Emerging competition', status: 'Emerging' },
  crowded: { c: '#9b7ff0', label: 'Crowded', status: 'Crowded' },
  'low-fit': { c: '#8b93a0', label: 'Low Proofworks fit / automation-heavy', status: 'Low-fit' },
};

export const PRIORITY_LABEL: Record<PriorityStatus, string> = {
  priority: 'Proofworks priority zone', adjacent: 'Adjacent', watch: 'Watch',
};

export const notes = {
  bubbleSize: 'Modeled commercial opportunity',
  bubbleSizeDetail: 'Combines addressable operator population, employer willingness to pay, urgency, and repeatability. A modeled founder hypothesis — not measured revenue.',
  spendModel: 'The future dollar model will combine addressable affected workers, employer spend per affected worker, and realistic adoption share. No dollar totals are shown yet.',
  positionStatus: 'Modeled founder hypothesis',
  xAxis: 'How urgently the workflow needs to change',
  yAxis: 'How much value comes from developing the people doing the work',
  methodologyStatus: 'Founder hypothesis. The clusters represent types of work—not entire industries. Positions and opportunity sizes are directional until supported by employment, wage, AI-adoption, and employer-spending data.',
};
