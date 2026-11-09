/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  summary: string;
  outcomes: string[];
  location: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  type: string;
  year: string;
  authors: string;
  description: string;
  link: string;
  doiOrCitation?: string;
}

export interface NewsItem {
  id: string;
  date: string;
  headline: string;
  summary: string;
  category: string;
  isOfficialNotice?: boolean;
}

export interface BlogItem {
  id: string;
  title: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface FeedbackItem {
  id: string;
  clientName: string;
  organisation: string;
  rating: number;
  message: string;
  date: string;
  verified: boolean;
}

export interface CentreContentState {
  projects: ProjectItem[];
  publications: PublicationItem[];
  news: NewsItem[];
  blogs: BlogItem[];
  feedback: FeedbackItem[];
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Makueni County Agro-Ecological & Household Livelihood Baseline Survey',
    category: 'Socio-Economic Research',
    client: 'Sub-County Agricultural & Producer Collectives',
    year: '2026',
    status: 'In Progress',
    summary:
      'Rigorous mixed-methods geospatial survey capturing seasonal drought coping mechanisms, household income resilience, and post-harvest grain losses across 42 rural sampling clusters.',
    outcomes: [
      'Statistically weighted baseline dataset for 1,200 rural households',
      'Geospatial climate risk vulnerability mapping for Eastern Makueni',
      'Actionable evidence brief presented to county agriculture leadership',
    ],
    location: 'Salama & Kibwezi Agro-zones, Makueni County',
  },
  {
    id: 'proj-2',
    title: 'Dignity-Centered Institutional Governance & MEAL Framework Design',
    category: 'Institutional Consultancy',
    client: 'Regional Community Health & Education Initiatives',
    year: '2025–2026',
    status: 'In Progress',
    summary:
      'Developing a participatory Monitoring, Evaluation, Adaptation, and Learning (MEAL) architecture that integrates ethical respondent rights, real-time field data integrity, and executive dashboards.',
    outcomes: [
      'Standard Operating Procedures for ethical human-subject field surveys',
      'Automated indicator tracking matrices & data validation codebooks',
      'Capacity mentoring for 35 institutional field monitors and coordinators',
    ],
    location: 'Makueni, Machakos & Kajiado Cross-Border Corridors',
  },
  {
    id: 'proj-3',
    title: 'Community Water Governance & Rural Sanitation Sustainability Assessment',
    category: 'Applied Innovation',
    client: 'Rural Water User Associations & County Stakeholders',
    year: '2025',
    status: 'Completed',
    summary:
      'Comprehensive institutional review evaluating community-managed sand dams, solar-pumped borehole kiosks, and water tariff equity across semi-arid sub-catchments.',
    outcomes: [
      'Technical assessment of 18 rural water user schemes',
      'Tariff affordability and financial sustainability model',
      'Community charter on dignified resource allocation',
    ],
    location: 'Sultan Hamud & Salama Catchments, Kenya',
  },
];

export const INITIAL_PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-1',
    title: 'Centering Dignity in Grassroots Research: Methodological Protocols for Rural Fieldwork in Kenya',
    type: 'Policy Brief',
    year: '2026',
    authors: 'Dr. Muthoka J.K, PhD & Salama Legacy Research Faculty',
    description:
      'An authoritative four-page policy advisory outlining how enumerators, NGOs, and research institutions must conduct surveys without compromising the human dignity and privacy of rural communities.',
    link: 'https://www.salamalegacy.co.ke/publications/dignity-protocols-2026.pdf',
    doiOrCitation:
      'Muthoka, J. K. (2026). Centering Dignity in Grassroots Research. Salama Legacy Policy Series, 1(1), 1–6.',
  },
  {
    id: 'pub-2',
    title: 'Field Data Integrity & Quality Control Frameworks in Low-Connectivity Environments',
    type: 'Technical Report',
    year: '2025',
    authors: 'Salama Legacy Centre Technical Working Group',
    description:
      'Best practice guidelines for deploying mobile CAPI platforms (ODK, Kobo, SurveyCTO) with daily audit trails, GPS verification, and statistical back-checking in semi-arid Eastern Kenya.',
    link: 'https://www.salamalegacy.co.ke/publications/field-data-integrity-manual.pdf',
    doiOrCitation:
      'Salama Legacy Centre. (2025). Field Data Integrity & CAPI Verification Standards. SLC-TR-2025-03.',
  },
  {
    id: 'pub-3',
    title: 'Devolved Governance, Public Participation, and Evidence-Based Budgeting in Makueni County',
    type: 'Working Paper',
    year: '2025',
    authors: 'Dr. Muthoka J.K, PhD',
    description:
      'A longitudinal study examining the intersection of citizen-led ward forums, county project prioritization, and measurable service delivery impact over a five-year fiscal horizon.',
    link: 'https://www.salamalegacy.co.ke/publications/devolved-governance-makueni.pdf',
    doiOrCitation:
      'Muthoka, J. K. (2025). Devolved Governance & Citizen Voice. Working Papers in African Institutional Reform, No. 14.',
  },
  {
    id: 'pub-4',
    title: 'Mixed-Methods Survey Sampling: A Practical Manual for County-Level Development Practitioners',
    type: 'Methodological Guide',
    year: '2025',
    authors: 'Salama Legacy Centre Faculty of Research & Methodology',
    description:
      'Step-by-step handbook covering multi-stage cluster sampling, sample size determination with finite population corrections, and qualitative focus group synthesis.',
    link: 'https://www.salamalegacy.co.ke/publications/survey-sampling-handbook.pdf',
    doiOrCitation:
      'Salama Legacy Centre. (2025). Mixed-Methods Survey Sampling Handbook. SLC-GUIDE-02.',
  },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    date: 'April 2026',
    headline: 'Salama Legacy Centre Launches Official Digital Portal & Publishing Desk',
    summary:
      'Salama Legacy Centre officially unveils its digital portal to expand public access to scholarly publications, institutional consultancy services, and community capacity-building programmes across Makueni County and Eastern Africa.',
    category: 'Announcement',
    isOfficialNotice: true,
  },
  {
    id: 'news-2',
    date: 'March 2026',
    headline: 'Call for Collaborative Research Partnerships: 2026–2027 Applied Studies',
    summary:
      'The Director, Dr. Muthoka J.K, PhD, invites university faculties, public sector agencies, and non-governmental organisations to collaborate on upcoming climate adaptation and institutional governance research cohorts.',
    category: 'Academic Colloquium',
    isOfficialNotice: true,
  },
  {
    id: 'news-3',
    date: 'February 2026',
    headline: 'Salama Town Round Table on Community Research Ethics & Data Stewardship',
    summary:
      'A multi-stakeholder symposium bringing together local administrative chiefs, community elders, and research enumerators to validate the "Service with Dignity" ethical fieldwork covenant.',
    category: 'Field Report',
    isOfficialNotice: false,
  },
];

export const INITIAL_BLOGS: BlogItem[] = [
  {
    id: 'blog-1',
    title: 'Why "Service with Dignity" is Not Just a Slogan, but a Research Epistemology',
    author: 'Dr. Muthoka J.K, PhD',
    role: 'Director & Lead Investigator',
    date: 'April 2026',
    readTime: '5 min read',
    category: 'Research Philosophy',
    excerpt:
      'In an era where survey participants are frequently treated as passive data points, Salama Legacy Centre advocates for a dignity-first model where research empowers the community.',
    content: `When we chose the motto "Service with Dignity is Our Hallmark," we made a deliberate commitment to transcend conventional transactional consultancy. Too often, grassroots communities in rural Kenya are subjected to extractive questionnaires where their struggles are quantified, their time consumed, and their perspectives reduced to anonymous rows on a spreadsheet.

At Salama Legacy Centre, research begins with unconditional human respect. Every respondent possesses an inherent narrative of resilience. Dignity requires that:
1. Consent is informed, transparent, and voluntary, explained in accessible language (Kiswahili, Kikamba, or English).
2. Data collection preserves privacy and ensures respondents are never placed at economic or cultural risk.
3. Research findings are validated back with the host communities through participatory debriefings.

Advancing excellence means ensuring that the people who make research possible share in the enlightenment and policy changes that result. This is our unshakeable standard in Salama Town, Makueni County, and beyond.`,
    tags: ['Research Ethics', 'Dignity in Service', 'Methodology', 'Makueni'],
  },
  {
    id: 'blog-2',
    title: 'Translating Fieldwork Evidence into Devolved County Policy: A Practical Guide',
    author: 'Editorial Desk',
    role: 'Salama Legacy Research Faculty',
    date: 'March 2026',
    readTime: '4 min read',
    category: 'Policy & Governance',
    excerpt:
      'Bridging the chasm between complex academic statistical models and actionable policy decisions for county department executive committees.',
    content: `A 150-page technical evaluation report laden with p-values and econometric terminology often ends up on an archive shelf if it is not translated into pragmatic policy levers. County decision-makers in Kenya operate in high-pressure fiscal environments where clarity, cost-effectiveness, and community alignment determine whether an initiative succeeds.

Our experience in Eastern Africa underscores three indispensable principles:
1. Executive Policy Briefs must distill evidence into concrete resource allocation trade-offs within 4 to 6 concise pages.
2. Visual spatial mapping communicates regional disparities far more effectively than dense tables.
3. Stakeholder validation workshops must occur before reports are finalized, securing institutional buy-in from the outset.`,
    tags: ['Devolution', 'Policy Briefs', 'Makueni', 'Governance'],
  },
];

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: 'fb-1',
    clientName: 'Director of Programs',
    organisation: 'Eastern Kenya Community Water & Environment Network',
    rating: 5,
    message:
      'Dr. Muthoka and the Salama Legacy team demonstrated unprecedented rigor in our baseline water study. The methodology respected our community elders, and the resulting data directly supported our county budget submission.',
    date: 'March 2026',
    verified: true,
  },
  {
    id: 'fb-2',
    clientName: 'Senior M&E Specialist',
    organisation: 'Devolved Governance Technical Advisory Consortium',
    rating: 5,
    message:
      'The training on field data integrity and CAPI workflows transformed our enumerator cohort. Service with dignity was evident in every interaction. Highly recommended for institutional consultancy.',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 'fb-3',
    clientName: 'Lead Academic Researcher',
    organisation: 'Regional Institute for Applied Agricultural Economics',
    rating: 5,
    message:
      'Impeccable statistical codebooks, prompt delivery, and deep grounded knowledge of Makueni County. Dr. Muthoka’s leadership provides unmatched credibility.',
    date: 'January 2026',
    verified: true,
  },
];

const STORAGE_KEY = 'salama_legacy_published_data_v2';

export function loadSavedContent(): CentreContentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : INITIAL_PROJECTS,
        publications: parsed.publications && parsed.publications.length > 0 ? parsed.publications : INITIAL_PUBLICATIONS,
        news: parsed.news && parsed.news.length > 0 ? parsed.news : INITIAL_NEWS,
        blogs: parsed.blogs && parsed.blogs.length > 0 ? parsed.blogs : INITIAL_BLOGS,
        feedback: parsed.feedback && parsed.feedback.length > 0 ? parsed.feedback : INITIAL_FEEDBACK,
      };
    }
  } catch (err) {
    console.warn('Could not parse saved Salama content from localStorage, using defaults.', err);
  }
  return {
    projects: INITIAL_PROJECTS,
    publications: INITIAL_PUBLICATIONS,
    news: INITIAL_NEWS,
    blogs: INITIAL_BLOGS,
    feedback: INITIAL_FEEDBACK,
  };
}

export function saveContent(data: CentreContentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save Salama content to localStorage', err);
  }
}

export function resetContentToDefault(): CentreContentState {
  const defaults: CentreContentState = {
    projects: INITIAL_PROJECTS,
    publications: INITIAL_PUBLICATIONS,
    news: INITIAL_NEWS,
    blogs: INITIAL_BLOGS,
    feedback: INITIAL_FEEDBACK,
  };
  saveContent(defaults);
  return defaults;
}

/**
 * Helper to build custom pre-filled WhatsApp link for direct engagement
 */
export function buildWhatsAppLink(topic: string, details?: string): string {
  const base = 'https://wa.me/254724158187';
  let message = `Hello Dr. Muthoka / Salama Legacy Centre,\n\nI would like to inquire about: ${topic}.`;
  if (details) {
    message += `\n\nContext/Details: ${details}`;
  }
  message += '\n\nKindly advise on the next steps. Thank you.';
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper to build custom pre-filled Email mailto link for direct engagement
 */
export function buildEmailLink(subject: string, bodyText: string): string {
  const email = 'salamalegacy@gmail.com';
  const encodedSub = encodeURIComponent(subject);
  const fullBody = `Dear Dr. Muthoka J.K, PhD / Salama Legacy Centre Team,\n\n${bodyText}\n\nRespectfully,\nName:\nOrganisation / Institution:\nPhone / WhatsApp:`;
  const encodedBody = encodeURIComponent(fullBody);
  return `mailto:${email}?subject=${encodedSub}&body=${encodedBody}`;
}
