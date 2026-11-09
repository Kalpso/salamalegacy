/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, User, Share2, MessageCircle, Mail, BookOpen, Tag, Check } from 'lucide-react';
import { BlogItem, buildWhatsAppLink, buildEmailLink } from '../utils/contentStore';
import { Language } from '../constants/translations';

interface BlogReaderModalProps {
  blog: BlogItem | null;
  onClose: () => void;
  lang: Language;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ blog, onClose, lang }) => {
  const [copied, setCopied] = useState(false);
  if (!blog) return null;

  const waLink = buildWhatsAppLink(
    `Legacy Insights Article: "${blog.title}"`,
    `I read this article by ${blog.author} published on Salama Legacy Centre's website.`
  );

  const emailLink = buildEmailLink(
    `Legacy Insights Engagement: ${blog.title}`,
    `I am writing in response to the article titled "${blog.title}" by ${blog.author} (${blog.date}).\n\nMy questions/comments are:\n`
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-blog-title"
      >
        {/* Header Bar */}
        <div className="bg-[#0A2E5D] text-white px-6 py-5 flex items-center justify-between border-b border-[#C9A227]/40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-[#C9A227]/20 text-[#E5BE42]">
              <BookOpen className="w-5 h-5 text-[#E5BE42]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E5BE42]">
              Salama Legacy Insights · Thought Leadership
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          {/* Metadata pill */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="bg-[#F5F7FA] text-[#0A2E5D] font-bold px-3 py-1 rounded-full border border-slate-200">
              {blog.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
              {blog.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h2
            id="modal-blog-title"
            className="text-2xl sm:text-3xl font-heading font-bold text-[#0A2E5D] leading-tight"
          >
            {blog.title}
          </h2>

          {/* Author Card */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#F5F7FA] rounded-xl border border-slate-200">
            <div className="w-11 h-11 rounded-full bg-[#0A2E5D] text-[#C9A227] flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-[#0A2E5D]">{blog.author}</p>
              <p className="text-xs text-slate-500">{blog.role} · Salama Legacy Centre</p>
            </div>
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 bg-amber-50/60 border-l-4 border-[#C9A227] text-slate-700 text-sm italic font-serif leading-relaxed">
            &ldquo;{blog.excerpt}&rdquo;
          </div>

          {/* Full Article Body */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-slate-700 font-sans">
            {blog.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="text-xs text-slate-400 font-semibold mr-1">Tags:</span>
              {blog.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Direct Engagement Box */}
          <div className="mt-8 p-6 bg-gradient-to-br from-[#0A2E5D] to-[#123E77] text-white rounded-xl border border-[#C9A227]/40">
            <h3 className="font-heading font-bold text-base text-white mb-2">
              {lang === 'en'
                ? 'Engage Directly on this Topic'
                : 'Wasiliana Moja kwa Moja Kuhusu Mada Hii'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mb-4 leading-relaxed">
              {lang === 'en'
                ? 'Connect directly with Dr. Muthoka J.K, PhD and the editorial board to submit follow-up inquiries, request citations, or explore collaborative research.'
                : 'Wasiliana moja kwa moja na Dkt. Muthoka J.K, PhD na meza ya uhariri kuulizia maelezo zaidi au kuanzisha ushirikiano.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs shadow transition-transform hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {lang === 'en' ? 'Discuss via WhatsApp' : 'Jadili Kupitia WhatsApp'}
                </span>
              </a>

              <a
                href={emailLink}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0A2E5D] font-bold px-4 py-2.5 rounded-lg text-xs shadow transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C9A227]" />
                <span>
                  {lang === 'en' ? 'Email Editorial Desk' : 'Tuma Barua Pepe'}
                </span>
              </a>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.excerpt,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(`${blog.title} - Read on Salama Legacy Centre: ${window.location.href}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  }
                }}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-medium px-3.5 py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">
                      {lang === 'en' ? 'Link Copied!' : 'Kimenakiliwa!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#E5BE42]" />
                    <span>{lang === 'en' ? 'Share Article' : 'Sambaza'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Salama Legacy Centre · Makueni County, Kenya</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md font-semibold cursor-pointer"
          >
            {lang === 'en' ? 'Close Reader' : 'Funga'}
          </button>
        </div>
      </div>
    </div>
  );
};
