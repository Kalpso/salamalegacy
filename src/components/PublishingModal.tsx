/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  FileText,
  Layers,
  BookOpen,
  Calendar,
  MessageSquare,
  RefreshCw,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  Sparkles,
  Link2,
} from 'lucide-react';
import {
  ProjectItem,
  PublicationItem,
  NewsItem,
  BlogItem,
  FeedbackItem,
  CentreContentState,
  saveContent,
  resetContentToDefault,
} from '../utils/contentStore';
import {
  fetchPublicationsFromSheet,
  fetchProjectsFromSheet,
  fetchNewsFromSheet,
  fetchBlogsFromSheet,
} from '../utils/sheets';
import { Language } from '../constants/translations';

interface PublishingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  contentState: CentreContentState;
  onContentUpdate: (updated: CentreContentState) => void;
}

type PublishCategory = 'project' | 'publication' | 'news' | 'blog' | 'feedback';

export const PublishingModal: React.FC<PublishingModalProps> = ({
  isOpen,
  onClose,
  lang,
  contentState,
  onContentUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'publish' | 'sheets' | 'export'>('publish');
  const [publishCategory, setPublishCategory] = useState<PublishCategory>('project');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states for Project
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('Socio-Economic Research');
  const [projClient, setProjClient] = useState('');
  const [projYear, setProjYear] = useState('2026');
  const [projStatus, setProjStatus] = useState<'In Progress' | 'Completed' | 'Upcoming'>('In Progress');
  const [projSummary, setProjSummary] = useState('');
  const [projOutcomes, setProjOutcomes] = useState('');
  const [projLocation, setProjLocation] = useState('Makueni County, Kenya');

  // Form states for Publication
  const [pubTitle, setPubTitle] = useState('');
  const [pubType, setPubType] = useState('Policy Brief');
  const [pubYear, setPubYear] = useState('2026');
  const [pubAuthors, setPubAuthors] = useState('Dr. Muthoka J.K, PhD');
  const [pubDesc, setPubDesc] = useState('');
  const [pubLink, setPubLink] = useState('');
  const [pubCitation, setPubCitation] = useState('');

  // Form states for News
  const [newsHeadline, setNewsHeadline] = useState('');
  const [newsDate, setNewsDate] = useState('May 2026');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsCategory, setNewsCategory] = useState('Announcement');

  // Form states for Blog
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Dr. Muthoka J.K, PhD');
  const [blogRole, setBlogRole] = useState('Director & Lead Investigator');
  const [blogDate, setBlogDate] = useState('May 2026');
  const [blogReadTime, setBlogReadTime] = useState('4 min read');
  const [blogCategory, setBlogCategory] = useState('Research Philosophy');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogTags, setBlogTags] = useState('Research, Dignity, Makueni');

  // Form states for Feedback
  const [fbClient, setFbClient] = useState('');
  const [fbOrg, setFbOrg] = useState('');
  const [fbRating, setFbRating] = useState(5);
  const [fbMessage, setFbMessage] = useState('');
  const [fbDate, setFbDate] = useState('April 2026');

  // Google Sheets URLs
  const [sheetPubsUrl, setSheetPubsUrl] = useState('');
  const [sheetProjUrl, setSheetProjUrl] = useState('');
  const [sheetNewsUrl, setSheetNewsUrl] = useState('');
  const [sheetBlogUrl, setSheetBlogUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Import JSON text
  const [importJsonText, setImportJsonText] = useState('');

  if (!isOpen) return null;

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (publishCategory === 'project') {
      if (!projTitle.trim() || !projSummary.trim()) {
        showToast('error', 'Please provide at least a project title and summary.');
        return;
      }
      const newProj: ProjectItem = {
        id: `proj-${Date.now()}`,
        title: projTitle.trim(),
        category: projCategory,
        client: projClient.trim() || 'Salama Legacy Centre Partner',
        year: projYear.trim() || '2026',
        status: projStatus,
        summary: projSummary.trim(),
        outcomes: projOutcomes.split('\n').map((o) => o.trim()).filter(Boolean),
        location: projLocation.trim() || 'Salama Town, Makueni County',
      };
      const updated: CentreContentState = {
        ...contentState,
        projects: [newProj, ...contentState.projects],
      };
      saveContent(updated);
      onContentUpdate(updated);
      showToast('success', `Project "${newProj.title}" published! It is now live on the website.`);
      // Reset
      setProjTitle('');
      setProjSummary('');
      setProjOutcomes('');
    } else if (publishCategory === 'publication') {
      if (!pubTitle.trim() || !pubDesc.trim()) {
        showToast('error', 'Please provide at least a publication title and abstract/description.');
        return;
      }
      const newPub: PublicationItem = {
        id: `pub-${Date.now()}`,
        title: pubTitle.trim(),
        type: pubType,
        year: pubYear.trim() || '2026',
        authors: pubAuthors.trim() || 'Dr. Muthoka J.K, PhD',
        description: pubDesc.trim(),
        link: pubLink.trim(),
        doiOrCitation: pubCitation.trim(),
      };
      const updated: CentreContentState = {
        ...contentState,
        publications: [newPub, ...contentState.publications],
      };
      saveContent(updated);
      onContentUpdate(updated);
      showToast('success', `Publication "${newPub.title}" published! Live in Publications section.`);
      setPubTitle('');
      setPubDesc('');
      setPubLink('');
      setPubCitation('');
    } else if (publishCategory === 'news') {
      if (!newsHeadline.trim() || !newsSummary.trim()) {
        showToast('error', 'Please provide a headline and summary.');
        return;
      }
      const newNews: NewsItem = {
        id: `news-${Date.now()}`,
        date: newsDate.trim() || '2026',
        headline: newsHeadline.trim(),
        summary: newsSummary.trim(),
        category: newsCategory,
        isOfficialNotice: true,
      };
      const updated: CentreContentState = {
        ...contentState,
        news: [newNews, ...contentState.news],
      };
      saveContent(updated);
      onContentUpdate(updated);
      showToast('success', `Announcement "${newNews.headline}" published live!`);
      setNewsHeadline('');
      setNewsSummary('');
    } else if (publishCategory === 'blog') {
      if (!blogTitle.trim() || !blogExcerpt.trim() || !blogContent.trim()) {
        showToast('error', 'Please provide a title, summary excerpt, and full content for the blog post.');
        return;
      }
      const newBlog: BlogItem = {
        id: `blog-${Date.now()}`,
        title: blogTitle.trim(),
        author: blogAuthor.trim() || 'Dr. Muthoka J.K, PhD',
        role: blogRole.trim() || 'Lead Investigator',
        date: blogDate.trim() || '2026',
        readTime: blogReadTime.trim() || '4 min read',
        category: blogCategory,
        excerpt: blogExcerpt.trim(),
        content: blogContent.trim(),
        tags: blogTags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      const updated: CentreContentState = {
        ...contentState,
        blogs: [newBlog, ...contentState.blogs],
      };
      saveContent(updated);
      onContentUpdate(updated);
      showToast('success', `Article "${newBlog.title}" published! Readers can view it in the Legacy Insights section.`);
      setBlogTitle('');
      setBlogExcerpt('');
      setBlogContent('');
    } else if (publishCategory === 'feedback') {
      if (!fbClient.trim() || !fbMessage.trim()) {
        showToast('error', 'Please provide client name and testimonial message.');
        return;
      }
      const newFb: FeedbackItem = {
        id: `fb-${Date.now()}`,
        clientName: fbClient.trim(),
        organisation: fbOrg.trim() || 'Institutional Partner',
        rating: fbRating,
        message: fbMessage.trim(),
        date: fbDate.trim() || '2026',
        verified: true,
      };
      const updated: CentreContentState = {
        ...contentState,
        feedback: [newFb, ...contentState.feedback],
      };
      saveContent(updated);
      onContentUpdate(updated);
      showToast('success', `Feedback from "${newFb.clientName}" approved & published on website!`);
      setFbClient('');
      setFbOrg('');
      setFbMessage('');
    }
  };

  const handleSyncSheets = async () => {
    setIsSyncing(true);
    let updated = { ...contentState };
    let syncedCount = 0;

    try {
      if (sheetPubsUrl.trim()) {
        const pubs = await fetchPublicationsFromSheet(sheetPubsUrl.trim());
        if (pubs && pubs.length > 0) {
          updated.publications = pubs;
          syncedCount++;
        }
      }
      if (sheetProjUrl.trim()) {
        const projs = await fetchProjectsFromSheet(sheetProjUrl.trim());
        if (projs && projs.length > 0) {
          updated.projects = projs;
          syncedCount++;
        }
      }
      if (sheetNewsUrl.trim()) {
        const news = await fetchNewsFromSheet(sheetNewsUrl.trim());
        if (news && news.length > 0) {
          updated.news = news;
          syncedCount++;
        }
      }
      if (sheetBlogUrl.trim()) {
        const blogs = await fetchBlogsFromSheet(sheetBlogUrl.trim());
        if (blogs && blogs.length > 0) {
          updated.blogs = blogs;
          syncedCount++;
        }
      }

      if (syncedCount > 0) {
        saveContent(updated);
        onContentUpdate(updated);
        showToast('success', `Successfully synchronized live data from ${syncedCount} Google Sheet(s)!`);
      } else {
        showToast('error', 'No valid CSV rows could be fetched. Ensure the Google Sheet is published to web as CSV.');
      }
    } catch (err) {
      showToast('error', 'Error fetching Google Sheets data. Check URLs and network.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(contentState, null, 2);
    navigator.clipboard.writeText(dataStr);
    showToast('success', 'Complete website database JSON copied to clipboard! You can also paste it into code.');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed && (parsed.projects || parsed.publications || parsed.news || parsed.blogs)) {
        const full: CentreContentState = {
          projects: parsed.projects || contentState.projects,
          publications: parsed.publications || contentState.publications,
          news: parsed.news || contentState.news,
          blogs: parsed.blogs || contentState.blogs,
          feedback: parsed.feedback || contentState.feedback,
        };
        saveContent(full);
        onContentUpdate(full);
        showToast('success', 'Imported JSON data successfully applied to the live website!');
        setImportJsonText('');
      } else {
        showToast('error', 'Invalid JSON format. Expected keys: projects, publications, news, blogs, feedback.');
      }
    } catch {
      showToast('error', 'Malformed JSON string. Please verify the syntax.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all website publications, projects, news, blogs, and feedback back to official defaults?')) {
      const defaults = resetContentToDefault();
      onContentUpdate(defaults);
      showToast('success', 'Reset completed. Website is restored to official institutional baseline.');
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-publisher-title"
      >
        {/* Top Header */}
        <div className="bg-[#0A2E5D] text-white px-6 py-5 flex items-center justify-between border-b border-[#C9A227]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C9A227] text-[#0A2E5D] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#0A2E5D]" />
            </div>
            <div>
              <h2 id="modal-publisher-title" className="text-lg sm:text-xl font-heading font-bold text-white">
                Centre Editorial & Publishing Desk
              </h2>
              <p className="text-xs text-[#E5BE42]">
                Salama Legacy Centre · Instant Live Publishing & Google Sheets Hub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close publisher"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast alert */}
        {notification && (
          <div
            className={`px-6 py-3 flex items-center gap-2 text-xs font-semibold shrink-0 ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                : 'bg-red-50 text-red-800 border-b border-red-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('publish')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'publish'
                ? 'border-[#0A2E5D] text-[#0A2E5D] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#C9A227]" />
            <span>Quick Live Publisher</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sheets')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'sheets'
                ? 'border-[#0A2E5D] text-[#0A2E5D] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-[#0A2E5D]" />
            <span>Google Sheets Sync</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-[#0A2E5D] text-[#0A2E5D] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export / Backup</span>
          </button>
        </div>

        {/* Tab 1: Quick Live Publisher */}
        {activeTab === 'publish' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Item to Publish:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { key: 'project', label: 'Project', icon: Layers, count: contentState.projects.length },
                  { key: 'publication', label: 'Publication', icon: BookOpen, count: contentState.publications.length },
                  { key: 'news', label: 'News Notice', icon: Calendar, count: contentState.news.length },
                  { key: 'blog', label: 'Insights Blog', icon: FileText, count: contentState.blogs.length },
                  { key: 'feedback', label: 'Feedback', icon: MessageSquare, count: contentState.feedback.length },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = publishCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setPublishCategory(cat.key as PublishCategory)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0A2E5D] text-white border-[#C9A227] shadow-sm ring-1 ring-[#C9A227]'
                          : 'bg-[#F5F7FA] text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C9A227]' : 'text-slate-500'}`} />
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {cat.count}
                        </span>
                      </div>
                      <span className="text-xs font-bold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-4 pt-4 border-t border-slate-200">
              {/* Category: Project Form */}
              {publishCategory === 'project' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. Makueni Climate Adaptation & Water Resource Assessment"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                      <select
                        value={projStatus}
                        onChange={(e) => setProjStatus(e.target.value as any)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                      >
                        <option value="In Progress">In Progress (Active)</option>
                        <option value="Completed">Completed</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={projCategory}
                        onChange={(e) => setProjCategory(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                      >
                        <option value="Socio-Economic Research">Socio-Economic Research</option>
                        <option value="Institutional Consultancy">Institutional Consultancy</option>
                        <option value="Applied Innovation">Applied Innovation</option>
                        <option value="Capacity Training">Capacity Training</option>
                        <option value="Policy Evaluation">Policy Evaluation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Client / Partner</label>
                      <input
                        type="text"
                        value={projClient}
                        onChange={(e) => setProjClient(e.target.value)}
                        placeholder="e.g. County Directorate of Agriculture"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Year & Location</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={projYear}
                          onChange={(e) => setProjYear(e.target.value)}
                          placeholder="2026"
                          className="w-20 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                        />
                        <input
                          type="text"
                          value={projLocation}
                          onChange={(e) => setProjLocation(e.target.value)}
                          placeholder="Makueni County"
                          className="grow px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project Summary / Objectives *</label>
                    <textarea
                      rows={3}
                      required
                      value={projSummary}
                      onChange={(e) => setProjSummary(e.target.value)}
                      placeholder="Brief overview of research methodology, clusters sampled, and institutional impact..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Key Deliverables / Outcomes (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={projOutcomes}
                      onChange={(e) => setProjOutcomes(e.target.value)}
                      placeholder="e.g.&#10;Statistically weighted baseline dataset for 1,200 households&#10;Geospatial vulnerability map for Eastern Makueni&#10;Actionable policy brief submitted to stakeholders"
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                    />
                  </div>
                </>
              )}

              {/* Category: Publication Form */}
              {publishCategory === 'publication' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Publication Title *</label>
                      <input
                        type="text"
                        required
                        value={pubTitle}
                        onChange={(e) => setPubTitle(e.target.value)}
                        placeholder="e.g. Centering Dignity in Rural Household Field Surveys"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Publication Type</label>
                      <select
                        value={pubType}
                        onChange={(e) => setPubType(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:border-[#C9A227]"
                      >
                        <option value="Policy Brief">Policy Brief</option>
                        <option value="Technical Report">Technical Report</option>
                        <option value="Working Paper">Working Paper</option>
                        <option value="Methodological Guide">Methodological Guide</option>
                        <option value="Journal Article">Journal Article</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Authors</label>
                      <input
                        type="text"
                        value={pubAuthors}
                        onChange={(e) => setPubAuthors(e.target.value)}
                        placeholder="Dr. Muthoka J.K, PhD"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={pubYear}
                        onChange={(e) => setPubYear(e.target.value)}
                        placeholder="2026"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Document Link / PDF URL</label>
                      <input
                        type="url"
                        value={pubLink}
                        onChange={(e) => setPubLink(e.target.value)}
                        placeholder="https://... (Optional Google Drive or PDF link)"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Abstract / Executive Summary *</label>
                    <textarea
                      rows={3}
                      required
                      value={pubDesc}
                      onChange={(e) => setPubDesc(e.target.value)}
                      placeholder="Clear explanation of the study findings, methodology, and recommendations..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Citation (APA Format)</label>
                    <input
                      type="text"
                      value={pubCitation}
                      onChange={(e) => setPubCitation(e.target.value)}
                      placeholder="e.g. Muthoka, J. K. (2026). Centering Dignity in Grassroots Research. Salama Legacy Policy Series..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>
                </>
              )}

              {/* Category: News Form */}
              {publishCategory === 'news' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Notice Headline *</label>
                      <input
                        type="text"
                        required
                        value={newsHeadline}
                        onChange={(e) => setNewsHeadline(e.target.value)}
                        placeholder="e.g. Centre Convenes Regional Methodology Workshop"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={newsDate}
                        onChange={(e) => setNewsDate(e.target.value)}
                        placeholder="May 2026"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={newsCategory}
                        onChange={(e) => setNewsCategory(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      >
                        <option value="Announcement">Official Announcement</option>
                        <option value="Academic Colloquium">Academic Colloquium</option>
                        <option value="Field Report">Field Report</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Notice Details *</label>
                    <textarea
                      rows={4}
                      required
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      placeholder="Comprehensive notice statement and context..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>
                </>
              )}

              {/* Category: Blog Form */}
              {publishCategory === 'blog' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. Ethical Considerations in Rural Survey Sampling"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        placeholder="Research Philosophy"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Author Name</label>
                      <input
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        placeholder="Dr. Muthoka J.K, PhD"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Author Role</label>
                      <input
                        type="text"
                        value={blogRole}
                        onChange={(e) => setBlogRole(e.target.value)}
                        placeholder="Director & Lead Investigator"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date & Read Time</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={blogDate}
                          onChange={(e) => setBlogDate(e.target.value)}
                          placeholder="May 2026"
                          className="w-28 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                        />
                        <input
                          type="text"
                          value={blogReadTime}
                          onChange={(e) => setBlogReadTime(e.target.value)}
                          placeholder="5 min read"
                          className="grow px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Excerpt / Summary Card *</label>
                    <textarea
                      rows={2}
                      required
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="One or two sentences summarizing the key thesis..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Article Body *</label>
                    <textarea
                      rows={6}
                      required
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Complete article paragraphs. Separate paragraphs with double newlines..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      placeholder="Ethics, Fieldwork, Makueni, Data Integrity"
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>
                </>
              )}

              {/* Category: Feedback Form */}
              {publishCategory === 'feedback' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Client / Stakeholder Name *</label>
                      <input
                        type="text"
                        required
                        value={fbClient}
                        onChange={(e) => setFbClient(e.target.value)}
                        placeholder="e.g. Program Coordinator"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Organisation / Institution *</label>
                      <input
                        type="text"
                        required
                        value={fbOrg}
                        onChange={(e) => setFbOrg(e.target.value)}
                        placeholder="e.g. Community Livelihoods Consortium"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
                      <select
                        value={fbRating}
                        onChange={(e) => setFbRating(Number(e.target.value))}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                      >
                        <option value={5}>5 Stars (Exceptional)</option>
                        <option value={4}>4 Stars (Very Good)</option>
                        <option value={3}>3 Stars (Good)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Testimonial Message *</label>
                    <textarea
                      rows={3}
                      required
                      value={fbMessage}
                      onChange={(e) => setFbMessage(e.target.value)}
                      placeholder="Verified testimonial praising Salama Legacy Centre's service with dignity and academic rigor..."
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  ⚡ Published changes save instantly and persist in visitor browsers.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white font-bold px-6 py-2.5 rounded-lg border border-[#C9A227] transition-all cursor-pointer shadow-sm text-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#C9A227]" />
                  <span>Publish Immediately to Live Website</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Google Sheets Live Sync */}
        {activeTab === 'sheets' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed">
              <strong>How Google Sheets Live Sync Works:</strong> You can maintain your publications, research projects, news notices, and blog articles in a standard Google Sheet. In Google Sheets, click <em>File &rarr; Share &rarr; Publish to web</em>, select <strong>CSV format</strong>, and paste the URL below. Clicking <strong>Sync Live Data</strong> updates the entire site instantly!
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Publications Sheet Published CSV URL:</span>
                </label>
                <input
                  type="url"
                  value={sheetPubsUrl}
                  onChange={(e) => setSheetPubsUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 font-mono"
                />
                <span className="text-[11px] text-slate-400">Columns: title, type, year, authors, description, link, doiOrCitation</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Projects Sheet Published CSV URL:</span>
                </label>
                <input
                  type="url"
                  value={sheetProjUrl}
                  onChange={(e) => setSheetProjUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 font-mono"
                />
                <span className="text-[11px] text-slate-400">Columns: title, category, client, year, status, summary, outcomes, location</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>News & Announcements Sheet CSV URL:</span>
                </label>
                <input
                  type="url"
                  value={sheetNewsUrl}
                  onChange={(e) => setSheetNewsUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Legacy Insights Blog Sheet CSV URL:</span>
                </label>
                <input
                  type="url"
                  value={sheetBlogUrl}
                  onChange={(e) => setSheetBlogUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSyncSheets}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-2 bg-[#0A2E5D] hover:bg-[#061c3a] text-white font-bold px-6 py-2.5 rounded-lg border border-[#C9A227] transition-all cursor-pointer shadow-sm text-sm"
                >
                  <RefreshCw className={`w-4 h-4 text-[#C9A227] ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Synchronizing Sheets...' : 'Sync Live Data from Sheets'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Export / Backup */}
        {activeTab === 'export' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[#0A2E5D] flex items-center gap-2">
                <Download className="w-4 h-4 text-[#C9A227]" />
                <span>Export Site Database JSON</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Copy all currently published projects, research outputs, notices, and blog posts as a single JSON object. You can back it up, email it to colleagues, or commit it directly.
              </p>
              <button
                type="button"
                onClick={handleExportJson}
                className="inline-flex items-center gap-2 bg-[#0A2E5D] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-[#123E77] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Copy Full JSON to Clipboard</span>
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[#0A2E5D] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#C9A227]" />
                <span>Import / Restore Site Database</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste a previously exported JSON backup here to restore all content:
              </p>
              <textarea
                rows={3}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"projects": [...], "publications": [...]}'
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs font-mono"
              />
              <button
                type="button"
                onClick={handleImportJson}
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Apply Imported JSON</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500">Need to restore original site content?</span>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="text-xs text-red-600 hover:text-red-700 underline font-semibold cursor-pointer"
              >
                Reset to Centre Defaults
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Dr. Muthoka J.K, PhD · Salama Legacy Centre Publishing Desk</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0A2E5D] text-white hover:bg-[#123E77] rounded-md font-semibold cursor-pointer"
          >
            Done & Return to Site
          </button>
        </div>
      </div>
    </div>
  );
};
