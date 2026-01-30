const HELP_PUBLISHED_URLS_ENDPOINT = 'https://api.docstar.io/p/published-urls/fLMgydvRdvN7';
const BLOG_PUBLISHED_URLS_ENDPOINT = 'https://api.docstar.io/p/published-urls/wAkjF0zqiO2E';
const WEBSITE_TABLE_ENDPOINT = 'https://table-api.viasocket.com/68e89f851e8b7c70f10b866a/tblqjjbk2';
const WEBSITE_TABLE_AUTH_KEY = process.env.DB_AUTH_KEY;
const DOCSTAR_ORIGIN = 'https://docstar.io';
const RECORD_ARRAY_KEYS = ['records', 'data', 'items', 'results', 'rows'];
const HELP_PRIORITY = 0.74;
const BLOG_PRIORITY = 0.64;
const WEBSITE_FALLBACK_PRIORITY = 0.84;

export const revalidate = 300; // refresh sitemap roughly every 5 minutes

const noopLogger = (label, err) => {
  console.error(`[sitemap] ${label}:`, err);
};

const fetchJson = async (url, init = {}) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with ${response.status}`);
  }

  return response.json();
};

const normalizeUrlList = (payload) => {
  if (!payload) return [];

  const collectFromArray = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr
      .map((entry) => normalizeUrlEntry(entry))
      .filter(Boolean);
  };

  if (Array.isArray(payload)) {
    return collectFromArray(payload);
  }

  if (typeof payload === 'object') {
    if (Array.isArray(payload.urls)) {
      return collectFromArray(payload.urls);
    }

    for (const key of RECORD_ARRAY_KEYS) {
      if (Array.isArray(payload[key])) {
        const candidate = collectFromArray(payload[key]);
        if (candidate.length) return candidate;
      }
    }

    if (typeof payload.url === 'string') {
      return [payload.url];
    }
  }

  return [];
};

const normalizeUrlEntry = (entry) => {
  if (!entry) return null;
  if (typeof entry === 'string') {
    return sanitizeUrl(entry);
  }

  if (typeof entry === 'object') {
    if (typeof entry.url === 'string') {
      return sanitizeUrl(entry.url);
    }
    if (typeof entry.link === 'string') {
      return sanitizeUrl(entry.link);
    }
    if (typeof entry.href === 'string') {
      return sanitizeUrl(entry.href);
    }
  }
  return null;
};

const sanitizeUrl = (value) => {
  if (!value) return null;
  const trimmed = `${value}`.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const normalized = trimmed.replace(/^\/+/g, '');
  const lower = normalized.toLowerCase();
  if (lower.startsWith('docstar.io')) {
    const remainder = normalized.slice('docstar.io'.length).replace(/^\/+/, '');
    return `${DOCSTAR_ORIGIN}/${remainder}`.replace(/(?<!:)\/\//g, '/');
  }
  if (lower.startsWith('www.docstar.io')) {
    const remainder = normalized.slice('www.docstar.io'.length).replace(/^\/+/, '');
    return `${DOCSTAR_ORIGIN}/${remainder}`.replace(/(?<!:)\/\//g, '/');
  }

  return `${DOCSTAR_ORIGIN}/${normalized}`.replace(/(?<!:)\/\//g, '/');
};

const normalizePriority = (value, fallback = WEBSITE_FALLBACK_PRIORITY) => {
  const num = typeof value === 'number' ? value : parseFloat(value);
  if (Number.isFinite(num) && num > 0 && num <= 1) {
    return Number(num.toFixed(2));
  }
  return fallback;
};

const extractPathsFromTablePayload = (payload) => {
  const rows = payload?.data?.rows ?? [];
  return rows
    .map((row) => {
      if (typeof row?.name !== 'string') return null;
      const loc = sanitizeUrl(row.name);
      if (!loc) return null;
      return {
        loc,
        priority: normalizePriority(row.priority),
      };
    })
    .filter(Boolean);
};

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const buildSitemapXml = (entries) => {
  const now = new Date().toISOString();
  const urlTags = entries
    .map(({ loc, priority }) => {
      const normalizedPriority = normalizePriority(priority);
      return `    <url>\n      <loc>${escapeXml(loc)}</loc>\n      <lastmod>${now}</lastmod>\n      <changefreq>daily</changefreq>\n      <priority>${normalizedPriority}</priority>\n    </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlTags}\n</urlset>`;
};

const collectSitemapUrls = async () => {
  const [websiteEntries, helpUrls, blogUrls] = await Promise.all([
    fetchJson(WEBSITE_TABLE_ENDPOINT, {
      headers: {
        'auth-key': WEBSITE_TABLE_AUTH_KEY,
      },
    })
      .then((payload) => extractPathsFromTablePayload(payload))
      .catch((error) => {
        noopLogger('table-pages', error);
        return [];
      }),
    fetchJson(HELP_PUBLISHED_URLS_ENDPOINT).then(normalizeUrlList).catch((error) => {
      noopLogger('help-pages', error);
      return [];
    }),
    fetchJson(BLOG_PUBLISHED_URLS_ENDPOINT).then(normalizeUrlList).catch((error) => {
      noopLogger('blog-pages', error);
      return [];
    }),
  ]);

  const toEntries = (urls, priority) =>
    urls
      .map((loc) => (loc ? { loc, priority } : null))
      .filter((entry) => entry && typeof entry.loc === 'string');

  const ordered = [...websiteEntries, ...toEntries(helpUrls, HELP_PRIORITY), ...toEntries(blogUrls, BLOG_PRIORITY)];

  const deduped = [];
  const seen = new Set();
  ordered.forEach((entry) => {
    if (!entry || !entry.loc || seen.has(entry.loc)) return;
    seen.add(entry.loc);
    deduped.push(entry);
  });

  return deduped;
};

export async function GET() {
  try {
    const urls = await collectSitemapUrls();
    if (!urls.length) {
      throw new Error('No URLs available for sitemap');
    }
    const xml = buildSitemapXml(urls);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    noopLogger('sitemap-builder', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store',
      },
    });
  }
}
