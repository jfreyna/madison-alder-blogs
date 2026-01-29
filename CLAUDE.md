# CLAUDE.md - Madison Alder Blog Aggregator

**Project**: Madison Common Council Blog Aggregator
**Repository**: https://github.com/jfreyna/madison-alder-blogs
**Event**: AI Coding Tools Demo Night (January 29, 2026)
**Tech Stack**: TypeScript + React + Vite + shadcn/ui + GitHub Actions
**Architecture**: Git-scraping (no backend database)
**Deployment**: GitHub Pages

---

## Mission

Build a lightweight, **open-source** blog aggregator for Madison Common Council members (alders) using the **git-scraping pattern**. All data lives in version control, no vendor lock-in, free forever hosting. This is civic tech - it should be transparent, forkable, and maintainable by the community.

**Why This Matters**: The City of Madison used to provide this service but discontinued it. We're filling the gap with modern web tools and open source principles.

---

## Current Project Status

**✅ Completed:**
- Vite + React + TypeScript environment setup
- Source Sans 3 font integration (Google Fonts)
- Basic project structure with Hello World page
- Git repository initialized and pushed to GitHub
- Dev server running on http://localhost:5173/

**📋 Next Steps:**
- Create Product Requirements Prompt (PRP) with development phases
- Define visual deliverables for each phase
- Begin implementation of blog aggregator features

---

## Terminology: Residents (Not "Users")

**Never use the word "user" in prompts, documentation, or code comments.** This is civic technology serving Madison residents.

| Term | Who | Context |
|------|-----|---------|
| **Resident** | Someone using the aggregator | Browsing posts, searching, filtering |
| **Alder** | Madison Common Council member | Author of blog posts, district representative |
| **Community** | Madison residents, civic hackers | Contributors, maintainers, future developers |

**Why this matters:**
- "Resident" acknowledges civic participation and community membership
- "User" is impersonal and extractive
- This sets the tone for public-serving technology

---

## Project Structure

```
alder-aggregator/
├── .github/
│   └── workflows/
│       └── scrape-blogs.yml      # Daily scraping at 6am CT
│
├── scraper/                      # Node.js scraping scripts
│   ├── scrape.ts                 # Main scraping logic
│   ├── parse.ts                  # CSS selector parsing (from event docs)
│   ├── alders.json               # Static list of 20 alders
│   └── types.ts                  # TypeScript types
│
├── data/                         # Git-scraped data (committed to repo)
│   ├── posts.json                # All scraped posts (append-only)
│   ├── metadata.json             # Last scrape time, post count
│   └── rss.xml                   # Generated RSS feed
│
├── src/                          # React frontend (Vite + TypeScript)
│   ├── components/               # shadcn/ui components
│   │   ├── ui/                   # shadcn/ui primitives
│   │   ├── AlderFilter.tsx
│   │   ├── DateRangeFilter.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PostCard.tsx
│   │   └── PostList.tsx
│   ├── lib/
│   │   ├── search.ts             # Fuse.js client-side search
│   │   ├── filters.ts            # Date/alder filtering logic
│   │   ├── utils.ts              # shadcn/ui utilities
│   │   └── types.ts              # Frontend TypeScript types
│   ├── hooks/
│   │   ├── useSearch.ts
│   │   ├── useFilters.ts
│   │   └── usePosts.ts
│   ├── App.tsx
│   └── main.tsx
│
├── public/                       # Static assets for GitHub Pages
│   └── alder-photos/             # Downloaded from city website
│
├── docs/                         # Documentation (your workflow)
│   ├── 1_prp/                   # Product Requirements Prompts
│   ├── 2_devlog/                # Development logs
│   └── 3_featuredoc/            # Feature documentation
│
├── CLAUDE.md                     # This file (project instructions)
├── GEMINI_INTEGRATION.md         # Optional LLM summarization (gitignored)
├── .env.example                  # Template for API keys
├── .gitignore                    # Exclude .env, summaries/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md                     # Public-facing project overview
```

---

## Tech Stack

### Frontend
- **React 18** + **TypeScript** - Component-based UI
- **Vite** - Fast dev server and build
- **shadcn/ui** - Accessible, customizable components
- **Tailwind CSS** - Utility-first styling
- **Source Sans 3** - Modern, readable typography for civic content
- **Fuse.js** - Client-side fuzzy search

### Scraping
- **Cheerio** - jQuery-like HTML parsing
- **Node.js + TypeScript** - Scraping scripts
- **GitHub Actions** - Scheduled execution (cron)

### Deployment
- **GitHub Pages** - Free static hosting
- **Git** - Data storage (git-scraping pattern)

### Optional (Demo Only)
- **Gemini API** - Generate post summaries (not committed to public repo)

---

## Core Documents

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | This file - project instructions and patterns |
| `GEMINI_INTEGRATION.md` | Optional LLM summarization (gitignored) |
| `docs/1_prp/` | Product Requirements Prompts (before building) |
| `docs/2_devlog/` | Development logs (while building) |
| `docs/3_featuredoc/` | Feature documentation (after launch) |
| Event Docs | [GitHub Repo](https://github.com/Programming-with-AI/Civic-Hacking-Alder-Aggregator-Overview) |

---

## Git-Scraping Pattern (Simon Willison)

**What is git-scraping?**
> "The trick: on a schedule, fetch data from a website, store it in a Git repository, and commit the changes. Over time, you build a timestamped history of the data with zero backend infrastructure."

**Why use this pattern?**
- ✅ **No backend** - No database, no server, no hosting costs
- ✅ **Complete history** - Git tracks every change over time
- ✅ **Free forever** - GitHub Pages + GitHub Actions are free
- ✅ **Transparent** - Anyone can fork, audit, or improve
- ✅ **Resilient** - Data survives even if site goes down

**How it works:**
1. GitHub Actions runs daily (cron: `0 11 * * *` = 6am CT)
2. Scraper fetches HTML from 20 alder blog pages
3. Parses posts using CSS selectors
4. Compares to existing `data/posts.json` (deduplication)
5. Appends new posts, commits changes to git
6. GitHub Pages rebuilds static site automatically

**Reference**: [Simon Willison's Blog](https://simonwillison.net/2020/Oct/9/git-scraping/)

---

## Scraping Information

All CSS selectors and alder data are provided in the event repository:
- **[SCRAPING_INFO.md](https://github.com/Programming-with-AI/Civic-Hacking-Alder-Aggregator-Overview/blob/main/SCRAPING_INFO.md)** - CSS selectors, URL patterns
- **Alder list** - 20 districts with names, blog URLs, photo URLs

**Key URLs:**
- Blog list: `https://www.cityofmadison.com/council/districtXX/blog` (XX = 1-20, no leading zeros)
- Pagination: `?page=0`, `?page=1`, etc.

**Key Selectors:**
- Post list: `#block-city-front-content .content-blog-summary .cards`
- Post title: `.article-title a`
- Post date: `time .datetime` (use `datetime` attribute)
- Post body preview: `.article-content`

---

## Architecture Decisions

### Why Client-Side Search (Not Server-Side)?

**Trade-off**: Client-side search is limited by browser memory, but sufficient for civic use case.

| Approach | Pros | Cons | Our Choice |
|----------|------|------|------------|
| **Client-side (Fuse.js)** | No backend, free, instant results | Limited to recent ~1000 posts | ✅ **This** |
| **Server search (Algolia)** | Unlimited scale, typo-tolerance | Costs money, vendor lock-in | ❌ |
| **Static search (Lunr.js)** | Full-text index in browser | Large download size | ❌ |

**Decision**: Use **Fuse.js** with sliding window (load last 500-1000 posts). Good enough for browsing recent civic updates.

### Why shadcn/ui (Not Material UI)?

| Library | Why Not |
|---------|---------|
| **shadcn/ui** | ✅ Copy-paste components, no dependency bloat, full customization |
| Material UI | Too heavy, opinionated, not accessible by default |
| Chakra UI | Runtime CSS-in-JS overhead |
| Ant Design | Corporate aesthetic, not civic-friendly |

**Decision**: **shadcn/ui** for lightweight, accessible, customizable components.

---

## Design & Typography

### Font: Source Sans 3

**Why Source Sans 3?**
- Designed by Adobe for UI and readable body text
- Open source (SIL Open Font License)
- Optimized for screens and accessibility
- Professional, civic-friendly aesthetic
- Excellent weight range (200-900) for hierarchy

### Setup

**Option 1: Google Fonts (Recommended)**

Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet">
```

**Option 2: Self-hosted (For Offline Support)**
```bash
npm install @fontsource/source-sans-3
```

```typescript
// src/main.tsx
import '@fontsource/source-sans-3/300.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/source-sans-3/700.css';
```

### Tailwind Configuration

```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### Typography Scale

Use semantic font sizes for civic content hierarchy:

```typescript
// Design tokens (reference only)
const typography = {
  display: 'text-4xl font-bold',      // Page titles
  h1: 'text-3xl font-semibold',       // Section headers
  h2: 'text-2xl font-semibold',       // Subsections
  h3: 'text-xl font-semibold',        // Card titles
  body: 'text-base font-normal',      // Body text (16px)
  small: 'text-sm font-normal',       // Metadata (14px)
  caption: 'text-xs font-normal',     // Captions (12px)
};
```

---

## TypeScript Patterns

### Type Definitions

```typescript
// scraper/types.ts
export interface Alder {
  district: number; // 1-20
  name: string;
  blogUrl: string;
  photoUrl: string;
}

export interface Post {
  id: string; // Generated from URL
  alderId: number; // District number
  title: string;
  url: string; // Unique permalink
  date: string; // ISO 8601
  bodyPreview: string;
  fullBody?: string; // Optional (scraped from detail page)
  categories: string[];
  tags: string[];
  scrapedAt: string; // ISO 8601
}

export interface ScraperMetrics {
  totalPosts: number;
  newPosts: number;
  failedAlders: number[];
  lastScrapedAt: string;
}
```

### DRY Utilities

**Pattern from Frilly**: Create shared utilities in `src/lib/` and `scraper/lib/`

```typescript
// src/lib/filters.ts
export function filterByDateRange(
  posts: Post[],
  start: Date | null,
  end: Date | null
): Post[] {
  return posts.filter((post) => {
    const postDate = new Date(post.date);
    if (start && postDate < start) return false;
    if (end && postDate > end) return false;
    return true;
  });
}

// src/lib/search.ts
import Fuse from "fuse.js";

export function createSearchIndex(posts: Post[]) {
  return new Fuse(posts, {
    keys: ["title", "bodyPreview", "categories", "tags"],
    threshold: 0.3, // Fuzzy matching tolerance
  });
}
```

---

## Component Architecture

### shadcn/ui Setup

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add badge
```

### Example Component

```tsx
// src/components/PostCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post, Alder } from "@/lib/types";

interface PostCardProps {
  post: Post;
  alder: Alder;
}

export function PostCard({ post, alder }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <img
            src={alder.photoUrl}
            alt={alder.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              {alder.name} • District {alder.district} • {formatDate(post.date)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{post.bodyPreview}</p>
        <div className="flex gap-2 mt-4">
          {post.categories.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline mt-2 inline-block"
        >
          Read full post →
        </a>
      </CardContent>
    </Card>
  );
}
```

---

## Scraping Implementation

### Main Scraper Logic

```typescript
// scraper/scrape.ts
import * as cheerio from "cheerio";
import fs from "fs/promises";
import { Alder, Post, ScraperMetrics } from "./types";

export async function scrapeAlderBlog(alder: Alder): Promise<Post[]> {
  const posts: Post[] = [];

  // Fetch first page to determine total pages
  const firstPageHtml = await fetch(alder.blogUrl).then((r) => r.text());
  const $ = cheerio.load(firstPageHtml);

  // Get last page number from pagination
  const lastPageHref = $("#block-city-front-content nav.pager .pager__item--last a").attr("href");
  const totalPages = extractPageNumber(lastPageHref) + 1; // 0-indexed

  // Scrape all pages
  for (let page = 0; page < totalPages; page++) {
    const pageUrl = `${alder.blogUrl}?page=${page}`;
    const html = await fetch(pageUrl).then((r) => r.text());
    const $page = cheerio.load(html);

    // Extract posts from this page
    const pagePosts = extractPostsFromPage($page, alder.district);
    posts.push(...pagePosts);
  }

  return posts;
}

function extractPostsFromPage($: cheerio.CheerioAPI, alderId: number): Post[] {
  const posts: Post[] = [];

  $(".content-blog-summary .cards li").each((index, element) => {
    const $post = $(element);

    const title = $post.find(".article-title a").text().trim();
    const url = $post.find(".article-title a").attr("href");
    const datetime = $post.find("time .datetime").attr("datetime");
    const bodyPreview = $post.find(".article-content").text().trim();

    const categories: string[] = [];
    $post.find(".card-content > p a").each((_, cat) => {
      categories.push($(cat).text().trim());
    });

    if (title && url && datetime) {
      posts.push({
        id: generatePostId(url),
        alderId,
        title,
        url: `https://www.cityofmadison.com${url}`,
        date: datetime,
        bodyPreview,
        categories,
        tags: [],
        scrapedAt: new Date().toISOString(),
      });
    }
  });

  return posts;
}
```

### Deduplication Logic

```typescript
// scraper/scrape.ts (continued)
export async function deduplicatePosts(newPosts: Post[]): Promise<Post[]> {
  // Load existing posts
  const existingPostsJson = await fs.readFile("data/posts.json", "utf-8");
  const existingPosts: Post[] = JSON.parse(existingPostsJson);

  // Create set of existing URLs
  const existingUrls = new Set(existingPosts.map((p) => p.url));

  // Filter to only new posts
  return newPosts.filter((post) => !existingUrls.has(post.url));
}
```

---

## GitHub Actions Configuration

```yaml
# .github/workflows/scrape-blogs.yml
name: Scrape Alder Blogs

on:
  schedule:
    - cron: '0 11 * * *'  # 6am Central Time (11am UTC)
  workflow_dispatch:      # Allow manual trigger

jobs:
  scrape:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run scraper
        run: npm run scrape

      - name: Commit and push if changed
        run: |
          git config user.name "GitHub Action"
          git config user.email "action@github.com"
          git add data/
          git diff --quiet && git diff --staged --quiet || (git commit -m "Update blog posts - $(date)" && git push)
```

---

## Optional: Gemini Summarization

See **`GEMINI_INTEGRATION.md`** (gitignored) for instructions on:
- Setting up Gemini API key
- Generating post summaries
- Cost tracking
- Demo workflow

**Important**: This feature is **optional** and for **demo purposes only**. Do not commit API keys or summaries to the public repo.

---

## Environment Variables

```bash
# .env.example (commit this)
# Copy to .env (gitignored) for local development

# Optional: Gemini API for post summarization (demo only)
GEMINI_API_KEY=your_api_key_here
```

**Gitignore:**
```
# .gitignore
.env
summaries/
*.log
```

---

## Documentation Workflow

### Three Stages (Same as Frilly)

1. **Product Requirements Prompt (PRP)** - Before building
   - Name: `AA-XXX_Description_prp.md` (AA = Alder Aggregator)
   - Save: `docs/1_prp/`

2. **Development Log** - While building
   - Name: `AA-XXX_Description_devlog.md`
   - Save: `docs/2_devlog/`

3. **Feature Documentation** - After launch
   - Name: `AA-XXX_Description_featuredoc.md`
   - Save: `docs/3_featuredoc/`

**Example Issue Numbering:**
- AA-001: Initial scraper implementation
- AA-002: React frontend with shadcn/ui
- AA-003: Search and filtering
- AA-004: RSS feed generation
- AA-005: GitHub Actions deployment

---

## Git Workflow

**Branch Strategy:**
- `main` - Production-ready, deploys to GitHub Pages
- `feature/AA-XXX-description` - Feature branches

**Workflow:**
```bash
git checkout main && git pull origin main
git checkout -b feature/AA-XXX-your-feature
# ... work ...
git commit -m "feat(scraper): add pagination support (AA-XXX)"
git push origin feature/AA-XXX-your-feature
# Open PR, merge when ready
```

**Commit Format:** [Conventional Commits](https://www.conventionalcommits.org/)
- `feat(scope):` New feature
- `fix(scope):` Bug fix
- `docs(scope):` Documentation
- `chore(scope):` Build/config changes

---

## Anti-Patterns to Avoid

### ❌ Don't Over-Engineer

**Problem**: Adding features not in the demo scope
- ❌ User accounts, authentication
- ❌ Backend API server
- ❌ Complex state management (Redux, Zustand)
- ❌ Database migrations

**Solution**: Keep it simple - static site, client-side logic, git-scraped data

### ❌ Don't Commit Large Files

**Problem**: Git repo bloats with photos, summaries, logs
- ❌ Committing `summaries/` folder
- ❌ Committing `.env` with API keys
- ❌ Committing `node_modules/`

**Solution**: Use `.gitignore` aggressively, link to external assets

### ❌ Don't Break Git History

**Problem**: Rewriting history on `main` branch
- ❌ `git push --force` to main
- ❌ `git rebase` on shared branches

**Solution**: Use feature branches, clean up before PR

### ❌ Don't Scrape Too Aggressively

**Problem**: Hammering city website with requests
- ❌ No delays between requests
- ❌ Scraping every hour (too frequent)
- ❌ No error handling for 429/503 errors

**Solution**:
- Scrape once daily (6am)
- Add 1-2 second delays between alders
- Respect robots.txt
- Handle errors gracefully

---

## Deployment to GitHub Pages

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/madison-alder-blogs/', // GitHub Pages base path
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### GitHub Pages Setup

1. Go to repo Settings → Pages
2. Source: "GitHub Actions"
3. Create deployment workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Install Source Sans 3 font | `npm install @fontsource/source-sans-3` |
| Run dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production | `npm run preview` |
| Run scraper locally | `npm run scrape` |
| Add shadcn component | `npx shadcn-ui@latest add <component>` |

---

## Demo Tips for Tonight

1. **Start with SHORT_DESCRIPTION.md** as initial prompt
2. **Reference SCRAPING_INFO.md** for CSS selectors (don't reverse-engineer)
3. **Show git-scraping pattern** - commit data changes to git
4. **Demo live scraping** - Run `npm run scrape` manually
5. **Demo Gemini (optional)** - Generate summary for 1 post
6. **Keep it scoped** - Don't add features beyond requirements
