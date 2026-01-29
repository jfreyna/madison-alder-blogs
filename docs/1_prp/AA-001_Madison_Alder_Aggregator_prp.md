# AA-001: Madison Alder Blog Aggregator - Product Requirements Prompt

**Project**: Madison Common Council Blog Aggregator
**Repository**: https://github.com/jfreyna/madison-alder-blogs
**Event**: AI Coding Tools Demo Night (January 29, 2026)
**Created**: 2026-01-29
**Status**: Planning

---

## Executive Summary

Build a lightweight, open-source blog aggregator for Madison Common Council members (alders) using the git-scraping pattern. The application will restore functionality that the city's website previously provided, allowing residents to browse, search, and filter blog posts from all 20 alders in one place.

**Key Constraint**: This is a **live demo project**. Each development phase must produce **visible progress** that can be showcased during the presentation.

---

## Project Goals

### Primary Goals
1. Aggregate blog posts from all 20 Madison alders into a single interface
2. Enable filtering by alder, date range, and text search
3. Use git-scraping pattern for zero-cost hosting and complete data history
4. Deploy as a static site on GitHub Pages

### Demo Goals
1. Show incremental progress at each phase
2. Demonstrate AI coding tool capabilities
3. Build a functional civic tech application in ~2 hours
4. Keep scope tight and achievable

---

## Core Requirements

### Functional Requirements

**Must Have:**
- Scrape blog posts from 20 alder websites
- Display posts with: title, date, author, excerpt, categories
- Filter by alder (dropdown selector)
- Filter by date range (date picker)
- Client-side text search
- Responsive design for mobile and desktop
- RSS feed generation

**Stretch Goals (if time permits):**
- LLM-generated summaries using Gemini API
- Bluesky bot integration for post distribution
- Advanced search features

### Non-Functional Requirements

**Performance:**
- Fast page loads (< 2 seconds)
- Smooth filtering and search (< 500ms response)

**Accessibility:**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader friendly

**Civic Tech Principles:**
- Open source (MIT or similar license)
- No vendor lock-in
- Free forever hosting
- Community forkable/maintainable

---

## Design & Style Guide

### Color Palette

**Inspiration**: City of Madison website (https://www.cityofmadison.com/council/district2/blog)

During Phase 2, extract exact colors from the City of Madison website using browser DevTools:
- **Primary colors** - Header, navigation backgrounds
- **Accent colors** - Links, buttons, interactive elements
- **Text colors** - Body text, headings, metadata
- **Neutral colors** - Borders, backgrounds, cards

**Design Aesthetic:**
- Clean, municipal government style
- Emphasizes accessibility and information hierarchy
- Professional but approachable
- Focus on content over decoration

### Typography

**Font**: Source Sans 3 (Google Fonts)
- Already integrated in project
- Use weights: 300, 400, 600, 700
- Excellent readability for civic content

**Typography Scale:**
```
h1 (Page title):     text-3xl font-semibold
h2 (Section header): text-2xl font-semibold
h3 (Card title):     text-xl font-semibold
Body text:           text-base font-normal
Metadata:            text-sm font-normal
Caption:             text-xs font-normal
```

### Component Style

**shadcn/ui Components to Use:**
- Card (for post display)
- Badge (for categories/tags)
- Button (for actions)
- Select/Dropdown (for alder filter)
- Input (for search)
- Date Picker (for date range filter)

---

## Technical Architecture

### Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Search**: Fuse.js (client-side fuzzy search)
- **Scraping**: Node.js + TypeScript + Cheerio
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

### Data Flow

```
City Blog Pages
    ↓
[GitHub Actions - Daily Cron]
    ↓
Scraper (Cheerio)
    ↓
data/posts.json (committed to git)
    ↓
[GitHub Pages Build]
    ↓
Static React Site
    ↓
Residents
```

### Git-Scraping Pattern

**Why git-scraping?**
- No backend database needed
- Complete history in version control
- Free GitHub Pages hosting
- Transparent and auditable
- Survives even if scraped sites go down

**Reference**: [Simon Willison's Blog](https://simonwillison.net/2020/Oct/9/git-scraping/)

---

## Development Phases

Each phase produces **visible progress** suitable for live demo.

---

## Phase 1: Static Data Display

**Goal**: Show blog posts immediately using hardcoded data

**Deliverables:**
1. Create sample data file (`src/data/samplePosts.ts`)
2. Build PostCard component with shadcn/ui
3. Create dedicated component preview page (`/preview`)
4. Style PostCard to match City of Madison aesthetic

**Visual Progress:**
- Single post card visible at `/preview`
- Shows alder avatar, name, post title, excerpt, date, categories
- Styled with shadcn/ui Card, Badge components

### Phase 1 Implementation Details

#### 1.1 Sample Data Structure

```typescript
// src/data/samplePosts.ts
export interface Post {
  id: string;
  alderId: number;
  alderName: string;
  alderPhoto: string;
  district: number;
  title: string;
  url: string;
  date: string; // ISO 8601
  excerpt: string;
  categories: string[];
  scrapedAt: string;
}

export const samplePosts: Post[] = [
  {
    id: "post-1",
    alderId: 2,
    alderName: "Yannette Figueroa Cole",
    alderPhoto: "/img/alders/district-2.jpg",
    district: 2,
    title: "Community Meeting Recap",
    url: "https://www.cityofmadison.com/council/district2/blog/...",
    date: "2026-01-15T10:00:00Z",
    excerpt: "Thank you to everyone who attended our community meeting...",
    categories: ["Community", "Meetings"],
    scrapedAt: "2026-01-29T12:00:00Z"
  },
  // Add 5-10 sample posts
];
```

#### 1.2 PostCard Component

```tsx
// src/components/PostCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/data/samplePosts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img
            src={post.alderPhoto}
            alt={post.alderName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">
              <a href={post.url} target="_blank" rel="noopener noreferrer"
                 className="hover:underline">
                {post.title}
              </a>
            </CardTitle>
            <CardDescription>
              {post.alderName} • District {post.district} • {formatDate(post.date)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

#### 1.3 Component Preview Page

Create `/preview` route to visualize and refine the PostCard component:

```tsx
// src/pages/PreviewPage.tsx
import { PostCard } from "@/components/PostCard";
import { samplePosts } from "@/data/samplePosts";

export function PreviewPage() {
  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Component Preview</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Post Card</h2>
          <PostCard post={samplePosts[0]} />
        </section>

        {/* Add more component previews as we build them */}
      </div>
    </div>
  );
}
```

**Demo Checkpoint**: Show styled post card at `/preview`

---

## Phase 2: Scraper Implementation

**Goal**: Build scraping utility to fetch real blog posts

**Deliverables:**
1. Create scraper directory and types
2. Implement scraping logic with Cheerio
3. Add terminal output for visibility
4. Write scraped data to JSON file
5. Handle pagination and errors

**Visual Progress:**
- Terminal shows scraping progress (e.g., "Scraping District 2... found 15 posts")
- Raw JSON file written to `data/posts.json`
- Can inspect file to see real data

### Phase 2 Implementation Details

#### 2.1 Scraper Structure

```
scraper/
├── types.ts              # TypeScript interfaces
├── alders.ts             # List of 20 alders with URLs
├── scrape.ts             # Main scraping logic
├── parse.ts              # HTML parsing utilities
└── index.ts              # CLI entry point
```

#### 2.2 Terminal Visualization

The scraper should output progress to terminal:

```bash
🚀 Starting blog scraper...

📍 District 1 - Nasra Wehelie
   └─ Fetching https://www.cityofmadison.com/council/district1/blog
   └─ Found 2 pages
   └─ Scraped 18 posts ✓

📍 District 2 - Yannette Figueroa Cole
   └─ Fetching https://www.cityofmadison.com/council/district2/blog
   └─ Found 3 pages
   └─ Scraped 24 posts ✓

...

✅ Scraping complete!
   Total posts: 342
   New posts: 12
   Failed districts: 0
   Data saved to: data/posts.json
```

#### 2.3 Scraping Logic

```typescript
// scraper/scrape.ts
import * as cheerio from "cheerio";
import { Alder, Post } from "./types";

export async function scrapeAlderBlog(alder: Alder): Promise<Post[]> {
  console.log(`\n📍 District ${alder.district} - ${alder.name}`);
  console.log(`   └─ Fetching ${alder.blogUrl}`);

  const posts: Post[] = [];

  try {
    // Fetch first page to determine pagination
    const firstPageHtml = await fetch(alder.blogUrl).then(r => r.text());
    const $ = cheerio.load(firstPageHtml);

    // Get total pages
    const lastPageHref = $("#block-city-front-content nav.pager .pager__item--last a").attr("href");
    const totalPages = extractPageNumber(lastPageHref) + 1;
    console.log(`   └─ Found ${totalPages} page(s)`);

    // Scrape all pages
    for (let page = 0; page < totalPages; page++) {
      const pageUrl = `${alder.blogUrl}?page=${page}`;
      const html = await fetch(pageUrl).then(r => r.text());
      const $page = cheerio.load(html);

      const pagePosts = extractPostsFromPage($page, alder);
      posts.push(...pagePosts);
    }

    console.log(`   └─ Scraped ${posts.length} posts ✓`);
  } catch (error) {
    console.error(`   └─ Error: ${error.message} ✗`);
  }

  return posts;
}
```

#### 2.4 Data File Output

Write to `data/posts.json`:

```json
{
  "posts": [...],
  "metadata": {
    "lastScraped": "2026-01-29T12:00:00Z",
    "totalPosts": 342,
    "totalAlders": 20
  }
}
```

#### 2.5 Package Scripts

```json
// package.json
{
  "scripts": {
    "scrape": "tsx scraper/index.ts"
  }
}
```

**Demo Checkpoint**: Run `npm run scrape` and show terminal output + JSON file

---

## Phase 3: Aggregated Posts Page

**Goal**: Display all scraped posts with filtering and search

**Deliverables:**
1. Load posts from `data/posts.json`
2. Display posts in a grid/list layout
3. Add alder filter dropdown
4. Add date range picker
5. Add text search
6. Build filters incrementally (can test each one)

**Visual Progress:**
- Main page shows all posts
- Each filter can be tested independently
- Real-time filtering updates the post list

### Phase 3 Implementation Details

#### 3.1 Main Aggregator Page

```tsx
// src/pages/HomePage.tsx
import { useState, useEffect } from "react";
import { PostCard } from "@/components/PostCard";
import { AlderFilter } from "@/components/AlderFilter";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { SearchBar } from "@/components/SearchBar";
import { Post } from "@/types";

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Filters
  const [selectedAlder, setSelectedAlder] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load posts
  useEffect(() => {
    fetch("/data/posts.json")
      .then(r => r.json())
      .then(data => {
        setPosts(data.posts);
        setFilteredPosts(data.posts);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = posts;

    // Filter by alder
    if (selectedAlder) {
      filtered = filtered.filter(p => p.alderId === selectedAlder);
    }

    // Filter by date range
    if (dateRange[0] || dateRange[1]) {
      filtered = filtered.filter(p => {
        const postDate = new Date(p.date);
        if (dateRange[0] && postDate < dateRange[0]) return false;
        if (dateRange[1] && postDate > dateRange[1]) return false;
        return true;
      });
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedAlder, dateRange, searchQuery]);

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Madison Alder Blogs</h1>
        <p className="text-lg text-muted-foreground">
          Aggregated blog posts from all 20 Common Council members
        </p>
      </header>

      <div className="mb-6 space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="flex gap-4">
          <AlderFilter selected={selectedAlder} onChange={setSelectedAlder} />
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No posts found matching your filters
        </p>
      )}
    </div>
  );
}
```

#### 3.2 Alder Filter Component

```tsx
// src/components/AlderFilter.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { alders } from "@/data/alders";

interface AlderFilterProps {
  selected: number | null;
  onChange: (alderId: number | null) => void;
}

export function AlderFilter({ selected, onChange }: AlderFilterProps) {
  return (
    <Select
      value={selected?.toString() || "all"}
      onValueChange={(value) => onChange(value === "all" ? null : parseInt(value))}
    >
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Filter by Alder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Alders</SelectItem>
        {alders.map(alder => (
          <SelectItem key={alder.district} value={alder.district.toString()}>
            District {alder.district} - {alder.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

#### 3.3 Date Range Filter

```tsx
// src/components/DateRangeFilter.tsx
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface DateRangeFilterProps {
  value: [Date | null, Date | null];
  onChange: (range: [Date | null, Date | null]) => void;
}

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-start text-left">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value[0] && value[1]
            ? `${formatDate(value[0])} - ${formatDate(value[1])}`
            : "Filter by date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: value[0], to: value[1] }}
          onSelect={(range) => onChange([range?.from || null, range?.to || null])}
        />
      </PopoverContent>
    </Popover>
  );
}
```

#### 3.4 Search Bar

```tsx
// src/components/SearchBar.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search posts by title or content..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
```

#### 3.5 Incremental Testing Strategy

Build filters **one at a time** to show progress:

1. **First**: Display all posts (no filters)
2. **Second**: Add alder dropdown, test filtering by district
3. **Third**: Add date range picker, test date filtering
4. **Fourth**: Add search bar, test text search
5. **Fifth**: Test all filters together

**Demo Checkpoint**: Show filtering by alder, then by date, then by search

---

## Phase 4: GitHub Actions & Deployment

**Goal**: Automate scraping and deploy to GitHub Pages

**Deliverables:**
1. Create scraping workflow (runs daily at 6am CT)
2. Create deployment workflow (builds and publishes)
3. Configure GitHub Pages
4. Test manual workflow trigger

**Visual Progress:**
- GitHub Actions tab shows workflows
- Can trigger manual scrape
- Site live at https://jfreyna.github.io/madison-alder-blogs/

### Phase 4 Implementation Details

#### 4.1 Scraping Workflow

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

#### 4.2 Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 4.3 Vite Configuration

Update `vite.config.ts` for GitHub Pages:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/madison-alder-blogs/', // Must match repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

#### 4.4 GitHub Pages Setup

1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. Push changes to trigger deployment

**Demo Checkpoint**: Show live site on GitHub Pages, trigger manual scrape

---

## Phase 5 (Stretch): LLM Summaries

**Goal**: Add AI-generated summaries using Gemini API

**Deliverables:**
1. Set up Gemini API key in `.env`
2. Create summarization script
3. Generate summaries for sample posts
4. Display summaries in PostCard (optional badge)

**Visual Progress:**
- Run `npm run summarize <post-url>`
- See AI-generated summary in terminal
- Summary badge appears on post card

### Phase 5 Implementation Details

See `docs/ALDER_AGGREGATOR_GEMINI_INTEGRATION.md` for full details.

**Note**: This is **optional** for demo purposes only. Do not commit API keys or summaries to public repo.

---

## Data Sources

### Alder Blog URLs

Base URL pattern: `https://www.cityofmadison.com/council/districtXX/blog`
- Districts: 1-20 (no leading zeros)
- Pagination: `?page=0`, `?page=1`, etc.

### CSS Selectors

Reference: [SCRAPING_INFO.md](https://github.com/Programming-with-AI/Civic-Hacking-Alder-Aggregator-Overview/blob/main/SCRAPING_INFO.md)

**Key selectors:**
- Post list: `#block-city-front-content .content-blog-summary .cards`
- Post title: `.article-title a`
- Post date: `time .datetime` (use `datetime` attribute)
- Post excerpt: `.article-content`
- Categories: `.card-content > p a`
- Pagination: `#block-city-front-content nav.pager .pager__item--last a`

---

## Success Criteria

### Demo Success
- [ ] Each phase shows visible progress
- [ ] Can transition smoothly between phases
- [ ] Audience can see functionality building up
- [ ] Total demo time: ~20 minutes

### Functional Success
- [ ] Scraper fetches posts from all 20 districts
- [ ] Posts display with correct formatting
- [ ] Filters work correctly (alder, date, search)
- [ ] Site deployed and accessible on GitHub Pages
- [ ] Mobile responsive design

### Code Quality
- [ ] TypeScript with strict mode
- [ ] Component reusability
- [ ] Clean separation of concerns
- [ ] Proper error handling
- [ ] Documented code

---

## Timeline (Demo Night)

**Total Time**: ~120 minutes

- **Phase 1** (30 min): Static data + PostCard styling
- **Phase 2** (40 min): Scraper implementation
- **Phase 3** (30 min): Filters and search
- **Phase 4** (15 min): Deployment
- **Phase 5** (5 min): LLM demo (if time)

---

## Risk Management

### Potential Issues

1. **Scraping fails during demo**
   - Mitigation: Have pre-scraped data as backup

2. **GitHub Pages deployment delay**
   - Mitigation: Deploy beforehand, just show updates

3. **Styling takes too long**
   - Mitigation: Use shadcn/ui defaults, customize later

4. **API rate limits**
   - Mitigation: Add delays between requests (1-2 seconds)

---

## Open Questions

1. Should we scrape individual post pages for full content, or just list pages?
   - **Decision**: Start with list pages only (faster, simpler)

2. How many recent posts to load for client-side search?
   - **Decision**: Load last 500 posts (good balance)

3. Should we implement Fuse.js for better search?
   - **Decision**: Start with simple string matching, upgrade if time

4. RSS feed format?
   - **Decision**: Standard RSS 2.0, generate during scraping

---

## References

- **Event Documentation**: https://github.com/Programming-with-AI/Civic-Hacking-Alder-Aggregator-Overview
- **Git-Scraping Pattern**: https://simonwillison.net/2020/Oct/9/git-scraping/
- **City of Madison Council**: https://www.cityofmadison.com/council
- **shadcn/ui Documentation**: https://ui.shadcn.com/
- **Vite Documentation**: https://vitejs.dev/

---

## Appendices

### Appendix A: Terminology

- **Resident**: Someone using the aggregator (not "user")
- **Alder**: Madison Common Council member
- **District**: Geographic area represented by an alder (1-20)
- **Git-scraping**: Storing scraped data in version control

### Appendix B: File Structure

```
madison-alder-blogs/
├── .github/workflows/
│   ├── scrape-blogs.yml
│   └── deploy.yml
├── scraper/
│   ├── types.ts
│   ├── alders.ts
│   ├── scrape.ts
│   ├── parse.ts
│   └── index.ts
├── data/
│   ├── posts.json
│   └── metadata.json
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── PostCard.tsx
│   │   ├── AlderFilter.tsx
│   │   ├── DateRangeFilter.tsx
│   │   └── SearchBar.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── PreviewPage.tsx
│   ├── data/
│   │   ├── samplePosts.ts
│   │   └── alders.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── types.ts
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── 1_prp/
│   ├── 2_devlog/
│   └── 3_featuredoc/
├── CLAUDE.md
├── README.md
└── package.json
```

### Appendix C: shadcn/ui Components to Install

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add popover
```

---

**Next Steps**: Begin Phase 1 - Create sample data and PostCard component
