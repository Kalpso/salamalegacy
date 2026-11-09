/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleSw: string;
  descriptionEn: string;
  descriptionSw: string;
  deliverablesEn: string[];
  deliverablesSw: string[];
}

export interface ServiceCategory {
  key: 'research' | 'training' | 'consultancy';
  nameEn: string;
  nameSw: string;
  taglineEn: string;
  taglineSw: string;
  items: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    key: 'research',
    nameEn: 'Research & Diagnostics',
    nameSw: 'Utafiti na Utambuzi',
    taglineEn: 'Rigorous empirical inquiry driving scientific precision and community insight.',
    taglineSw: 'Uchunguzi wa kina wa kisayansi unaoleta usahihi na maarifa ya jamii.',
    items: [
      {
        id: 'res-1',
        titleEn: 'Baseline, Mid-term & Endline Evaluations',
        titleSw: 'Tathmini za Mwanzo, Kati na Mwisho wa Miradi',
        descriptionEn: 'Comprehensive project evaluation frameworks measuring programmatic impact, theory of change, efficiency, and sustainability for donors, county governments, and NGOs.',
        descriptionSw: 'Mifumo ya kina ya kutathmini athari za miradi, nadharia ya mabadiliko, ufanisi na uendelevu kwa wafadhili, serikali za kaunti na mashirika ya kijamii.',
        deliverablesEn: ['Inception reports & indicators matrix', 'Field data collection protocol', 'Comprehensive evaluation reports & scorecards'],
        deliverablesSw: ['Ripoti ya mwanzo na vipimo vya mradi', 'Mbinu za ukusanyaji data mashinani', 'Ripoti kamili ya tathmini na kadi za matokeo'],
      },
      {
        id: 'res-2',
        titleEn: 'Socio-Economic & Demographic Field Surveys',
        titleSw: 'Tafiti za Kijamii-Kiuchumi na Kidemografia',
        descriptionEn: 'Rigorous household and community-level surveys investigating poverty dynamics, rural livelihoods, agricultural value chains, and devolved service delivery in Kenya.',
        descriptionSw: 'Uchunguzi wa kina wa kaya na jamii unaochunguza maisha ya vijijini, kilimo cha biashara na utoaji wa huduma za ugatuzi nchini Kenya.',
        deliverablesEn: ['Statistically validated sampling designs', 'Digital survey instruments (ODK/Kobo)', 'Disaggregated demographic datasets'],
        deliverablesSw: ['Sampuli zilizoidhinishwa kitakwimu', 'Dodoso za kidijitali za ODK/Kobo', 'Seti za data zilizochanganuliwa'],
      },
      {
        id: 'res-3',
        titleEn: 'Mixed-Methods Academic Research Support',
        titleSw: 'Usaidizi wa Utafiti wa Mbinu Mseto wa Kitaaluma',
        descriptionEn: 'Scholarly guidance for graduate researchers, PhD candidates, and institutional research units spanning qualitative coding, quantitative modeling, and peer review.',
        descriptionSw: 'Mwongozo wa kitaaluma kwa wanafunzi wa uzamili na uzamivu (PhD) na vitengo vya utafiti vya taasisi unaohusu mbinu za kimaelezo na takwimu.',
        deliverablesEn: ['Methodology chapter formulation', 'Rigorous peer-review readiness audits', 'Ethical clearance protocol support (NACOSTI/ERC)'],
        deliverablesSw: ['Kuandaa sura ya mbinu za utafiti', 'Ukaguzi wa kujiandaa na ukaguzi wa kitaalamu', 'Usaidizi wa vibali vya kimaadili (NACOSTI/ERC)'],
      },
      {
        id: 'res-4',
        titleEn: 'Data Analytics, Modeling & Statistical Reporting',
        titleSw: 'Uchambuzi wa Data, Miundo ya Takwimu na Ripoti',
        descriptionEn: 'Advanced econometric modeling, regression analysis, predictive forecasting, and interactive data visualization translating complex variables into actionable clarity.',
        descriptionSw: 'Miundo ya juu ya kiuchumi, uchambuzi wa takwimu za hali ya juu, na uwasilishaji wa data unaorahisisha maamuzi muhimu.',
        deliverablesEn: ['Cleaned and weighted codebooks', 'Statistical regression and hypothesis testing', 'Executive dashboard visual summaries'],
        deliverablesSw: ['Nyaraka safi za takwimu', 'Majaribio ya takwimu na nadharia', 'Dashibodi za kuona matokeo kwa viongozi'],
      },
      {
        id: 'res-5',
        titleEn: 'Policy Briefs & Strategic Scholarly Publications',
        titleSw: 'Miongozo ya Sera na Machapisho ya Kimkakati',
        descriptionEn: 'Distilling complex multi-year research findings into sharp, high-level policy briefs targeted at county assemblies, national ministries, and development boards.',
        descriptionSw: 'Kufupisha matokeo ya utafiti kuwa miongozo makini ya sera kwa mabunge ya kaunti, wizara za kitaifa na bodi za maendeleo.',
        deliverablesEn: ['4-page executive policy briefs', 'Actionable legislative recommendations', 'Stakeholder presentation packages'],
        deliverablesSw: ['Muhtasari wa kurasa 4 wa sera', 'Mapendekezo ya kisheria yanayotekelezeka', 'Vifurushi vya mawasilisho kwa wadau'],
      },
    ],
  },
  {
    key: 'training',
    nameEn: 'Training & Capacity Building',
    nameSw: 'Mafunzo na Kujenga Uwezo',
    taglineEn: 'Empowering researchers, public servants, and students through practical skill transfer.',
    taglineSw: 'Kuwezesha watafiti, watumishi wa umma na wanafunzi kupitia ujuzi halisi wa vitendo.',
    items: [
      {
        id: 'tra-1',
        titleEn: 'Research Methodology & Proposal Writing Masterclasses',
        titleSw: 'Mafunzo ya Mbinu za Utafiti na Uandishi wa Mapendekezo',
        descriptionEn: 'Intensive modular workshops covering research question formulation, theoretical framing, conceptual models, and winning competitive grant proposals.',
        descriptionSw: 'Warsha za vitendo zinazohusu uundaji wa maswali ya utafiti, mifumo ya kinadharia na uandishi wa mapendekezo ya kushinda ruzuku.',
        deliverablesEn: ['Complete proposal templates & rubrics', 'Hands-on grant pitch clinics', 'Certificate of Completion with CPD hours'],
        deliverablesSw: ['Mifano kamili ya mapendekezo', 'Kliniki za uwasilishaji wa maombi ya ruzuku', 'Cheti cha Mafunzo'],
      },
      {
        id: 'tra-2',
        titleEn: 'Statistical Software Masterclasses (SPSS, R, STATA, NVivo)',
        titleSw: 'Mafunzo ya Programu za Takwimu (SPSS, R, STATA, NVivo)',
        descriptionEn: 'Hands-on computer laboratory training in quantitative data analysis, survey data cleaning, inferential testing, and qualitative thematic matrix coding.',
        descriptionSw: 'Mafunzo ya maabara ya kompyuta katika uchambuzi wa data ya takwimu, kusafisha data za dodoso na uchambuzi wa kimaelezo wa NVivo.',
        deliverablesEn: ['Syntax workbooks and reproducible scripts', 'Practice survey datasets', 'Post-training support desk access'],
        deliverablesSw: ['Madaftari ya msimbo na data za mazoezi', 'Seti za data za majaribio', 'Usaidizi wa baada ya mafunzo'],
      },
      {
        id: 'tra-3',
        titleEn: 'Institutional Leadership, Governance & Ethics',
        titleSw: 'Uongozi wa Kitaasisi, Utawala Bora na Maadili',
        descriptionEn: 'Specialized executive leadership modules designed for county administrators, board members, educational directors, and community leaders.',
        descriptionSw: 'Mafunzo maalum ya uongozi kwa maafisa wa kaunti, wajumbe wa bodi, wakurugenzi wa elimu na viongozi wa jamii.',
        deliverablesEn: ['Ethical compliance benchmarks', 'Organizational culture audit tools', 'Leadership action roadmaps'],
        deliverablesSw: ['Vigezo vya kufuata maadili', 'Zana za ukaguzi wa utamaduni wa taasisi', 'Ramani ya utekelezaji wa uongozi'],
      },
      {
        id: 'tra-4',
        titleEn: 'Academic Writing, Manuscript Preparation & Peer Review',
        titleSw: 'Uandishi wa Kitaaluma, Maandalizi ya Makala na Ukaguzi',
        descriptionEn: 'Step-by-step coaching for early-career academicians to structure journal articles, respond to reviewers constructively, and publish in indexed journals.',
        descriptionSw: 'Mwongozo wa hatua kwa hatua kwa watafiti chipukizi kuandaa makala za kitaaluma na kuchapisha katika majarida yenye viwango vya juu.',
        deliverablesEn: ['Manuscript readiness checklist', 'Review response strategy guides', 'Citation indexing advisory'],
        deliverablesSw: ['Orodha ya uhakiki wa makala', 'Mikakati ya kujibu maoni ya wakaguzi', 'Ushauri wa viwango vya manukuu'],
      },
      {
        id: 'tra-5',
        titleEn: 'Community Youth & Women Empowerment Skills',
        titleSw: 'Ujuzi wa Uwezeshaji wa Vijana na Wanawake Katika Jamii',
        descriptionEn: 'Grassroots training in financial literacy, participatory budgeting, community dialogue facilitation, and modern digital productivity tools.',
        descriptionSw: 'Mafunzo ya mashinani katika elimu ya fedha, bajeti shirikishi, mazungumzo ya kijamii na zana za kidijitali za uzalishaji.',
        deliverablesEn: ['Grassroots facilitator toolkits in Swahili/English', 'Community project design guides', 'Mentorship follow-ups'],
        deliverablesSw: ['Zana za wawezeshaji kwa Kiswahili na Kiingereza', 'Miongozo ya kuunda miradi ya kijamii', 'Ufuatiliaji wa ushauri nasaha'],
      },
    ],
  },
  {
    key: 'consultancy',
    nameEn: 'Institutional Consultancy',
    nameSw: 'Ushauri wa Kitaasisi',
    taglineEn: 'Strategic advisory, systems strengthening, and policy innovation with dignity.',
    taglineSw: 'Ushauri wa kimkakati, kuimarisha mifumo na ubunifu wa sera kwa utu na heshima.',
    items: [
      {
        id: 'con-1',
        titleEn: 'Strategic Planning & Organizational Development',
        titleSw: 'Mipango Mkakati na Maendeleo ya Shirika',
        descriptionEn: 'Facilitating 5-year strategic plans, visioning retreats, operational restructuring, and organizational change management for academic institutions, NGOs, and enterprises.',
        descriptionSw: 'Kuandaa mipango mkakati ya miaka mitano, warsha za dira, urekebishaji wa kiutendaji na usimamizi wa mabadiliko ya kitaasisi.',
        deliverablesEn: ['5-Year Strategic Plan Document', 'Costed implementation matrix & balanced scorecard', 'Resource mobilization strategy'],
        deliverablesSw: ['Nyaraka ya Mpango Mkakati wa Miaka 5', 'Jedwali la bajeti na utekelezaji', 'Mkakati wa kutafuta rasilimali'],
      },
      {
        id: 'con-2',
        titleEn: 'Monitoring, Evaluation, Accountability & Learning (MEAL)',
        titleSw: 'Ufuatiliaji, Tathmini, Uwajibikaji na Kujifunza (MEAL)',
        descriptionEn: 'Institutionalizing rigorous data-driven MEAL systems, digital monitoring dashboards, community feedback loops, and learning agendas.',
        descriptionSw: 'Kuanzisha mifumo thabiti ya MEAL inayotumia data, dashibodi za ufuatiliaji, njia za maoni ya jamii na ajenda za kujifunza.',
        deliverablesEn: ['Custom MEAL frameworks and indicator reference sheets', 'Automated cloud dashboard architectures', 'Annual institutional learning briefs'],
        deliverablesSw: ['Mifumo maalum ya MEAL na marejeleo ya viashiria', 'Mifumo ya kidijitali ya ufuatiliaji', 'Muhtasari wa kujifunza wa mwaka'],
      },
      {
        id: 'con-3',
        titleEn: 'Environmental, Climate & Social Impact Assessments (ESIA)',
        titleSw: 'Tathmini ya Athari za Mazingira, Hali ya Hewa na Jamii',
        descriptionEn: 'Advising on sustainable community-level climate resilience, water conservation projects, land governance, and environmental compliance in arid/semi-arid regions.',
        descriptionSw: 'Kutoa ushauri kuhusu ustahimilivu wa mabadiliko ya tabianchi, miradi ya maji, usimamizi wa ardhi na kufuata sheria za mazingira.',
        deliverablesEn: ['Contextual socio-environmental baseline audits', 'Stakeholder engagement and mitigation matrices', 'Regulatory compliance dossiers'],
        deliverablesSw: ['Ukaguzi wa mwanzo wa mazingira na jamii', 'Mkakati wa kuhusisha wadau na kupunguza madhara', 'Nyaraka za kufuata sheria za mazingira'],
      },
      {
        id: 'con-4',
        titleEn: 'County Governance & Public Policy Advisory',
        titleSw: 'Utawala wa Kaunti na Ushauri wa Sera za Umma',
        descriptionEn: 'Technical assistance to County departments in Makueni and across Kenya for public participation formulation, CIDP alignment, and evidence-based legislative review.',
        descriptionSw: 'Usaidizi wa kiufundi kwa idara za serikali za kaunti Makueni na Kenya nzima katika ushirikishwaji wa umma na sera zilizojengwa kwa ushahidi.',
        deliverablesEn: ['CIDP & sector plan diagnostic reports', 'Citizen engagement frameworks', 'Legislative evidence briefs'],
        deliverablesSw: ['Ripoti za uchunguzi wa mipango ya kaunti (CIDP)', 'Mifumo ya ushirikishwaji wa wananchi', 'Miongozo ya ushahidi kwa sheria'],
      },
      {
        id: 'con-5',
        titleEn: 'Feasibility Studies & Investment Appraisal',
        titleSw: 'Upembuzi Yakinifu na Tathmini ya Uwekezaji',
        descriptionEn: 'Empirical market demand validation, cost-benefit analyses, and community acceptance feasibility studies for new programmes and private-public ventures.',
        descriptionSw: 'Kuthibitisha mahitaji ya soko, uchambuzi wa gharama na faida, na tafiti za kukubalika kwa miradi mipya ya maendeleo na uwekezaji.',
        deliverablesEn: ['Bankable feasibility study reports', 'Financial viability and risk mitigation models', 'Community impact projections'],
        deliverablesSw: ['Ripoti ya upembuzi yakinifu inayokubalika benki', 'Miundo ya kupunguza hatari za kifedha', 'Makadirio ya athari chanya kwa jamii'],
      },
    ],
  },
];
