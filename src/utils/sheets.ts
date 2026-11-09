/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectItem, PublicationItem, NewsItem, BlogItem, FeedbackItem } from './contentStore';

// Google Sheets CSV Integration
// Published CSV URLs can be placed here or in the Live Sync Hub to update content dynamically
export const SHEETS = {
  projects: '',
  publications: '',
  news: '',
  blogs: '',
  feedback: '',
};

export function escapeText(text: string): string {
  if (!text) return '';
  return text.trim();
}

/**
 * Validate that a URL is strictly http:// or https://
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return '';
}

/**
 * Lightweight RFC 4180 compliant CSV parser
 */
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      if (currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Fetch and parse publications from published Google Sheet CSV
 */
export async function fetchPublicationsFromSheet(url: string): Promise<PublicationItem[] | null> {
  if (!url || !url.trim()) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const rows = parseCSV(text);
    if (rows.length <= 1) return null;

    // Expected columns: title, type, year, authors, description, link, doiOrCitation
    const items: PublicationItem[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 2) continue;
      const title = row[0] || '';
      const type = row[1] || 'Research Paper';
      const year = row[2] || '2026';
      const authors = row[3] || 'Dr. Muthoka J.K, PhD';
      const description = row[4] || '';
      const rawLink = row[5] || '';
      const doi = row[6] || '';
      const safeLink = sanitizeUrl(rawLink);

      if (title.trim()) {
        items.push({
          id: `sheet-pub-${i}-${Date.now()}`,
          title: escapeText(title),
          type: escapeText(type),
          year: escapeText(year),
          authors: escapeText(authors),
          description: escapeText(description),
          link: safeLink,
          doiOrCitation: escapeText(doi),
        });
      }
    }
    return items.length > 0 ? items : null;
  } catch (err) {
    console.warn('Failed to fetch publications from Google Sheet:', err);
    return null;
  }
}

/**
 * Fetch and parse projects from published Google Sheet CSV
 */
export async function fetchProjectsFromSheet(url: string): Promise<ProjectItem[] | null> {
  if (!url || !url.trim()) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const rows = parseCSV(text);
    if (rows.length <= 1) return null;

    // Expected columns: title, category, client, year, status, summary, outcomes(semicolon-separated), location
    const items: ProjectItem[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 2) continue;
      const title = row[0] || '';
      const category = row[1] || 'Research Study';
      const client = row[2] || 'Salama Legacy Centre';
      const year = row[3] || '2026';
      const statusRaw = row[4] || 'In Progress';
      const status: 'In Progress' | 'Completed' | 'Upcoming' =
        statusRaw.toLowerCase().includes('comp') ? 'Completed' : statusRaw.toLowerCase().includes('upcom') ? 'Upcoming' : 'In Progress';
      const summary = row[5] || '';
      const outcomesRaw = row[6] || '';
      const outcomes = outcomesRaw.split(';').map((o) => escapeText(o.trim())).filter(Boolean);
      const location = row[7] || 'Makueni County, Kenya';

      if (title.trim()) {
        items.push({
          id: `sheet-proj-${i}-${Date.now()}`,
          title: escapeText(title),
          category: escapeText(category),
          client: escapeText(client),
          year: escapeText(year),
          status,
          summary: escapeText(summary),
          outcomes: outcomes.length > 0 ? outcomes : ['High-integrity research findings delivered with dignity'],
          location: escapeText(location),
        });
      }
    }
    return items.length > 0 ? items : null;
  } catch (err) {
    console.warn('Failed to fetch projects from Google Sheet:', err);
    return null;
  }
}

/**
 * Fetch and parse news from published Google Sheet CSV
 */
export async function fetchNewsFromSheet(url: string): Promise<NewsItem[] | null> {
  if (!url || !url.trim()) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const rows = parseCSV(text);
    if (rows.length <= 1) return null;

    // Expected columns: date, headline, summary, category
    const items: NewsItem[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 2) continue;
      const date = row[0] || '';
      const headline = row[1] || '';
      const summary = row[2] || '';
      const category = row[3] || 'Notice';

      if (headline.trim()) {
        items.push({
          id: `sheet-news-${i}-${Date.now()}`,
          date: escapeText(date),
          headline: escapeText(headline),
          summary: escapeText(summary),
          category: escapeText(category),
          isOfficialNotice: true,
        });
      }
    }
    return items.length > 0 ? items : null;
  } catch (err) {
    console.warn('Failed to fetch news from Google Sheet:', err);
    return null;
  }
}

/**
 * Fetch and parse blogs from published Google Sheet CSV
 */
export async function fetchBlogsFromSheet(url: string): Promise<BlogItem[] | null> {
  if (!url || !url.trim()) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const rows = parseCSV(text);
    if (rows.length <= 1) return null;

    // Expected columns: title, author, role, date, readTime, category, excerpt, content, tags(comma-separated)
    const items: BlogItem[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 2) continue;
      const title = row[0] || '';
      const author = row[1] || 'Dr. Muthoka J.K, PhD';
      const role = row[2] || 'Lead Investigator';
      const date = row[3] || '2026';
      const readTime = row[4] || '4 min read';
      const category = row[5] || 'Insights';
      const excerpt = row[6] || '';
      const content = row[7] || excerpt;
      const tagsRaw = row[8] || 'Research, Dignity';
      const tags = tagsRaw.split(',').map((t) => escapeText(t.trim())).filter(Boolean);

      if (title.trim()) {
        items.push({
          id: `sheet-blog-${i}-${Date.now()}`,
          title: escapeText(title),
          author: escapeText(author),
          role: escapeText(role),
          date: escapeText(date),
          readTime: escapeText(readTime),
          category: escapeText(category),
          excerpt: escapeText(excerpt),
          content: escapeText(content),
          tags,
        });
      }
    }
    return items.length > 0 ? items : null;
  } catch (err) {
    console.warn('Failed to fetch blogs from Google Sheet:', err);
    return null;
  }
}
