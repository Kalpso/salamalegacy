/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  BookOpen,
  Award,
  Globe2,
  Sparkles,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Users,
  Search,
  Star,
  Send,
  MessageCircle,
  FileText,
  Calendar,
  Layers,
  Compass,
  Copy,
  Check,
  Briefcase,
  HelpCircle,
  Building,
  Quote,
  Share2,
  CheckCheck,
  Plus,
  RefreshCw,
  Eye,
  Filter,
} from 'lucide-react';
import {
  LOGO_BASE64,
  LOGO_TRANSPARENT_BASE64,
  LOGO_TRANSPARENT_PATH,
} from './constants/logo.ts';
import { translations, Language } from './constants/translations.ts';
import { SERVICE_CATEGORIES } from './constants/services.ts';
import {
  SHEETS,
  fetchPublicationsFromSheet,
  fetchNewsFromSheet,
  fetchProjectsFromSheet,
  fetchBlogsFromSheet,
} from './utils/sheets.ts';
import {
  CentreContentState,
  ProjectItem,
  PublicationItem,
  NewsItem,
  BlogItem,
  FeedbackItem,
  loadSavedContent,
  saveContent,
  buildWhatsAppLink,
  buildEmailLink,
} from './utils/contentStore.ts';
import { PublishingModal } from './components/PublishingModal.tsx';
import { BlogReaderModal } from './components/BlogReaderModal.tsx';

export default function App() {
  // Language state: 'en' | 'sw'
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  // Dynamic Content State (Projects, Publications, News, Blogs, Feedback)
  const [contentState, setContentState] = useState<CentreContentState>(loadSavedContent);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  // Splash screen state (fades out after ~3.5s or on manual skip)
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [splashFade, setSplashFade] = useState<boolean>(false);
  const [splashProgress, setSplashProgress] = useState<number>(0);

  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState<boolean>(false);

  // Services tab state
  const [activeServiceTab, setActiveServiceTab] = useState<'research' | 'training' | 'consultancy'>('research');

  // Active workflow step state for interactive deep-dive
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(1);

  // Projects filter state
  const [projectFilter, setProjectFilter] = useState<'all' | 'In Progress' | 'Completed'>('all');

  // Publications search and filter state
  const [pubSearch, setPubSearch] = useState<string>('');
  const [pubFilter, setPubFilter] = useState<string>('all');
  const [pubLoading, setPubLoading] = useState<boolean>(false);

  // Feedback form state (Formspree: https://formspree.io/f/maqazybg)
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedbackConsent, setFeedbackConsent] = useState<boolean>(false);

  // Contact form state (Formspree: https://formspree.io/f/maqazybg)
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactSubject, setContactSubject] = useState<string>('Research Inquiry');
  const [contactMessage, setContactMessage] = useState<string>('');

  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  // Splash screen lifecycle
  useEffect(() => {
    const interval = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    const timer = setTimeout(() => {
      setSplashFade(true);
      setTimeout(() => setShowSplash(false), 600);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleSkipSplash = () => {
    setSplashFade(true);
    setTimeout(() => setShowSplash(false), 300);
  };

  // Google Sheets integration check
  useEffect(() => {
    let isMounted = true;
    async function loadSheets() {
      if (SHEETS.publications) {
        setPubLoading(true);
        const data = await fetchPublicationsFromSheet(SHEETS.publications);
        if (isMounted && data && data.length > 0) {
          setContentState((prev) => {
            const updated = { ...prev, publications: data };
            saveContent(updated);
            return updated;
          });
        }
        if (isMounted) setPubLoading(false);
      }
      if (SHEETS.news) {
        const nData = await fetchNewsFromSheet(SHEETS.news);
        if (isMounted && nData && nData.length > 0) {
          setContentState((prev) => {
            const updated = { ...prev, news: nData };
            saveContent(updated);
            return updated;
          });
        }
      }
    }
    loadSheets();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered publications
  const filteredPubs = useMemo(() => {
    return contentState.publications.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(pubSearch.toLowerCase()) ||
        pub.description.toLowerCase().includes(pubSearch.toLowerCase()) ||
        pub.authors.toLowerCase().includes(pubSearch.toLowerCase());
      const matchesType = pubFilter === 'all' || pub.type.toLowerCase().includes(pubFilter.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [contentState.publications, pubSearch, pubFilter]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return contentState.projects.filter((p) => {
      if (projectFilter === 'all') return true;
      return p.status === projectFilter;
    });
  }, [contentState.projects, projectFilter]);

  // Handle Contact Form Submit via Formspree
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/maqazybg', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setContactStatus('success');
        form.reset();
        setContactMessage('');
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

  // Handle Feedback Form Submit via Formspree
  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedbackConsent) {
      setFeedbackStatus('error');
      return;
    }
    setFeedbackStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('star_rating', `${feedbackRating} out of 5 stars`);
    formData.append('written_consent', 'Granted');

    try {
      const response = await fetch('https://formspree.io/f/maqazybg', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setFeedbackStatus('success');
        form.reset();
        setFeedbackConsent(false);
      } else {
        setFeedbackStatus('error');
      }
    } catch {
      setFeedbackStatus('error');
    }
  };


  const currentCategory = SERVICE_CATEGORIES.find((cat) => cat.key === activeServiceTab) || SERVICE_CATEGORIES[0];

  // Workflow steps metadata for interactive inspection
  const WORKFLOW_STEPS = [
    {
      step: 1,
      title: t.step1Title,
      desc: t.step1Desc,
      deliverables: ['Inception Concept Note', 'Theoretical Model Mapping', 'Initial Stakeholder Register'],
      duration: '1–2 Weeks',
      tools: 'Desk Reviews, Literature Matrices, Scoping Meetings',
    },
    {
      step: 2,
      title: t.step2Title,
      desc: t.step2Desc,
      deliverables: ['Sampling Protocol & Confidence Calculators', 'Structured ODK/Kobo Digital Scripts', 'Institutional Review Board Clearance (NACOSTI/ERC)'],
      duration: '2–3 Weeks',
      tools: 'KoboToolbox, ODK Collect, Ethics Rubrics',
    },
    {
      step: 3,
      title: t.step3Title,
      desc: t.step3Desc,
      deliverables: ['Fieldwork Pilot & Calibration Audit', 'GPS-Verified Survey Entries', 'Supervisory Real-Time Field Audit'],
      duration: '2–4 Weeks',
      tools: 'Geospatial GPS Mapping, Field Supervisors, Daily Sync',
    },
    {
      step: 4,
      title: t.step4Title,
      desc: t.step4Desc,
      deliverables: ['Cleaned Codebook & Weighted Datasets', 'Multivariate Regressions & Hypothesis Tests', 'Qualitative Thematic Coding Codeframe'],
      duration: '2–3 Weeks',
      tools: 'SPSS, R, STATA, NVivo Thematic Coding',
    },
    {
      step: 5,
      title: t.step5Title,
      desc: t.step5Desc,
      deliverables: ['Stakeholder Validation Workshop Synthesis', 'Technical Peer-Grade Final Report', '4-Page Executive Policy Brief'],
      duration: '1–2 Weeks',
      tools: 'Validation Colloquia, Visual Executive Summaries',
    },
    {
      step: 6,
      title: t.step6Title,
      desc: t.step6Desc,
      deliverables: ['Dissemination Briefing to Executive Boards', 'Institutional Capacity Transition Plan', 'Longitudinal Monitoring Roadmap'],
      duration: 'Ongoing',
      tools: 'MEAL Dashboards, Policy Roundtables',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F7FA] text-slate-800 antialiased overflow-x-hidden font-sans">
      {/* =========================================================================
          FULL-WEBSITE WATERMARK SYSTEM (Appears Entirely Across the Website)
          Layered at z-30 with pointer-events-none so it covers all sections,
          white cards, gray backgrounds, and headers without impeding interaction.
      ========================================================================= */}
      {/* 1. Viewport-Centered Watermark Seal */}
      <div
        className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] max-w-[90vw] z-30 select-none opacity-[0.08] mix-blend-multiply transition-opacity"
        aria-hidden="true"
      >
        <img
          src={LOGO_TRANSPARENT_BASE64}
          alt=""
          className="w-full h-auto object-contain filter contrast-125"
        />
      </div>

      {/* 2. Full-Page Continuous Repeating Tiled Watermark Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-30 select-none opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: `url(${LOGO_TRANSPARENT_BASE64})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '320px',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#C9A227] text-[#0A2E5D] font-bold px-4 py-2 rounded shadow-lg"
      >
        Skip to main content
      </a>

      {/* =========================================================================
          1. SPLASH SCREEN (approx 3.5 seconds, then fades)
      ========================================================================= */}
      {showSplash && (
        <aside
          id="splash-screen"
          aria-label="Welcome Splash Screen"
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A2E5D] text-white transition-opacity duration-700 ease-out p-6 ${
            splashFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Gold Corner Marks */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#C9A227]/70" />
          <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#C9A227]/70" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#C9A227]/70" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#C9A227]/70" />

          {/* Floating Subtle Ambient Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#C9A227]/40 animate-ping" />
            <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-[#E5BE42]/30 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-[#C9A227]/30 animate-bounce" />
          </div>

          <div className="relative flex flex-col items-center text-center max-w-xl mx-auto z-10">
            {/* Logo with Pulsing Rings & Counter-Rotating Arcs */}
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              {/* Outer Pulsing Gold Ring */}
              <div className="absolute inset-0 rounded-full border border-[#C9A227]/30 animate-gold-pulse" />
              <div className="absolute -inset-4 rounded-full border border-[#C9A227]/20 animate-gold-pulse" style={{ animationDelay: '0.7s' }} />

              {/* Two Counter-Rotating Gold Arcs */}
              <div className="absolute -inset-2 rounded-full border-2 border-transparent border-t-[#C9A227] border-b-[#C9A227]/50 animate-spin-slow" />
              <div className="absolute -inset-6 rounded-full border-2 border-transparent border-r-[#E5BE42] border-l-[#C9A227]/40 animate-spin-counter-slow" />

              {/* Central Official Logo Emblem with 3D Metallic Rotation & Embossed Finish */}
              <div
                className="relative w-40 h-40 flex items-center justify-center animate-emblem-3d overflow-hidden rounded-2xl"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                {/* Dynamic Specular Metallic Gold Glint Sweep */}
                <div
                  className="pointer-events-none absolute -inset-10 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-metallic-sheen z-20 mix-blend-overlay"
                  aria-hidden="true"
                />

                {/* Embossed Backplate Depth & Radial Glow */}
                <div
                  className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#C9A227]/30 via-transparent to-[#E5BE42]/40 blur-md -z-10"
                  aria-hidden="true"
                />

                <img
                  src={LOGO_TRANSPARENT_BASE64}
                  alt="Salama Legacy Centre Official Seal"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(6,28,58,0.7)] drop-shadow-[0_0_12px_rgba(201,162,39,0.35)]"
                />
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/15 border border-[#C9A227]/60 text-[#E5BE42] px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              {t.splashEstBadge}
            </div>

            {/* Organisation Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-white mb-2 text-balance">
              Salama Legacy Centre
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-[#E5BE42] italic font-serif tracking-wide mb-6">
              &ldquo;{t.tagline}&rdquo;
            </p>

            {/* Focus Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded text-xs font-medium tracking-wide">
                {t.splashPill1}
              </span>
              <span className="text-[#C9A227]">•</span>
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded text-xs font-medium tracking-wide">
                {t.splashPill2}
              </span>
              <span className="text-[#C9A227]">•</span>
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded text-xs font-medium tracking-wide">
                {t.splashPill3}
              </span>
              <span className="text-[#C9A227]">•</span>
              <span className="bg-white/10 border border-white/15 px-3 py-1 rounded text-xs font-medium tracking-wide">
                {t.splashPill4}
              </span>
            </div>

            {/* Shimmer Loading Bar */}
            <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4 border border-[#C9A227]/30">
              <div
                className="h-full bg-gradient-to-r from-[#C9A227] to-[#E5BE42] transition-all duration-200"
                style={{ width: `${splashProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-64 text-xs text-slate-400">
              <span>{t.splashLoading}</span>
              <button
                onClick={handleSkipSplash}
                className="text-[#E5BE42] hover:text-white underline font-medium cursor-pointer transition-colors"
              >
                {t.splashSkip} &rarr;
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* =========================================================================
          2. TOP BAR
      ========================================================================= */}
      <header className="bg-[#0A2E5D] text-white border-b border-[#0A2E5D]/90 relative z-30 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Contact Details (phone & email stay on one line on phones) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-slate-200">
            <a
              href="tel:+254724158187"
              className="flex items-center gap-1.5 hover:text-[#E5BE42] transition-colors whitespace-nowrap min-h-[44px] md:min-h-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="font-medium">+254 724 158 187</span>
            </a>
            <span className="hidden sm:inline text-slate-500">•</span>
            <a
              href="mailto:salamalegacy@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#E5BE42] transition-colors whitespace-nowrap min-h-[44px] md:min-h-0"
            >
              <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>salamalegacy@gmail.com</span>
            </a>
            <span className="hidden lg:inline text-slate-500">•</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
              {t.locationHeader}
            </span>
          </div>

          {/* Quick Actions (WhatsApp Us button) */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/254724158187?text=Hello%20Dr.%20Muthoka%20/%20Salama%20Legacy%20Centre,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] text-slate-950 font-semibold px-3.5 py-1.5 rounded-md hover:bg-[#20ba59] transition-all min-h-[44px] md:min-h-0 text-xs shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.whatsAppButton}</span>
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          3. STICKY NAVIGATION
      ========================================================================= */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Name + Tagline */}
            <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={LOGO_TRANSPARENT_BASE64}
                  alt="Salama Legacy Centre Official Emblem"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg sm:text-xl text-[#0A2E5D] tracking-tight group-hover:text-[#123E77] leading-tight">
                  Salama Legacy Centre
                </span>
                <span className="text-[11px] sm:text-xs text-[#C9A227] font-semibold tracking-wide italic">
                  {t.tagline}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (>=1100px) */}
            <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700">
              <a href="#hero" className="hover:text-[#0A2E5D] transition-colors py-1">
                {t.navHome}
              </a>
              <a href="#about" className="hover:text-[#0A2E5D] transition-colors py-1">
                {t.navAbout}
              </a>
              <a href="#services" className="hover:text-[#0A2E5D] transition-colors py-1">
                {t.navServices}
              </a>
              <a href="#workflow" className="hover:text-[#0A2E5D] transition-colors py-1">
                {t.navWorkflow}
              </a>
              <a href="#publications" className="hover:text-[#0A2E5D] transition-colors py-1">
                {t.navPublications}
              </a>
              <a href="#news" className="hover:text-[#0A2E5D] transition-colors py-1">
                {t.navNews}
              </a>

              {/* "More" Menu Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#0A2E5D] transition-colors py-1 cursor-pointer focus:outline-none"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                >
                  <span>{t.navMore}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a
                    href="#projects"
                    className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
                  >
                    {t.navProjects}
                  </a>
                  <a
                    href="#blog"
                    className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
                  >
                    {t.navBlog}
                  </a>
                  <a
                    href="#feedback"
                    className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
                  >
                    {t.navFeedback}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPublishModal(true);
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full text-left flex items-center justify-between px-4 py-2.5 text-sm text-[#0A2E5D] font-bold hover:bg-[#F5F7FA] border-t border-slate-100 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                      Publishing Desk
                    </span>
                    <span className="text-[10px] bg-[#C9A227]/20 text-[#0A2E5D] px-1.5 py-0.5 rounded font-mono font-semibold">
                      Live
                    </span>
                  </button>
                </div>
              </div>

              <a href="#contact" className="hover:text-[#0A2E5D] transition-colors py-1">
                {t.navContact}
              </a>
            </div>

            {/* Action Buttons (Publishing Desk, Language Toggle & Book Consultation) */}
            <div className="hidden xl:flex items-center gap-2.5">
              {/* Publishing Desk Quick Launch */}
              <button
                type="button"
                onClick={() => setShowPublishModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#C9A227]/50 text-xs font-bold text-[#0A2E5D] bg-[#C9A227]/10 hover:bg-[#C9A227]/20 transition-all cursor-pointer shadow-2xs"
                title="Publish Projects, Publications, News & Blog Articles"
              >
                <Plus className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Publish Desk</span>
              </button>

              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:border-[#C9A227] hover:text-[#0A2E5D] bg-white transition-all cursor-pointer shadow-2xs"
                title="Switch Language (English / Kiswahili)"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{lang === 'en' ? 'Kiswahili' : 'English'}</span>
              </button>

              {/* Book Consultation */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-[#0A2E5D] text-white hover:bg-[#061c3a] text-xs font-semibold px-4 py-2.5 rounded-md border border-[#C9A227] transition-all shadow-sm hover:shadow"
              >
                <span>{t.bookConsultation}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
              </a>
            </div>

            {/* Hamburger Button (< 1100px) */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => setShowPublishModal(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#C9A227]/50 text-xs font-bold text-[#0A2E5D] bg-[#C9A227]/10"
                title="Publishing Desk"
              >
                <Plus className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Desk</span>
              </button>
              <button
                onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-300 text-xs font-medium text-slate-700 bg-white"
                aria-label="Toggle language"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{lang.toUpperCase()}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-md text-slate-700 hover:text-[#0A2E5D] hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-800">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navHome}
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navAbout}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navServices}
              </a>
              <a
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navWorkflow}
              </a>
              <a
                href="#publications"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navPublications}
              </a>
              <a
                href="#news"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navNews}
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navProjects}
              </a>
              <a
                href="#blog"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navBlog}
              </a>
              <a
                href="#feedback"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navFeedback}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-[#F5F7FA] hover:text-[#0A2E5D]"
              >
                {t.navContact}
              </a>
            </div>

            {/* Language and Booking Buttons Full Width Inside Mobile Menu */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowPublishModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#0A2E5D] text-white font-bold text-xs border border-[#C9A227] min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-[#C9A227]" />
                <span>Open Publishing Desk (Live Updates)</span>
              </button>

              <button
                onClick={() => {
                  setLang(lang === 'en' ? 'sw' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-md border border-slate-300 font-semibold text-slate-800 bg-[#F5F7FA] min-h-[44px]"
              >
                <Globe2 className="w-4 h-4 text-[#C9A227]" />
                <span>{lang === 'en' ? 'Badilisha kwa Kiswahili' : 'Switch to English'}</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-[#0A2E5D] text-white font-semibold border border-[#C9A227] min-h-[44px] shadow-sm"
              >
                <span>{t.bookConsultation}</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227]" />
              </a>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content" className="relative z-10">
        {/* =========================================================================
            4. HERO SECTION
        ========================================================================= */}
        <section id="hero" className="relative bg-gradient-to-b from-[#0A2E5D] via-[#0D386D] to-[#0A2E5D] text-white py-16 sm:py-24 lg:py-28 overflow-hidden">
          {/* Sectional Large Emblem Watermark in Hero Background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] pointer-events-none opacity-[0.06] select-none">
            <img
              src={LOGO_TRANSPARENT_BASE64}
              alt=""
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>

          {/* Subtle architectural background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Institution badge */}
              <div className="inline-flex items-center gap-2 bg-[#C9A227]/20 border border-[#C9A227]/60 text-[#E5BE42] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-6 leading-[1.15] text-balance">
                {t.heroHeadline}
              </h1>

              {/* Short Paragraph */}
              <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-normal mb-10 max-w-2xl mx-auto text-balance">
                {t.heroSubheadline}
              </p>

              {/* Two Working Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#DFB738] text-[#0A2E5D] font-bold px-7 py-3.5 rounded-md shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 min-h-[48px]"
                >
                  <span>{t.heroBtnPrimary}</span>
                  <ArrowRight className="w-4 h-4 text-[#0A2E5D]" />
                </a>

                <a
                  href="#services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-md border border-white/30 backdrop-blur-sm transition-all min-h-[48px]"
                >
                  <span>{t.heroBtnSecondary}</span>
                  <Layers className="w-4 h-4 text-[#C9A227]" />
                </a>
              </div>

              {/* Dignity & PhD Endorsement Note */}
              <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Led by Dr. Muthoka J.K, PhD</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Salama Town, Makueni County, Kenya</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Service with Dignity is Our Hallmark</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. SERVICE STRIP (Four Short Items)
        ========================================================================= */}
        <section aria-label="Key Competencies Strip" className="bg-[#061c3a] text-white border-t border-b border-[#C9A227]/30 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Item 1 */}
              <div className="flex items-start gap-3.5 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2.5 rounded-md bg-[#0A2E5D] text-[#C9A227] border border-[#C9A227]/40 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-sm text-[#E5BE42] mb-0.5">{t.strip1Title}</h2>
                  <p className="text-xs text-slate-300 leading-snug">{t.strip1Desc}</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2.5 rounded-md bg-[#0A2E5D] text-[#C9A227] border border-[#C9A227]/40 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-sm text-[#E5BE42] mb-0.5">{t.strip2Title}</h2>
                  <p className="text-xs text-slate-300 leading-snug">{t.strip2Desc}</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3.5 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2.5 rounded-md bg-[#0A2E5D] text-[#C9A227] border border-[#C9A227]/40 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-sm text-[#E5BE42] mb-0.5">{t.strip3Title}</h2>
                  <p className="text-xs text-slate-300 leading-snug">{t.strip3Desc}</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3.5 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2.5 rounded-md bg-[#0A2E5D] text-[#C9A227] border border-[#C9A227]/40 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-sm text-[#E5BE42] mb-0.5">{t.strip4Title}</h2>
                  <p className="text-xs text-slate-300 leading-snug">{t.strip4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. WHY CHOOSE US (Cards)
        ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                Distinctive Institutional Value
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-3">
                {t.whyChooseHeadline}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">{t.whyChooseSubtitle}</p>
            </div>

            {/* Responsive cards: 3-4 across on laptop, 2 on tablet, 1 on phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-[#F5F7FA] border border-slate-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-md transition-all flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center mb-5 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0A2E5D] mb-2">{t.whyCard1Title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed grow">{t.whyCard1Desc}</p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#F5F7FA] border border-slate-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-md transition-all flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center mb-5 shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0A2E5D] mb-2">{t.whyCard2Title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed grow">{t.whyCard2Desc}</p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#F5F7FA] border border-slate-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-md transition-all flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center mb-5 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0A2E5D] mb-2">{t.whyCard3Title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed grow">{t.whyCard3Desc}</p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#F5F7FA] border border-slate-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-md transition-all flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center mb-5 shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0A2E5D] mb-2">{t.whyCard4Title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed grow">{t.whyCard4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ABOUT (Story + Vision + Mission + Values + Sectional Watermark)
        ========================================================================= */}
        <section id="about" className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200 relative overflow-hidden">
          {/* Sectional Large Emblem Watermark */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-full pointer-events-none opacity-[0.055] select-none">
            <img
              src={LOGO_TRANSPARENT_BASE64}
              alt=""
              className="w-full h-auto object-contain filter contrast-125"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Story (2-3 paragraphs) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                    Institutional Profile
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-3">
                    {t.aboutHeading}
                  </h2>
                  <p className="text-base text-slate-600 italic font-serif">{t.aboutSubtitle}</p>
                </div>

                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed bg-white/70 backdrop-blur-xs p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <p>{t.aboutP1}</p>
                  <p>{t.aboutP2}</p>
                  <p>{t.aboutP3}</p>
                </div>

                {/* Director Callout Box with Seal of Leadership */}
                <div className="bg-white border-l-4 border-[#C9A227] rounded-r-xl p-5 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center font-bold text-lg shrink-0 border border-[#C9A227]/40 shadow-inner">
                      PhD
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base">{t.directorTitle}</h3>
                      <p className="text-xs text-slate-500">
                        Director & Lead Investigator · Salama Legacy Centre · Makueni County
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block w-12 h-12 opacity-80 shrink-0">
                    <img src={LOGO_TRANSPARENT_BASE64} alt="" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              {/* Right Column: Vision & Mission Cards */}
              <div className="lg:col-span-5 space-y-6">
                {/* Vision Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden hover:border-[#C9A227] transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#C9A227]" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded bg-[#0A2E5D]/10 text-[#0A2E5D]">
                      <Compass className="w-5 h-5 text-[#C9A227]" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#0A2E5D]">{t.visionTitle}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.visionText}</p>
                </div>

                {/* Mission Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden hover:border-[#0A2E5D] transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#0A2E5D]" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded bg-[#0A2E5D]/10 text-[#0A2E5D]">
                      <Award className="w-5 h-5 text-[#0A2E5D]" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#0A2E5D]">{t.missionTitle}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.missionText}</p>
                </div>

                {/* Institutional Advisory Prompt */}
                <div className="bg-gradient-to-br from-[#0A2E5D] to-[#123E77] text-white p-6 rounded-xl border border-[#C9A227]/40 shadow-sm">
                  <span className="text-xs font-bold text-[#E5BE42] uppercase tracking-wider block mb-1">
                    Institutional Advisory
                  </span>
                  <h4 className="font-heading font-bold text-sm mb-2">{lang === 'en' ? 'Need a Custom Research or Training Protocol?' : 'Unahitaji Mwongozo Maalum wa Utafiti au Mafunzo?'}</h4>
                  <p className="text-xs text-slate-200 mb-4 leading-relaxed">
                    {lang === 'en'
                      ? 'Discuss your institutional requirements directly with Dr. Muthoka J.K, PhD for tailored Makueni and Kenyan county frameworks.'
                      : 'Zungumza kuhusu mahitaji ya taasisi yako moja kwa moja na Dkt. Muthoka J.K, PhD kwa mifumo iliyoundwa maalum kwa Kaunti ya Makueni na Kenya.'}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#DFB738] text-[#0A2E5D] font-bold px-4 py-2 rounded text-xs transition-colors"
                  >
                    <span>{lang === 'en' ? 'Book a Consultation' : 'Panga Ushauri'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Core Values Section */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="text-center max-w-xl mx-auto mb-10">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0A2E5D]">{t.valuesTitle}</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                  Guiding every consultation, survey, and research engagement
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Val 1 */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0A2E5D]">{t.val1Title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.val1Desc}</p>
                  </div>
                </div>

                {/* Val 2 */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0A2E5D]">{t.val2Title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.val2Desc}</p>
                  </div>
                </div>

                {/* Val 3 */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0A2E5D]">{t.val3Title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.val3Desc}</p>
                  </div>
                </div>

                {/* Val 4 */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0A2E5D]">{t.val4Title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.val4Desc}</p>
                  </div>
                </div>

                {/* Val 5 */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex gap-3.5 md:col-span-2 lg:col-span-1">
                  <div className="w-8 h-8 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center font-bold text-xs shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0A2E5D]">{t.val5Title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.val5Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. SERVICES (Three Tabbed Panels)
        ========================================================================= */}
        <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                Areas of Expertise
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-3">
                {t.servicesHeading}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">{t.servicesSubtitle}</p>
            </div>

            {/* Tab Navigation Buttons */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 rounded-xl bg-[#F5F7FA] border border-slate-200 gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveServiceTab('research')}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] ${
                    activeServiceTab === 'research'
                      ? 'bg-[#0A2E5D] text-white shadow'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#C9A227]" />
                  <span>{t.tabResearch}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveServiceTab('training')}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] ${
                    activeServiceTab === 'training'
                      ? 'bg-[#0A2E5D] text-white shadow'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#C9A227]" />
                  <span>{t.tabTraining}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveServiceTab('consultancy')}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] ${
                    activeServiceTab === 'consultancy'
                      ? 'bg-[#0A2E5D] text-white shadow'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[#C9A227]" />
                  <span>{t.tabConsultancy}</span>
                </button>
              </div>
            </div>

            {/* Tab Category Header Banner */}
            <div className="bg-gradient-to-r from-[#0A2E5D] to-[#164380] text-white rounded-2xl p-6 sm:p-8 mb-8 border border-[#C9A227]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5BE42]">
                  {lang === 'en' ? 'Category Overview' : 'Muhtasari wa Kitengo'}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                  {lang === 'en' ? currentCategory.nameEn : currentCategory.nameSw}
                </h3>
                <p className="text-slate-200 text-sm mt-1">
                  {lang === 'en' ? currentCategory.taglineEn : currentCategory.taglineSw}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={() => setContactSubject(`${currentCategory.nameEn} Inquiry`)}
                  className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#DFB738] text-[#0A2E5D] font-bold px-5 py-2.5 rounded-md text-xs sm:text-sm shrink-0 transition-colors shadow"
                >
                  <span>{lang === 'en' ? 'Request Consultation' : 'Omba Ushauri'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Detailed Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#F5F7FA] border border-slate-200 hover:border-[#C9A227] rounded-xl p-6 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-[#C9A227] bg-[#0A2E5D] px-2.5 py-1 rounded">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {currentCategory.key}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-[#0A2E5D] mb-2 leading-snug">
                      {lang === 'en' ? item.titleEn : item.titleSw}
                    </h4>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {lang === 'en' ? item.descriptionEn : item.descriptionSw}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-200/80 mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        {lang === 'en' ? 'Key Deliverables:' : 'Matokeo Muhimu:'}
                      </span>
                      {(lang === 'en' ? item.deliverablesEn : item.deliverablesSw).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
                    <a
                      href="#contact"
                      onClick={() => {
                        setContactSubject(`Inquiry: ${lang === 'en' ? item.titleEn : item.titleSw}`);
                        setContactMessage(`Hello Dr. Muthoka / Salama Legacy Centre Team,\n\nI would like to enquire about your services regarding "${lang === 'en' ? item.titleEn : item.titleSw}". Please let us know the available dates, requirements, and engagement terms.`);
                      }}
                      className="inline-flex items-center justify-between text-xs font-bold text-[#0A2E5D] hover:text-[#C9A227] transition-colors"
                    >
                      <span>{lang === 'en' ? 'Detailed Consultation Inquiry' : 'Ulizia kuhusu huduma hii'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                    </a>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={buildWhatsAppLink('service', lang === 'en' ? item.titleEn : item.titleSw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-emerald-800 hover:text-slate-950 px-2.5 py-1.5 rounded-md text-[11px] font-bold border border-emerald-300 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3 text-[#25D366] group-hover:text-slate-950" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={buildEmailLink('service', lang === 'en' ? item.titleEn : item.titleSw)}
                        className="inline-flex items-center justify-center gap-1.5 bg-[#0A2E5D]/5 hover:bg-[#0A2E5D] text-[#0A2E5D] hover:text-white px-2.5 py-1.5 rounded-md text-[11px] font-bold border border-slate-300 transition-colors"
                        title="Send Direct Email"
                      >
                        <Mail className="w-3 h-3 text-[#C9A227]" />
                        <span>Email Desk</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. RESEARCH WORKFLOW (Step-by-Step Interactive Real Sequence)
        ========================================================================= */}
        <section id="workflow" className="py-16 sm:py-24 bg-[#0A2E5D] text-white border-b border-slate-800 relative overflow-hidden">
          {/* Sectional Large Emblem Watermark */}
          <div className="absolute right-10 bottom-10 w-[500px] h-[500px] pointer-events-none opacity-[0.05] select-none">
            <img src={LOGO_TRANSPARENT_BASE64} alt="" className="w-full h-full object-contain filter contrast-125" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5BE42]">
                Methodological Discipline
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mt-2 mb-3">
                {t.workflowHeading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">{t.workflowSubtitle}</p>
            </div>

            {/* 6-step sequential grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative mb-10">
              {WORKFLOW_STEPS.map((ws) => (
                <div
                  key={ws.step}
                  onClick={() => setActiveWorkflowStep(ws.step)}
                  className={`rounded-xl p-6 relative transition-all cursor-pointer border ${
                    activeWorkflowStep === ws.step
                      ? 'bg-white/15 border-[#C9A227] shadow-lg ring-1 ring-[#C9A227]'
                      : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9A227] text-[#0A2E5D] font-extrabold flex items-center justify-center text-sm shadow">
                      0{ws.step}
                    </div>
                    <span className="text-xs uppercase tracking-wider text-[#E5BE42] font-semibold">
                      Stage {ws.step}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white mb-2">{ws.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">{ws.desc}</p>
                  <span className="text-[11px] text-[#E5BE42] font-semibold flex items-center gap-1">
                    <span>Click to view deliverables</span> &rarr;
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Step Detail Card */}
            {(() => {
              const currentStep = WORKFLOW_STEPS.find((s) => s.step === activeWorkflowStep) || WORKFLOW_STEPS[0];
              return (
                <div className="bg-white/10 border border-[#C9A227]/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/15">
                    <div>
                      <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">
                        Stage 0{currentStep.step} Deliverable Protocol
                      </span>
                      <h4 className="text-xl font-heading font-bold text-white mt-1">{currentStep.title}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="bg-white/10 px-3 py-1.5 rounded-md border border-white/20">
                        Typical Duration: <strong>{currentStep.duration}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-[#E5BE42] block mb-2 uppercase tracking-wide text-xs">
                        Expected Inception Deliverables:
                      </span>
                      <ul className="space-y-2 text-slate-200">
                        {currentStep.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCheck className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-[#E5BE42] block mb-2 uppercase tracking-wide text-xs">
                        Methodological Tools & Software:
                      </span>
                      <p className="text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                        {currentStep.tools}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* =========================================================================
            10. PROJECTS (Applied Research & Institutional Projects Portfolio)
        ========================================================================= */}
        <section id="projects" className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                  Applied Research & Engagements
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-2">
                  {t.projectsHeading}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl">{t.projectsSubtitle}</p>
              </div>

              {/* Quick Publish Action */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(true)}
                  className="inline-flex items-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white px-4 py-2.5 rounded-lg text-xs font-bold border border-[#C9A227] transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C9A227]" />
                  <span>Publish New Project</span>
                </button>
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-4 overflow-x-auto">
              {[
                { key: 'all', label: 'All Projects', count: contentState.projects.length },
                {
                  key: 'In Progress',
                  label: 'Active & In Progress',
                  count: contentState.projects.filter((p) => p.status === 'In Progress').length,
                },
                {
                  key: 'Completed',
                  label: 'Completed Studies',
                  count: contentState.projects.filter((p) => p.status === 'Completed').length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setProjectFilter(tab.key as 'all' | 'In Progress' | 'Completed')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    projectFilter === tab.key
                      ? 'bg-[#0A2E5D] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      projectFilter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="bg-[#F5F7FA] border border-slate-200 hover:border-[#C9A227] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Meta badges: Category & Status */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-[#0A2E5D] bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                          {project.category}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            project.status === 'In Progress'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              project.status === 'In Progress' ? 'bg-amber-600 animate-pulse' : 'bg-emerald-600'
                            }`}
                          />
                          {project.status}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#0A2E5D] mb-2 leading-snug">
                        {project.title}
                      </h3>

                      {/* Location & Year */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                          {project.location}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {project.year}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {project.summary}
                      </p>

                      {/* Key Deliverables / Outcomes */}
                      {project.outcomes && project.outcomes.length > 0 && (
                        <div className="space-y-1.5 pt-3 border-t border-slate-200/80 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Key Deliverables:
                          </span>
                          {project.outcomes.slice(0, 3).map((item: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Client / Target Beneficiaries */}
                      {project.client && (
                        <div className="text-[11px] text-slate-500 italic mb-4">
                          <strong className="text-slate-700 font-semibold not-italic">Beneficiaries/Partners:</strong>{' '}
                          {project.client}
                        </div>
                      )}
                    </div>

                    {/* Direct Engagement Actions: WhatsApp & Email */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={buildWhatsAppLink('project', project.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={buildEmailLink('project', project.title)}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#0A2E5D] hover:bg-[#061c3a] text-white px-3 py-2 rounded-lg text-xs font-bold border border-[#C9A227] transition-all shadow-2xs"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
                          <span>Email Desk</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="max-w-xl mx-auto bg-[#F5F7FA] border border-dashed border-[#C9A227] rounded-2xl p-8 text-center">
                <Layers className="w-12 h-12 text-[#C9A227] mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-[#0A2E5D] mb-1">
                  No Projects In This Category Yet
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-5">
                  Publish a new project using the interactive desk or reset filters to view all entries.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setProjectFilter('all')}
                    className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-bold rounded-md"
                  >
                    View All Projects
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPublishModal(true)}
                    className="px-4 py-2 bg-[#0A2E5D] text-white text-xs font-bold rounded-md border border-[#C9A227]"
                  >
                    Publish Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            11. PUBLICATIONS (Search Box + Type Filter + Google Sheets CSV sync)
        ========================================================================= */}
        <section id="publications" className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                  Scholarly Outputs & Papers
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-2">
                  {t.publicationsHeading}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl">{t.publicationsSubtitle}</p>
              </div>

              {/* Quick Publish Action */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(true)}
                  className="inline-flex items-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white px-4 py-2.5 rounded-lg text-xs font-bold border border-[#C9A227] transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C9A227]" />
                  <span>Publish New Paper</span>
                </button>
              </div>
            </div>

            {/* Search Box + Type Filters */}
            <div className="max-w-3xl mx-auto mb-10 space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pubSearch}
                  onChange={(e) => setPubSearch(e.target.value)}
                  placeholder={t.pubSearchPlaceholder}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] shadow-sm text-slate-800"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
                {[
                  { key: 'all', label: t.pubFilterAll },
                  { key: 'paper', label: t.pubFilterPapers },
                  { key: 'brief', label: t.pubFilterBriefs },
                  { key: 'report', label: t.pubFilterReports },
                  { key: 'guide', label: t.pubFilterGuides },
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setPubFilter(f.key)}
                    className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                      pubFilter === f.key
                        ? 'bg-[#0A2E5D] text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Publications List or Clean Coming Soon Card */}
            {filteredPubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPubs.map((pub) => (
                  <article
                    key={pub.id}
                    className="bg-white border border-slate-200 hover:border-[#C9A227] rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-bold text-[#0A2E5D] bg-[#F5F7FA] border border-slate-200 px-2.5 py-1 rounded">
                          {pub.type}
                        </span>
                        <span className="font-semibold text-slate-600">{pub.year}</span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#0A2E5D] mb-1.5 leading-snug">
                        {pub.title}
                      </h3>
                      <div className="text-[11px] text-[#C9A227] font-semibold mb-3">
                        {pub.authors}
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {pub.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-between text-xs font-bold text-[#0A2E5D] hover:text-[#C9A227] pb-1"
                        >
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                            {t.pubReadDrive}
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={buildWhatsAppLink('publication', pub.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 bg-[#25D366]/10 hover:bg-[#25D366] text-emerald-800 hover:text-slate-950 px-2 py-1.5 rounded-md text-[11px] font-bold border border-emerald-300 transition-colors"
                          title="Request publication via WhatsApp"
                        >
                          <MessageCircle className="w-3 h-3 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={buildEmailLink('publication', pub.title)}
                          className="inline-flex items-center justify-center gap-1 bg-[#0A2E5D]/5 hover:bg-[#0A2E5D] text-[#0A2E5D] hover:text-white px-2 py-1.5 rounded-md text-[11px] font-bold border border-slate-300 transition-colors"
                          title="Request PDF copy via Email"
                        >
                          <Mail className="w-3 h-3 text-[#C9A227]" />
                          <span>Request PDF</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto bg-white border border-dashed border-[#C9A227] rounded-2xl p-8 sm:p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center mx-auto mb-5 shadow">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#0A2E5D] mb-3">
                  {t.pubComingSoonTitle}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  {t.pubComingSoonText}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="mailto:salamalegacy@gmail.com?subject=Publication%20Submission%20or%20Inquiry"
                    className="inline-flex items-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white font-semibold px-6 py-3 rounded-md border border-[#C9A227] transition-all min-h-[44px]"
                  >
                    <Send className="w-4 h-4 text-[#C9A227]" />
                    <span>{t.pubSubmitLink}</span>
                  </a>

                  <button
                    onClick={() => {
                      const citation = `Salama Legacy Centre. (2026). Research, Training, and Institutional Consultancy in Makueni County. Directed by Dr. Muthoka J.K, PhD. Salama Town, Kenya. https://www.salamalegacy.co.ke`;
                      navigator.clipboard.writeText(citation);
                      setCopiedCitation(true);
                      setTimeout(() => setCopiedCitation(false), 2500);
                    }}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-md text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
                  >
                    {copiedCitation ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCitation ? 'Citation Copied!' : 'Copy Centre Citation (APA)'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            12. FEEDBACK (Empty State + Form via Formspree: https://formspree.io/f/maqazybg)
        ========================================================================= */}
        <section id="feedback" className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                Evaluations & Reflections
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-3">
                {t.feedbackHeading}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">{t.feedbackSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Verified Testimonials & Client Reflections */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E5D]">
                      Verified Institutional Testimonials
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPublishModal(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A2E5D] hover:text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-1 rounded cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-[#C9A227]" />
                    <span>Publish Review</span>
                  </button>
                </div>

                {contentState.feedback && contentState.feedback.length > 0 ? (
                  <div className="space-y-4">
                    {contentState.feedback.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#F5F7FA] border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-[#C9A227] transition-all"
                      >
                        {/* Rating & Date */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= item.rating
                                    ? 'text-[#C9A227] fill-[#C9A227]'
                                    : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                        </div>

                        {/* Quote Message */}
                        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-3">
                          &ldquo;{item.message}&rdquo;
                        </p>

                        {/* Author & Verification Tag */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                          <div>
                            <span className="font-heading font-bold text-[#0A2E5D] block">{item.clientName}</span>
                            <span className="text-[11px] text-slate-500">{item.organisation}</span>
                          </div>
                          {item.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Verified Consent</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#F5F7FA] border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#0A2E5D]/10 text-[#0A2E5D] flex items-center justify-center mb-4">
                      <Star className="w-7 h-7 text-[#C9A227]" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#0A2E5D] mb-2">
                      {t.feedbackEmptyTitle}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {t.feedbackEmptyText}
                    </p>
                  </div>
                )}

                {/* Direct WhatsApp Review Submission Link */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">Quick Feedback via WhatsApp</span>
                    <span className="text-[11px] text-emerald-800">Direct transmission to the Secretariat</span>
                  </div>
                  <a
                    href={buildWhatsAppLink('feedback', 'Client Evaluation & Reflection')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 px-3 py-1.5 rounded-md text-xs font-bold shadow-2xs shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Working Feedback Form via Formspree */}
              <div className="lg:col-span-7 bg-[#F5F7FA] border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl text-[#0A2E5D]">
                    {t.feedbackFormTitle}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">{t.feedbackFormSubtitle}</p>
                </div>

                {feedbackStatus === 'success' ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-emerald-900">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <p className="font-bold text-base">{t.feedbackSuccessMsg}</p>
                    <button
                      onClick={() => setFeedbackStatus('idle')}
                      className="mt-4 text-xs font-semibold text-emerald-800 underline"
                    >
                      {lang === 'en' ? 'Submit another feedback' : 'Wasilisha maoni mengine'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.feedbackNameLabel}
                        </label>
                        <input
                          type="text"
                          name="client_name"
                          required
                          placeholder={t.feedbackNamePlaceholder}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.feedbackOrgLabel}
                        </label>
                        <input
                          type="text"
                          name="organisation"
                          required
                          placeholder={t.feedbackOrgPlaceholder}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.feedbackEmailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={t.feedbackEmailPlaceholder}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      />
                    </div>

                    {/* 1-5 Star Rating Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.feedbackRatingLabel}
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                            aria-label={`${star} star rating`}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= feedbackRating
                                  ? 'text-[#C9A227] fill-[#C9A227]'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs text-slate-600 font-semibold ml-2">
                          {feedbackRating} / 5 Stars
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.feedbackMsgLabel}
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder={t.feedbackMsgPlaceholder}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      />
                    </div>

                    {/* Consent Checkbox (Strict Requirement) */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="consent-check"
                        checked={feedbackConsent}
                        onChange={(e) => setFeedbackConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#0A2E5D] border-slate-300 rounded focus:ring-[#C9A227]"
                        required
                      />
                      <label htmlFor="consent-check" className="text-xs text-slate-600 leading-tight">
                        {t.feedbackConsent}
                      </label>
                    </div>

                    {feedbackStatus === 'error' && (
                      <p className="text-xs text-red-600 font-medium">
                        {lang === 'en'
                          ? 'Failed to submit feedback. Please check connection and try again.'
                          : 'Imeshindwa kuwasilisha maoni. Tafadhali jaribu tena.'}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={feedbackStatus === 'sending'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white font-bold px-6 py-3 rounded-lg border border-[#C9A227] transition-all min-h-[44px] cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#C9A227]" />
                      <span>
                        {feedbackStatus === 'sending' ? t.feedbackSending : t.feedbackSubmitBtn}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            13. NEWS & ANNOUNCEMENTS (Official Centre Notices & Milestones)
        ========================================================================= */}
        <section id="news" className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                  Institutional Milestones
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-2">
                  {t.newsHeading}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl">{t.newsSubtitle}</p>
              </div>

              {/* Quick Publish Action */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(true)}
                  className="inline-flex items-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white px-4 py-2.5 rounded-lg text-xs font-bold border border-[#C9A227] transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C9A227]" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </div>

            {contentState.news && contentState.news.length > 0 ? (
              <div className="max-w-4xl mx-auto space-y-6">
                {contentState.news.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white border-l-4 border-[#0A2E5D] rounded-r-2xl border-y border-r border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold mb-3">
                      <div className="flex items-center gap-2 text-[#C9A227]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                        <span className="text-slate-300">•</span>
                        <span className="bg-[#F5F7FA] border border-slate-200 text-[#0A2E5D] px-2 py-0.5 rounded text-[11px]">
                          {item.category || 'Official Notice'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Salama Secretariat
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0A2E5D] mb-3 leading-snug">
                      {item.headline}
                    </h3>

                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                      {item.summary}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                        <span>Verified Centre Release</span>
                      </div>

                      {/* Direct Engagement Actions */}
                      <div className="flex items-center gap-2">
                        <a
                          href={buildWhatsAppLink('news', item.headline)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-emerald-800 hover:text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-300 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                          <span>Discuss on WhatsApp</span>
                        </a>

                        <a
                          href={buildEmailLink('news', item.headline)}
                          className="inline-flex items-center gap-1.5 bg-[#0A2E5D]/5 hover:bg-[#0A2E5D] text-[#0A2E5D] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
                          <span>Email Secretariat</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="max-w-xl mx-auto bg-white border border-dashed border-[#C9A227] rounded-2xl p-8 text-center">
                <Calendar className="w-12 h-12 text-[#C9A227] mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-[#0A2E5D] mb-1">
                  No Notices Currently Listed
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-4">
                  Official announcements from the Secretariat will appear here.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPublishModal(true)}
                  className="px-4 py-2 bg-[#0A2E5D] text-white text-xs font-bold rounded-md border border-[#C9A227]"
                >
                  Publish New Notice
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            14. BLOG (Legacy Insights & Scholarly Commentaries)
        ========================================================================= */}
        <section id="blog" className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                  Thought Leadership
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-2">
                  {t.blogHeading}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl">{t.blogSubtitle}</p>
              </div>

              {/* Quick Publish Action */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(true)}
                  className="inline-flex items-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white px-4 py-2.5 rounded-lg text-xs font-bold border border-[#C9A227] transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C9A227]" />
                  <span>Publish Blog Article</span>
                </button>
              </div>
            </div>

            {/* Articles Grid */}
            {contentState.blogs && contentState.blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {contentState.blogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-[#F5F7FA] border border-slate-200 hover:border-[#C9A227] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Category & Read Time */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="font-bold text-[#0A2E5D] bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedBlog(blog)}
                        className="font-heading font-bold text-lg text-[#0A2E5D] group-hover:text-[#123E77] mb-2 leading-snug cursor-pointer transition-colors"
                      >
                        {blog.title}
                      </h3>

                      {/* Author */}
                      <div className="text-xs text-slate-500 mb-3">
                        By <span className="font-semibold text-slate-700">{blog.author}</span> • {blog.date}
                      </div>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {blog.excerpt}
                      </p>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {blog.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBlog(blog)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white py-2 rounded-lg text-xs font-bold border border-[#C9A227] transition-all cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>Read Full Insight</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={buildWhatsAppLink('blog', blog.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-emerald-800 hover:text-slate-950 py-1.5 rounded-lg text-[11px] font-bold border border-emerald-300 transition-colors"
                        >
                          <MessageCircle className="w-3 h-3 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={buildEmailLink('blog', blog.title)}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#0A2E5D]/5 hover:bg-[#0A2E5D] text-[#0A2E5D] hover:text-white py-1.5 rounded-lg text-[11px] font-bold border border-slate-300 transition-colors"
                        >
                          <Mail className="w-3 h-3 text-[#C9A227]" />
                          <span>Email Author</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="max-w-xl mx-auto bg-[#F5F7FA] border border-dashed border-[#C9A227] rounded-2xl p-8 text-center">
                <FileText className="w-12 h-12 text-[#C9A227] mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-[#0A2E5D] mb-1">
                  No Blog Articles Published Yet
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-4">
                  Publish policy briefs, research essays, or field insights using the Publishing Desk.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPublishModal(true)}
                  className="px-4 py-2 bg-[#0A2E5D] text-white text-xs font-bold rounded-md border border-[#C9A227]"
                >
                  Publish First Article
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            15. CALL-TO-ACTION BANNER
        ========================================================================= */}
        <section className="bg-gradient-to-r from-[#0A2E5D] via-[#123E77] to-[#0A2E5D] text-white py-14 sm:py-20 border-t border-b border-[#C9A227]/40 relative overflow-hidden">
          {/* Subtle Watermark in CTA */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none opacity-[0.07] select-none">
            <img src={LOGO_TRANSPARENT_BASE64} alt="" className="w-full h-full object-contain filter contrast-125" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 text-balance">
              {t.ctaHeadline}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#DFB738] text-[#0A2E5D] font-bold px-7 py-3.5 rounded-md shadow-lg transition-all min-h-[48px]"
              >
                <span>{t.ctaPrimaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/254724158187?text=Hello%20Dr.%20Muthoka%20/%20Salama%20Legacy%20Centre,%20I%20would%20like%20to%20schedule%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold px-7 py-3.5 rounded-md shadow-lg transition-all min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.ctaSecondaryBtn}</span>
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            16. CONTACT (Form + Details + Embedded Google Map of Salama Town)
        ========================================================================= */}
        <section id="contact" className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                Direct Engagement
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E5D] mt-2 mb-3">
                {t.contactHeading}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">{t.contactSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Contact Form via Formspree: https://formspree.io/f/maqazybg */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl text-[#0A2E5D]">
                    {t.contactFormTitle}
                  </h3>
                </div>

                {contactStatus === 'success' ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-emerald-900">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <p className="font-bold text-base">{t.contactSuccessMsg}</p>
                    <button
                      onClick={() => setContactStatus('idle')}
                      className="mt-4 text-xs font-semibold text-emerald-800 underline"
                    >
                      {lang === 'en' ? 'Send another message' : 'Tuma ujumbe mwingine'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.contactNameLabel}
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          required
                          placeholder="e.g. Dr. Joseph Mutinda"
                          className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.contactEmailLabel}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. mutinda@example.org"
                          className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.contactPhoneLabel}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+254 7XX XXX XXX"
                          className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {t.contactSubjectLabel}
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.contactMessageLabel}
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder={
                          lang === 'en'
                            ? 'Please provide the project context, expected objectives, or research scope...'
                            : 'Tafadhali toa muktadha wa mradi, malengo yanayotarajiwa, au upeo wa utafiti...'
                        }
                        className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      />
                    </div>

                    {contactStatus === 'error' && (
                      <p className="text-xs text-red-600 font-medium">
                        {lang === 'en'
                          ? 'Failed to send message. Please reach us directly via WhatsApp or email.'
                          : 'Imeshindwa kutuma ujumbe. Tafadhali wasiliana nasi moja kwa moja kupitia WhatsApp au barua pepe.'}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={contactStatus === 'sending'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white font-bold px-7 py-3 rounded-lg border border-[#C9A227] transition-all min-h-[44px] cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#C9A227]" />
                        <span>{contactStatus === 'sending' ? t.contactSending : t.contactSubmitBtn}</span>
                      </button>

                      <a
                        href={`https://wa.me/254724158187?text=${encodeURIComponent(
                          `Hello Dr. Muthoka / Salama Legacy Centre Team, regarding: ${contactSubject}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold px-5 py-3 rounded-lg text-xs transition-colors min-h-[44px]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send via WhatsApp Direct</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Institutional Details + Working Hours + Embedded Map */}
              <div className="lg:col-span-5 space-y-6">
                {/* Details Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-lg text-[#0A2E5D] mb-4">
                    {t.contactDetailsTitle}
                  </h3>

                  <div className="space-y-3.5 text-sm">
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Salama Legacy Centre</span>
                        <span className="text-slate-600 text-xs">Director: Dr. Muthoka J.K, PhD</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Location</span>
                        <span className="text-slate-600 text-xs">Salama Town, Makueni County, Kenya</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Phone / WhatsApp</span>
                        <a
                          href="tel:+254724158187"
                          className="text-[#0A2E5D] hover:text-[#C9A227] text-xs font-medium"
                        >
                          +254 724 158 187
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Email</span>
                        <a
                          href="mailto:salamalegacy@gmail.com"
                          className="text-[#0A2E5D] hover:text-[#C9A227] text-xs font-medium"
                        >
                          salamalegacy@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Official Website</span>
                        <a
                          href="https://www.salamalegacy.co.ke"
                          className="text-[#0A2E5D] hover:text-[#C9A227] text-xs font-medium"
                        >
                          www.salamalegacy.co.ke
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="mt-6 pt-5 border-t border-slate-200">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>{t.contactHoursTitle}</span>
                    </h4>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p>{t.contactHoursWeekdays}</p>
                      <p>{t.contactHoursSat}</p>
                      <p className="text-slate-400 italic">{t.contactHoursSun}</p>
                    </div>
                  </div>
                </div>

                {/* Embedded Google Map (Salama Town, place ID ChIJTQzmudb5LxgRfikPC1_Zmy4, lat -1.8506062, lng 37.2570821) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm overflow-hidden">
                  <div className="rounded-xl overflow-hidden aspect-[4/3] w-full relative bg-slate-100">
                    <iframe
                      title={t.mapTitle}
                      src="https://maps.google.com/maps?q=-1.8506062,37.2570821&hl=en&z=14&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="px-3 py-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">Salama Town, Makueni County</span>
                    <a
                      href="https://maps.google.com/?q=-1.8506062,37.2570821"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0A2E5D] hover:text-[#C9A227] font-semibold flex items-center gap-1"
                    >
                      Open in Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          17. FOOTER
      ========================================================================= */}
      <footer className="bg-[#061c3a] text-white pt-14 pb-8 border-t border-[#C9A227]/40 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Dignity Motto (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center shrink-0">
                  <img
                    src={LOGO_TRANSPARENT_BASE64}
                    alt="Salama Legacy Centre Official Crest"
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Salama Legacy Centre</h3>
                  <span className="text-xs text-[#E5BE42] italic block">&ldquo;{t.tagline}&rdquo;</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                {t.footerAbout}
              </p>

              <div className="text-xs text-slate-400">
                <span className="text-[#C9A227] font-semibold">Leadership:</span> Dr. Muthoka J.K, PhD
              </div>
            </div>

            {/* Col 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-heading font-bold text-sm text-[#E5BE42] uppercase tracking-wider">
                {t.footerQuickLinks}
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <a href="#hero" className="hover:text-[#E5BE42] transition-colors">
                    {t.navHome}
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#E5BE42] transition-colors">
                    {t.navAbout}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#E5BE42] transition-colors">
                    {t.navServices}
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="hover:text-[#E5BE42] transition-colors">
                    {t.navWorkflow}
                  </a>
                </li>
                <li>
                  <a href="#publications" className="hover:text-[#E5BE42] transition-colors">
                    {t.navPublications}
                  </a>
                </li>
                <li>
                  <a href="#news" className="hover:text-[#E5BE42] transition-colors">
                    {t.navNews}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#E5BE42] transition-colors">
                    {t.navContact}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & Ethics Notice (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="font-heading font-bold text-sm text-[#E5BE42] uppercase tracking-wider">
                {t.footerLegal}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Salama Legacy Centre conducts all socio-economic, agricultural, and policy research under strict academic integrity, NACOSTI ethical protocols, and informed community consent.
              </p>

              <div className="pt-2 text-xs text-slate-400">
                <p className="text-slate-400 text-xs italic">{t.socialNotice}</p>
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 {t.footerCopyright}</p>
            <p>{t.footerRights}</p>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          18. FLOATING WHATSAPP BUTTON (Bottom Right)
      ========================================================================= */}
      <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/254724158187?text=Hello%20Dr.%20Muthoka%20/%20Salama%20Legacy%20Centre,%20I%20would%20like%20to%20inquire%20about%20your%20research,%20training,%20and%20consultancy%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group min-h-[44px]"
          aria-label="Chat with Dr. Muthoka on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-slate-950" />
          <span className="hidden sm:inline text-xs font-bold text-slate-950">WhatsApp Us</span>
        </a>
      </aside>

      {/* =========================================================================
          19. INTERACTIVE PUBLISHING DESK & BLOG READER MODALS
      ========================================================================= */}
      <PublishingModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        lang={lang}
        contentState={contentState}
        onContentUpdate={setContentState}
      />

      <BlogReaderModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        lang={lang}
      />
    </div>
  );
}
