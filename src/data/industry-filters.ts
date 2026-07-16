// Industry EXPLORATION mode for the Workforce Transformation Index.
// Industries are NOT plotted as single bubbles (their work is too varied).
// Instead, selecting an industry highlights the relevant work clusters and
// opens a panel. `clusterIds` reference ids in workforce-index-final.ts.
export type IndustryFilter = {
  id: string; label: string; clusterIds: string[];
  summary: string; why: string[]; internal: string[]; external: string[];
};

export const industries: IndustryFilter[] = [
  {
    id: 'construction', label: 'Construction',
    clusterIds: ['construction-planning', 'property-operations', 'customer-account-operations', 'logistics-coordination', 'frontline-physical'],
    summary: 'The opportunity lives in the office and coordination layer — preconstruction, project controls, procurement — while field labor stays physical.',
    why: ['Preconstruction modeling and estimating are software-mediated', 'Project controls and procurement generate structured, repeatable workflows', 'Field execution remains hard to automate'],
    internal: ['Estimators and coordinators into preconstruction systems roles', 'Procurement staff into implementation roles'],
    external: ['BIM and data specialists', 'Workflow integration talent'],
  },
  {
    id: 'healthcare', label: 'Healthcare',
    clusterIds: ['healthcare-administration', 'customer-account-operations', 'professional-services', 'routine-clerical', 'frontline-physical'],
    summary: 'A very large administrative and coordination workforce under cost pressure; clinical judgment stays human while the paperwork layer changes fastest.',
    why: ['Documentation, intake, billing, and claims are increasingly software-mediated', 'Cost pressure pushes workflow redesign', 'Exceptions and patient coordination stay human'],
    internal: ['Schedulers into patient-operations leads', 'Claims and billing staff into workflow roles'],
    external: ['Healthcare workflow specialists', 'Automation and integration builders'],
  },
  {
    id: 'field-services', label: 'Field services',
    clusterIds: ['field-service-operations', 'customer-account-operations', 'property-operations', 'logistics-coordination', 'frontline-physical'],
    summary: 'Fragmented, workflow-heavy service businesses — dispatch, scheduling, estimating, customer coordination — with little dedicated implementation talent.',
    why: ['Dispatch and scheduling are becoming data-driven', 'Estimating and customer communication can be accelerated', 'Branches need people who connect tools to operations'],
    internal: ['Dispatchers into workflow leads', 'Estimators into pricing and systems roles'],
    external: ['Technical workflow builders', 'Systems implementation specialists'],
  },
  {
    id: 'logistics', label: 'Logistics & supply chain',
    clusterIds: ['logistics-coordination', 'customer-account-operations', 'manufacturing-planning', 'frontline-physical'],
    summary: 'Large operator populations where routing, planning, and exception handling change fast and gains are measurable in time, cost, and errors.',
    why: ['Routing and planning are automating', 'Operators still own exceptions and relationships', 'Improvements are directly measurable'],
    internal: ['Dispatchers into network-operations roles', 'Coordinators into planning and systems roles'],
    external: ['Workflow implementation specialists', 'Data and integration talent'],
  },
  {
    id: 'insurance-fin', label: 'Insurance & financial services',
    clusterIds: ['insurance-operations', 'customer-account-operations', 'professional-services', 'routine-clerical'],
    summary: 'Document- and rules-heavy operations with real judgment and compliance needs — early competition, still winnable with the right operators.',
    why: ['Document review and summarization are accelerating', 'Exception handling stays human-intensive', 'Compliance workflows require traceability'],
    internal: ['Claims and policy staff into exception-management roles', 'Compliance staff into evaluation roles'],
    external: ['Insurance and finance automation specialists', 'Technical compliance builders'],
  },
  {
    id: 'manufacturing', label: 'Manufacturing',
    clusterIds: ['manufacturing-planning', 'logistics-coordination', 'customer-account-operations', 'frontline-physical'],
    summary: 'Valuable operational knowledge and complex dependencies; the opportunity is connecting planning systems to frontline reality.',
    why: ['Planning is becoming predictive', 'Maintenance and quality workflows are data-rich', 'Operational context is hard to replace'],
    internal: ['Planners into systems and optimization roles', 'Quality staff into evaluation roles'],
    external: ['Industrial data specialists', 'Systems integration talent'],
  },
  {
    id: 'public', label: 'Public sector',
    clusterIds: ['public-administration', 'customer-account-operations', 'routine-clerical', 'professional-services'],
    summary: 'Large workforces and high development value, but slower buying cycles; opportunity concentrates in modernization of case, benefits, and procurement work.',
    why: ['Case and benefits workflows are document-heavy', 'Procurement and compliance need traceability', 'Significant process debt to work through'],
    internal: ['Program staff into service-design roles', 'Case operations into workflow roles'],
    external: ['Civic-technology implementation talent', 'Security and compliance specialists'],
  },
  {
    id: 'ai-software', label: 'AI labs & software',
    clusterIds: ['ai-labs-technical-talent', 'professional-services', 'customer-account-operations', 'routine-clerical'],
    summary: 'The specialist technical-talent core is crowded and well-funded; the more open opportunity is the surrounding GTM, delivery, and operations work.',
    why: ['Technical-talent supply is already served by funded platforms', 'GTM and customer operations scale fast around AI products', 'Delivery and back-office work is being reshaped'],
    internal: ['CSMs and support leads into adoption/workflow roles', 'Analysts into AI-assisted delivery roles'],
    external: ['Applied-AI GTM talent', 'Implementation specialists'],
  },
];
