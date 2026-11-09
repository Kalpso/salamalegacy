/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'sw';

export interface TranslationDict {
  // Brand & Top Bar
  orgName: string;
  tagline: string;
  locationHeader: string;
  phone: string;
  email: string;
  whatsAppButton: string;
  bookConsultation: string;

  // Nav
  navHome: string;
  navAbout: string;
  navServices: string;
  navWorkflow: string;
  navPublications: string;
  navNews: string;
  navMore: string;
  navProjects: string;
  navBlog: string;
  navFeedback: string;
  navContact: string;
  langToggle: string;

  // Splash
  splashEstBadge: string;
  splashPill1: string;
  splashPill2: string;
  splashPill3: string;
  splashPill4: string;
  splashLoading: string;
  splashSkip: string;

  // Hero
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBtnPrimary: string;
  heroBtnSecondary: string;

  // Service Strip
  strip1Title: string;
  strip1Desc: string;
  strip2Title: string;
  strip2Desc: string;
  strip3Title: string;
  strip3Desc: string;
  strip4Title: string;
  strip4Desc: string;

  // Why Choose Us
  whyChooseHeadline: string;
  whyChooseSubtitle: string;
  whyCard1Title: string;
  whyCard1Desc: string;
  whyCard2Title: string;
  whyCard2Desc: string;
  whyCard3Title: string;
  whyCard3Desc: string;
  whyCard4Title: string;
  whyCard4Desc: string;

  // About Section
  aboutHeading: string;
  aboutSubtitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  directorTitle: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  val1Title: string;
  val1Desc: string;
  val2Title: string;
  val2Desc: string;
  val3Title: string;
  val3Desc: string;
  val4Title: string;
  val4Desc: string;
  val5Title: string;
  val5Desc: string;

  // Services
  servicesHeading: string;
  servicesSubtitle: string;
  tabResearch: string;
  tabTraining: string;
  tabConsultancy: string;

  // Research Workflow
  workflowHeading: string;
  workflowSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;
  step6Title: string;
  step6Desc: string;

  // Projects
  projectsHeading: string;
  projectsSubtitle: string;
  projectsComingSoonTitle: string;
  projectsComingSoonText: string;
  projectsEnquireBtn: string;

  // Publications
  publicationsHeading: string;
  publicationsSubtitle: string;
  pubSearchPlaceholder: string;
  pubFilterAll: string;
  pubFilterPapers: string;
  pubFilterBriefs: string;
  pubFilterReports: string;
  pubFilterGuides: string;
  pubComingSoonTitle: string;
  pubComingSoonText: string;
  pubSubmitLink: string;
  pubReadDrive: string;

  // Feedback
  feedbackHeading: string;
  feedbackSubtitle: string;
  feedbackEmptyTitle: string;
  feedbackEmptyText: string;
  feedbackFormTitle: string;
  feedbackFormSubtitle: string;
  feedbackNameLabel: string;
  feedbackNamePlaceholder: string;
  feedbackOrgLabel: string;
  feedbackOrgPlaceholder: string;
  feedbackEmailLabel: string;
  feedbackEmailPlaceholder: string;
  feedbackRatingLabel: string;
  feedbackMsgLabel: string;
  feedbackMsgPlaceholder: string;
  feedbackConsent: string;
  feedbackSubmitBtn: string;
  feedbackSending: string;
  feedbackSuccessMsg: string;

  // News
  newsHeading: string;
  newsSubtitle: string;
  newsReadMore: string;

  // Blog
  blogHeading: string;
  blogSubtitle: string;
  blogComingSoonTitle: string;
  blogComingSoonText: string;
  blogSubmitBtn: string;

  // CTA Banner
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaPrimaryBtn: string;
  ctaSecondaryBtn: string;

  // Contact
  contactHeading: string;
  contactSubtitle: string;
  contactFormTitle: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactPhoneLabel: string;
  contactSubjectLabel: string;
  contactMessageLabel: string;
  contactSubmitBtn: string;
  contactSending: string;
  contactSuccessMsg: string;
  contactDetailsTitle: string;
  contactHoursTitle: string;
  contactHoursWeekdays: string;
  contactHoursSat: string;
  contactHoursSun: string;
  mapTitle: string;

  // Footer
  footerAbout: string;
  footerQuickLinks: string;
  footerLegal: string;
  footerCopyright: string;
  footerRights: string;
  socialNotice: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    orgName: 'Salama Legacy Centre',
    tagline: 'Service with Dignity is Our Hallmark',
    locationHeader: 'Salama Town, Makueni County, Kenya',
    phone: '+254 724 158 187',
    email: 'salamalegacy@gmail.com',
    whatsAppButton: 'WhatsApp Us',
    bookConsultation: 'Book a Consultation',

    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navWorkflow: 'Workflow',
    navPublications: 'Publications',
    navNews: 'News',
    navMore: 'More',
    navProjects: 'Projects',
    navBlog: 'Blog',
    navFeedback: 'Feedback',
    navContact: 'Contact',
    langToggle: 'Kiswahili',

    splashEstBadge: 'ESTABLISHED · MAKUENI, KENYA',
    splashPill1: 'Research',
    splashPill2: 'Training',
    splashPill3: 'Consultancy',
    splashPill4: 'Innovation',
    splashLoading: 'Loading portal...',
    splashSkip: 'Skip Intro',

    heroBadge: 'Research · Training · Consultancy · Innovation',
    heroHeadline: 'Advancing Research, Innovation and Academic Excellence',
    heroSubheadline:
      'A premier multidisciplinary research, professional training, and institutional consultancy institute in Salama Town, Makueni County, Kenya — empowering organisations and communities through dignified, evidence-driven solutions.',
    heroBtnPrimary: 'Start your research project',
    heroBtnSecondary: 'Explore our services',

    strip1Title: 'Empirical Research',
    strip1Desc: 'Quantitative & qualitative field research with scientific rigor',
    strip2Title: 'Professional Training',
    strip2Desc: 'Capacity building masterclasses, data analytics & ethics',
    strip3Title: 'Institutional Consultancy',
    strip3Desc: 'Strategic planning, MEAL frameworks & policy advisory',
    strip4Title: 'Grassroots Innovation',
    strip4Desc: 'Community-centered socio-economic solutions with dignity',

    whyChooseHeadline: 'Why Salama Legacy Centre',
    whyChooseSubtitle: 'Founded upon scholarly precision, grassroots understanding, and ethical commitment.',
    whyCard1Title: 'PhD-Led Academic Rigor',
    whyCard1Desc: 'Directed by Dr. Muthoka J.K, PhD, combining deep academic expertise, proven research methodology, and peer-reviewed rigor across disciplines.',
    whyCard2Title: 'Rooted in Makueni & Eastern Africa',
    whyCard2Desc: 'Deep contextual insight into rural-urban development dynamics, county governance systems, community livelihoods, and local partnerships.',
    whyCard3Title: 'Service with Dignity',
    whyCard3Desc: 'Our non-negotiable hallmark: upholding human dignity, community mutual respect, ethical data stewardship, and transparent partnerships in every engagement.',
    whyCard4Title: 'Actionable, Policy-Grade Deliverables',
    whyCard4Desc: 'We bridge theoretical scholarship with pragmatic execution — delivering reports, frameworks, and insights ready for executive and policy implementation.',

    aboutHeading: 'About Salama Legacy Centre',
    aboutSubtitle: 'A beacon of academic inquiry, ethical practice, and socio-economic transformation.',
    aboutP1:
      'Salama Legacy Centre was established under the visionary leadership of Dr. Muthoka J.K, PhD, to provide an academic and practical nexus where empirical research directly informs community empowerment and institutional effectiveness. Located strategically in Salama Town, along the major Mombasa-Nairobi corridor in Makueni County, the Centre serves as a catalyst for regional advancement.',
    aboutP2:
      'Our multidisciplinary portfolio spans baseline and impact evaluations, demographic and socio-economic field investigations, specialized statistical training, institutional governance advisory, and innovative community interventions. We partner with academic institutions, county governments, international development agencies, non-governmental organisations, and private enterprises to tackle complex socio-economic challenges.',
    aboutP3:
      'Anchored by our motto, "Service with Dignity is Our Hallmark," the Centre is committed to conducting rigorous, unbiased research that respects the dignity of research participants while equipping leaders and communities with transformative knowledge.',
    directorTitle: 'Director: Dr. Muthoka J.K, PhD',
    visionTitle: 'Our Vision',
    visionText:
      'To be a premier African centre of excellence in transformative research, innovative capacity building, and ethical consultancy that fosters dignified, sustainable community prosperity.',
    missionTitle: 'Our Mission',
    missionText:
      'To conduct rigorous academic and socio-economic research, deliver cutting-edge professional training, provide evidence-based consultancy, and spearhead grassroots innovations that solve contemporary societal challenges with integrity and dignity.',
    valuesTitle: 'Our Core Values',
    val1Title: 'Dignity in Service',
    val1Desc: 'Upholding the inherent worth, respect, and dignity of every partner, client, research participant, and community we serve.',
    val2Title: 'Academic Rigor & Integrity',
    val2Desc: 'Uncompromising adherence to scientific truth, research ethics, intellectual honesty, and methodological excellence.',
    val3Title: 'Innovation & Excellence',
    val3Desc: 'Developing forward-thinking, creative methodologies and technological solutions tailored to dynamic African contexts.',
    val4Title: 'Collaboration & Inclusivity',
    val4Desc: 'Fostering interdisciplinary partnerships, participatory community methodologies, and cross-sectoral synergy.',
    val5Title: 'Accountability & Stewardship',
    val5Desc: 'Transparent governance, responsible data stewardship, and measurable long-term societal impact.',

    servicesHeading: 'Our Core Services',
    servicesSubtitle: 'Tailored research, training, and consultancy capabilities delivered with academic excellence.',
    tabResearch: 'Research',
    tabTraining: 'Training',
    tabConsultancy: 'Consultancy',

    workflowHeading: 'Our Research Workflow',
    workflowSubtitle: 'A structured, rigorous 6-step methodological lifecycle ensuring data integrity from concept to dissemination.',
    step1Title: 'Conceptualisation & Inception',
    step1Desc: 'Refining the problem statement, literature review, theoretical framework, research questions, and stakeholder objectives.',
    step2Title: 'Methodological Design & Tool Protocol',
    step2Desc: 'Designing sampling strategies, survey protocols, interview guides, ethical review submissions, and digital survey configuration.',
    step3Title: 'Fieldwork & Empirical Data Collection',
    step3Desc: 'Deploying trained field researchers, conducting rigorous quality checks, GPS verification, and real-time supervisory data audits.',
    step4Title: 'Analysis & Synthesis',
    step4Desc: 'Executing advanced statistical modeling, econometric analysis, qualitative thematic coding, and cross-tabulations.',
    step5Title: 'Validation & Policy-Grade Reporting',
    step5Desc: 'Convening stakeholder validation workshops, synthesizing executive summaries, technical reports, and actionable policy briefs.',
    step6Title: 'Translation into Action & Monitoring',
    step6Desc: 'Supporting dissemination, institutional integration of findings, and longitudinal monitoring of community or programmatic impact.',

    projectsHeading: 'Our Projects',
    projectsSubtitle: 'Applied research initiatives and community-grounded development studies.',
    projectsComingSoonTitle: 'Projects in Inception — Details Coming Soon',
    projectsComingSoonText:
      'Salama Legacy Centre is currently compiling baseline project briefs and programmatic documentation for ongoing research initiatives across Makueni County and Eastern Kenya. We will publish peer-reviewed project briefs and case studies here shortly.',
    projectsEnquireBtn: 'Enquire about a project',

    publicationsHeading: 'Publications & Research Outputs',
    publicationsSubtitle: 'Peer-reviewed studies, policy briefs, and methodological guides published by the Centre.',
    pubSearchPlaceholder: 'Search publications by keyword or title...',
    pubFilterAll: 'All Outputs',
    pubFilterPapers: 'Research Papers',
    pubFilterBriefs: 'Policy Briefs',
    pubFilterReports: 'Technical Reports',
    pubFilterGuides: 'Methodology Guides',
    pubComingSoonTitle: 'Publications in Review — Coming Soon',
    pubComingSoonText:
      'Our inaugural series of scholarly articles, policy monographs, and methodological working papers are currently undergoing peer review and editorial finalisation. Check back shortly or contact our editorial desk to submit a manuscript.',
    pubSubmitLink: 'Submit a publication enquiry',
    pubReadDrive: 'Access Document',

    feedbackHeading: 'Client & Stakeholder Feedback',
    feedbackSubtitle: 'Honest reviews and reflections from our partners, workshop trainees, and research collaborators.',
    feedbackEmptyTitle: 'No Feedback Published Yet',
    feedbackEmptyText:
      'In accordance with our strict ethics policy, we only publish verified feedback where written consent has been provided by our clients and partners. We invite you to share your feedback below.',
    feedbackFormTitle: 'Submit Your Feedback',
    feedbackFormSubtitle: 'Your perspective helps us maintain service with dignity and continuous academic refinement.',
    feedbackNameLabel: 'Full Name *',
    feedbackNamePlaceholder: 'e.g. Dr. Jane Mutua',
    feedbackOrgLabel: 'Organisation / Institution *',
    feedbackOrgPlaceholder: 'e.g. University / County Government / NGO',
    feedbackEmailLabel: 'Email Address *',
    feedbackEmailPlaceholder: 'e.g. j.mutua@example.org',
    feedbackRatingLabel: 'Your Rating (1 to 5 Stars) *',
    feedbackMsgLabel: 'Feedback / Testimonial Message *',
    feedbackMsgPlaceholder: 'Please describe your experience working with Salama Legacy Centre...',
    feedbackConsent: 'I grant Salama Legacy Centre written consent to review and publish this feedback on their official channels.',
    feedbackSubmitBtn: 'Submit Feedback',
    feedbackSending: 'Submitting feedback...',
    feedbackSuccessMsg: 'Thank you! Your feedback has been received and will be reviewed in accordance with our dignity and consent standards.',

    newsHeading: 'News & Announcements',
    newsSubtitle: 'Stay updated with developments, research milestones, and institutional events at the Centre.',
    newsReadMore: 'Read Full Announcement',

    blogHeading: 'Legacy Insights Blog',
    blogSubtitle: 'Commentaries, methodological reflections, and thought leadership from our research fellows.',
    blogComingSoonTitle: 'Blog Posts Coming Soon',
    blogComingSoonText:
      'The Salama Legacy editorial desk is preparing an insightful series of essays addressing research ethics in rural Kenya, devolved data systems in Makueni, and innovative community monitoring. Have an article idea or wish to contribute?',
    blogSubmitBtn: 'Submit an article proposal',

    ctaHeadline: 'Partner with Salama Legacy Centre for Evidence-Based Transformation',
    ctaSubtitle:
      'Whether you are designing a complex baseline survey, training your institutional team in data analytics, or seeking strategic advisory in Makueni County — we serve with dignity and rigor.',
    ctaPrimaryBtn: 'Schedule a Consultation',
    ctaSecondaryBtn: 'Message on WhatsApp',

    contactHeading: 'Contact & Location',
    contactSubtitle: 'Reach out to Dr. Muthoka J.K, PhD and the Salama Legacy Centre team.',
    contactFormTitle: 'Send Us a Message',
    contactNameLabel: 'Full Name *',
    contactEmailLabel: 'Email Address *',
    contactPhoneLabel: 'Phone / WhatsApp Number',
    contactSubjectLabel: 'Subject / Area of Interest *',
    contactMessageLabel: 'Your Message / Inquiry Details *',
    contactSubmitBtn: 'Send Message via Formspree',
    contactSending: 'Transmitting message...',
    contactSuccessMsg: 'Thank you! Your inquiry has been dispatched to Dr. Muthoka J.K and the Salama Legacy Centre team. We will respond promptly.',
    contactDetailsTitle: 'Salama Legacy Centre Secretariat',
    contactHoursTitle: 'Working Hours (EAT)',
    contactHoursWeekdays: 'Monday – Friday: 8:00 AM – 5:00 PM',
    contactHoursSat: 'Saturday: 9:00 AM – 1:00 PM',
    contactHoursSun: 'Sunday & Public Holidays: Closed',
    mapTitle: 'Google Map of Salama Town, Makueni County, Kenya',

    footerAbout: 'Salama Legacy Centre is a premier multidisciplinary research, professional training, and institutional consultancy institute in Salama Town, Makueni County, Kenya. Service with Dignity is Our Hallmark.',
    footerQuickLinks: 'Quick Links',
    footerLegal: 'Accreditation & Ethics',
    footerCopyright: 'Salama Legacy Centre. All Rights Reserved.',
    footerRights: 'Registered in Kenya. Directed by Dr. Muthoka J.K, PhD.',
    socialNotice: 'Official verified links will appear here once connected.',
  },
  sw: {
    orgName: 'Kituo cha Salama Legacy',
    tagline: 'Utumishi Wenye Utu na Heshima Ndio Nembo Yetu',
    locationHeader: 'Mji wa Salama, Kaunti ya Makueni, Kenya',
    phone: '+254 724 158 187',
    email: 'salamalegacy@gmail.com',
    whatsAppButton: 'Tupigie WhatsApp',
    bookConsultation: 'Weka Ushauri',

    navHome: 'Nyumbani',
    navAbout: 'Kuhusu Sisi',
    navServices: 'Huduma',
    navWorkflow: 'Mchakato wa Utafiti',
    navPublications: 'Machapisho',
    navNews: 'Habari',
    navMore: 'Zaidi',
    navProjects: 'Miradi',
    navBlog: 'Makala',
    navFeedback: 'Maoni',
    navContact: 'Mawasiliano',
    langToggle: 'English',

    splashEstBadge: 'KILICHOANZISHWA · MAKUENI, KENYA',
    splashPill1: 'Utafiti',
    splashPill2: 'Mafunzo',
    splashPill3: 'Ushauri',
    splashPill4: 'Ubunifu',
    splashLoading: 'Inafungua wavuti...',
    splashSkip: 'Ruka Utangulizi',

    heroBadge: 'Utafiti · Mafunzo · Ushauri wa Kitaalamu · Ubunifu',
    heroHeadline: 'Kukuza Utafiti, Ubunifu na Ubora wa Kitaaluma',
    heroSubheadline:
      'Kituo kikuu cha utafiti wa fani mbalimbali, mafunzo ya kitaalamu na ushauri wa kitaasisi kilichopo Mji wa Salama, Kaunti ya Makueni, Kenya — kikiwezesha taasisi na jamii kupitia suluhu zenye utu na ushahidi thabiti.',
    heroBtnPrimary: 'Anzisha mradi wako wa utafiti',
    heroBtnSecondary: 'Tazama huduma zetu',

    strip1Title: 'Utafiti Thabiti wa Mashinani',
    strip1Desc: 'Uchunguzi wa kiasi na maelezo kwa viwango vya juu vya kisayansi',
    strip2Title: 'Mafunzo ya Kitaalamu',
    strip2Desc: 'Kujenga uwezo, uchambuzi wa takwimu na maadili ya kitaaluma',
    strip3Title: 'Ushauri wa Kitaasisi',
    strip3Desc: 'Mipango mkakati, mifumo ya MEAL na miongozo ya sera',
    strip4Title: 'Ubunifu wa Jamii',
    strip4Desc: 'Suluhu za kiuchumi na kijamii zinazojali utu wa jamii',

    whyChooseHeadline: 'Kwa Nini Uchague Salama Legacy Centre',
    whyChooseSubtitle: 'Kimejengwa juu ya usahihi wa kitaaluma, uelewa wa mashinani, na ahadi ya kimaadili.',
    whyCard1Title: 'Uongozi wa Kiwango cha PhD',
    whyCard1Desc: 'Chini ya uongozi wa Mkurugenzi Dkt. Muthoka J.K, PhD, kikiunganisha utaalamu wa hali ya juu na mbinu thabiti za utafiti wa kisayansi.',
    whyCard2Title: 'Kimejikitika Makueni na Afrika Mashariki',
    whyCard2Desc: 'Ufahamu wa kina wa maendeleo ya vijijini na mijini, utawala wa serikali za kaunti, maisha ya jamii, na ushirikiano wa wenyeji.',
    whyCard3Title: 'Utumishi Wenye Utu na Heshima',
    whyCard3Desc: 'Nembo yetu isiyojadiliwa: kulinda utu wa binadamu, kuheshimiana, usimamizi wa maadili wa data, na ushirikiano wa uwazi.',
    whyCard4Title: 'Matokeo Yanayotekelezeka kwa Sera',
    whyCard4Desc: 'Tunaunganisha taaluma ya darasani na utekelezaji halisi — tukitoa ripoti na mikakati tayari kwa uongozi na watunga sera.',

    aboutHeading: 'Kuhusu Kituo cha Salama Legacy',
    aboutSubtitle: 'Mwanga wa uchunguzi wa kitaaluma, maadili mema, na mabadiliko chanya ya jamii na uchumi.',
    aboutP1:
      'Kituo cha Salama Legacy Centre kilianzishwa chini ya uongozi mahiri wa Dkt. Muthoka J.K, PhD, ili kutoa kiungo muhimu cha kitaaluma na kiutendaji ambapo utafiti wa kisayansi unaleta uwezeshaji wa moja kwa moja kwa jamii na ufanisi wa taasisi. Kikiwa kimewekwa kimkakati katika Mji wa Salama, kwenye barabara kuu ya Mombasa-Nairobi ndani ya Kaunti ya Makueni, Kituo hiki ni nguzo ya maendeleo ya eneo lote.',
    aboutP2:
      'Huduma zetu mbalimbali zinajumuisha tathmini za miradi (baseline na tathmini za mwisho), tafiti za kidemografia na kijamii-kiuchumi, mafunzo ya kitaalamu ya uchambuzi wa takwimu, ushauri wa utawala wa kitaasisi, na mikakati bunifu ya kusaidia jamii. Tunashirikiana na vyuo vikuu, serikali za kaunti, mashirika ya kimataifa, mashirika yasiyo ya kiserikali (NGOs), na sekta binafsi kutatua changamoto za kijamii.',
    aboutP3:
      'Kwa kuongozwa na kaulimbiu yetu, "Utumishi Wenye Utu na Heshima Ndio Nembo Yetu," Kituo kimejitolea kufanya utafiti usiopendelea ambao unalinda utu wa washiriki huku kikiwapa viongozi na wananchi maarifa yenye kuleta mapinduzi ya maendeleo.',
    directorTitle: 'Mkurugenzi: Dkt. Muthoka J.K, PhD',
    visionTitle: 'Maono Yetu',
    visionText:
      'Kuwa kitovu kikuu cha ubora barani Afrika katika utafiti wenye mageuzi, kujenga uwezo wa kiubunifu, na ushauri wa kimaadili unaokuza ustawi wa jamii wenye utu na endelevu.',
    missionTitle: 'Dhamira Yetu',
    missionText:
      'Kufanya utafiti thabiti wa kitaaluma na kijamii-kiuchumi, kutoa mafunzo ya kitaalamu ya hali ya juu, kutoa ushauri wenye ushahidi, na kuongoza ubunifu wa mashinani unaotatua changamoto za kijamii kwa uadilifu na utu.',
    valuesTitle: 'Maadili Yetu ya Msingi',
    val1Title: 'Utu Katika Utumishi',
    val1Desc: 'Kuthamini hadhi na heshima ya asili ya kila mshirika, mteja, mshiriki wa utafiti na jamii tunayoitumikia.',
    val2Title: 'Uadilifu na Ukamilifu wa Kitaaluma',
    val2Desc: 'Kuzingatia bila kulegeza kamba ukweli wa kisayansi, maadili ya utafiti na ubora wa mbinu za uchunguzi.',
    val3Title: 'Ubunifu na Ubora wa Juu',
    val3Desc: 'Kuanzisha mbinu mpya zenye mawazo ya mbele na teknolojia zilizoundwa kulingana na mazingira ya Afrika.',
    val4Title: 'Ushirikiano na Ushirikishwaji',
    val4Desc: 'Kukuza ushirikiano wa fani tofauti, mbinu shirikishi za kijamii, na mshikamano wa sekta zote.',
    val5Title: 'Uwajibikaji na Utunzaji Bora',
    val5Desc: 'Uongozi wa uwazi, usimamizi wa data kwa uangalifu, na athari chanya ya muda mrefu katika jamii.',

    servicesHeading: 'Huduma Zetu za Msingi',
    servicesSubtitle: 'Uwezo wa kipekee wa utafiti, mafunzo na ushauri unaotolewa kwa viwango vya juu vya kitaaluma.',
    tabResearch: 'Utafiti',
    tabTraining: 'Mafunzo',
    tabConsultancy: 'Ushauri wa Kitaasisi',

    workflowHeading: 'Mchakato Wetu wa Utafiti',
    workflowSubtitle: 'Mfuatano wa kisayansi wa hatua 6 unaohakikisha ubora na uadilifu wa data kuanzia dhana hadi utekelezaji.',
    step1Title: 'Uundaji wa Dhana na Mwanzo',
    step1Desc: 'Kufafanua tatizo, kupitia maandiko ya kitaaluma, mifumo ya kinadharia, maswali ya utafiti na malengo ya wadau.',
    step2Title: 'Muundo wa Mbinu na Vyombo vya Utafiti',
    step2Desc: 'Kuandaa mikakati ya sampuli, dodoso, miongozo ya mahojiano, vibali vya kimaadili na mifumo ya kidijitali.',
    step3Title: 'Ukusanyaji wa Data Mashinani',
    step3Desc: 'Kutuma watafiti waliofunzwa vizuri, udhibiti mkali wa ubora, uthibitishaji wa GPS, na ukaguzi wa data kwa wakati halisi.',
    step4Title: 'Uchambuzi wa Kina wa Data',
    step4Desc: 'Kutekeleza mifumo ya takwimu ya hali ya juu, ekonometriki, uchambuzi wa kimaelezo (thematic), na uhusiano wa takwimu.',
    step5Title: 'Uthibitishaji na Ripoti za Sera',
    step5Desc: 'Kuitisha warsha za kuthibitisha matokeo na wadau, kutoa muhtasari kwa viongozi, ripoti za kitaalamu na miongozo ya sera.',
    step6Title: 'Utekelezaji na Ufuatiliaji wa Matokeo',
    step6Desc: 'Kusaidia kusambaza matokeo, kuingiza mapendekezo ndani ya taasisi, na kufuatilia mabadiliko endelevu katika jamii.',

    projectsHeading: 'Miradi Yetu',
    projectsSubtitle: 'Miradi ya utafiti inayotekelezwa na tafiti zilizojikita katika maendeleo ya jamii.',
    projectsComingSoonTitle: 'Miradi Iko Kwenye Hatua za Awali — Maelezo Yanakuja Hivi Karibuni',
    projectsComingSoonText:
      'Kituo cha Salama Legacy Centre kwa sasa kinakusanya na kukamilisha nyaraka za miradi inayoendelea katika Kaunti ya Makueni na Ukanda wa Mashariki mwa Kenya. Tutakua tukichapisha ripoti za miradi hapa punde.',
    projectsEnquireBtn: 'Ulizia kuhusu mradi',

    publicationsHeading: 'Machapisho na Matokeo ya Utafiti',
    publicationsSubtitle: 'Tafiti zilizokaguliwa na wataalamu, miongozo ya sera, na ripoti za kiufundi kutoka kituoni.',
    pubSearchPlaceholder: 'Tafuta machapisho kwa neno kuu au jina...',
    pubFilterAll: 'Machapisho Yote',
    pubFilterPapers: 'Makala ya Kitaaluma',
    pubFilterBriefs: 'Miongozo ya Sera',
    pubFilterReports: 'Ripoti za Kiufundi',
    pubFilterGuides: 'Miongozo ya Mbinu za Utafiti',
    pubComingSoonTitle: 'Machapisho Yanakaguliwa — Yanakuja Hivi Karibuni',
    pubComingSoonText:
      'Msururu wetu wa kwanza wa machapisho ya kitaaluma na miongozo ya utafiti unakamilishwa kupitia ukaguzi wa kitaaluma. Tafadhali tembelea tena hivi karibuni au wasiliana na meza yetu ya uhariri.',
    pubSubmitLink: 'Tuma ombi la chapisho',
    pubReadDrive: 'Soma Nyaraka',

    feedbackHeading: 'Maoni ya Wateja na Wadau',
    feedbackSubtitle: 'Tathmini na ushuhuda halisi kutoka kwa washirika wetu, washiriki wa warsha na watafiti.',
    feedbackEmptyTitle: 'Bado Hakuna Maoni Yaliyochapishwa',
    feedbackEmptyText:
      'Kulingana na sera yetu thabiti ya maadili, tunachapisha tu maoni yaliyothibitishwa ambapo mteja au mshirika ametoa idhini ya kimaandishi. Tunakukaribisha kuwasilisha maoni yako hapa chini.',
    feedbackFormTitle: 'Wasilisha Maoni Yako',
    feedbackFormSubtitle: 'Mchango wako unatusaidia kudumisha utumishi wenye utu na kuboresha viwango vya kitaaluma.',
    feedbackNameLabel: 'Jina Kamili *',
    feedbackNamePlaceholder: 'mfano Dkt. Jane Mutua',
    feedbackOrgLabel: 'Shirika / Taasisi *',
    feedbackOrgPlaceholder: 'mfano Chuo Kikuu / Serikali ya Kaunti / Shirika',
    feedbackEmailLabel: 'Barua Pepe *',
    feedbackEmailPlaceholder: 'mfano j.mutua@example.org',
    feedbackRatingLabel: 'Kiwango Chako cha Nyota (1 hadi 5) *',
    feedbackMsgLabel: 'Ujumbe / Maoni Yako *',
    feedbackMsgPlaceholder: 'Tafadhali eleza uzoefu wako wa kufanya kazi na Kituo cha Salama Legacy...',
    feedbackConsent: 'Natoa idhini ya kimaandishi kwa Kituo cha Salama Legacy kutathmini na kuchapisha maoni haya kwenye kurasa zao rasmi.',
    feedbackSubmitBtn: 'Wasilisha Maoni',
    feedbackSending: 'Inawasilisha maoni...',
    feedbackSuccessMsg: 'Asante sana! Maoni yako yamepokelewa na yatatathminiwa kwa kuzingatia viwango vyetu vya utu na idhini.',

    newsHeading: 'Habari na Matangazo',
    newsSubtitle: 'Pata taarifa za hivi punde kuhusu maendeleo, matukio na hatua muhimu za Kituo.',
    newsReadMore: 'Soma Tangazo Kamili',

    blogHeading: 'Makala ya Legacy Insights',
    blogSubtitle: 'Mawazo, uchambuzi wa mbinu za utafiti, na uongozi wa kitaaluma kutoka kwa watafiti wetu.',
    blogComingSoonTitle: 'Makala Yanakuja Hivi Karibuni',
    blogComingSoonText:
      'Meza ya uhariri ya Salama Legacy inaandaa mfululizo wa insha zinazohusu maadili ya utafiti vijijini nchini Kenya, mifumo ya data ya serikali za ugatuzi Makueni, na ufuatiliaji bunifu wa jamii. Je, ungependa kuandika makala nasi?',
    blogSubmitBtn: 'Wasilisha pendekezo la makala',

    ctaHeadline: 'Shirikiana na Salama Legacy Centre kwa Mabadiliko Yenye Ushahidi',
    ctaSubtitle:
      'Iwe unaunda utafiti mkubwa wa mashinani, unafunza timu yako ya kitaasisi uchambuzi wa takwimu, au unatafuta ushauri wa kimkakati Kaunti ya Makueni — tunatumikia kwa utu na ueledi wa juu.',
    ctaPrimaryBtn: 'Panga Ushauri Nasi',
    ctaSecondaryBtn: 'Wasiliana Kupitia WhatsApp',

    contactHeading: 'Mawasiliano na Mahali Tulipo',
    contactSubtitle: 'Wasiliana na Dkt. Muthoka J.K, PhD pamoja na timu ya Kituo cha Salama Legacy.',
    contactFormTitle: 'Tutumie Ujumbe',
    contactNameLabel: 'Jina Kamili *',
    contactEmailLabel: 'Barua Pepe *',
    contactPhoneLabel: 'Nambari ya Simu / WhatsApp',
    contactSubjectLabel: 'Somo / Eneo la Nia *',
    contactMessageLabel: 'Ujumbe Wako / Maelezo ya Uchunguzi *',
    contactSubmitBtn: 'Tuma Ujumbe Kupitia Formspree',
    contactSending: 'Inatuma ujumbe...',
    contactSuccessMsg: 'Asante! Ujumbe wako umetumwa kwa Dkt. Muthoka J.K na timu ya Kituo cha Salama Legacy. Tutakujibu haraka iwezekanavyo.',
    contactDetailsTitle: 'Afisi Kuu ya Salama Legacy Centre',
    contactHoursTitle: 'Masaa ya Kazi (Saa za Afrika Mashariki)',
    contactHoursWeekdays: 'Jumatatu – Ijumaa: Saa 2:00 Asubuhi – Saa 11:00 Jioni',
    contactHoursSat: 'Jumamosi: Saa 3:00 Asubuhi – Saa 7:00 Mchana',
    contactHoursSun: 'Jumapili na Sikukuu: Tumefungwa',
    mapTitle: 'Ramani ya Google ya Mji wa Salama, Kaunti ya Makueni, Kenya',

    footerAbout: 'Kituo cha Salama Legacy Centre ni taasisi kuu ya fani mbalimbali inayofanya utafiti, mafunzo ya kitaalamu na ushauri wa kitaasisi Mjini Salama, Kaunti ya Makueni, Kenya. Utumishi Wenye Utu na Heshima Ndio Nembo Yetu.',
    footerQuickLinks: 'Viungo vya Haraka',
    footerLegal: 'Uthibitisho na Maadili',
    footerCopyright: 'Kituo cha Salama Legacy Centre. Haki zote zimehifadhiwa.',
    footerRights: 'Kimesajiliwa Kenya. Kinaongozwa na Dkt. Muthoka J.K, PhD.',
    socialNotice: 'Kurasa rasmi zilizothibitishwa zitawekwa hapa mara tu zitakapounganishwa.',
  },
};
