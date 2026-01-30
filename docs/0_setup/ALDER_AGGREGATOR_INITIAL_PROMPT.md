# Initial Prompt for Claude Code - Madison Alder Blog Aggregator

**Copy and paste this entire message into a new Claude Code session in a separate VS Code window.**

---

I'm building a Madison Common Council blog aggregator for a civic hacking demo tonight (January 29, 2026). This is part of an AI coding tools showcase where I'll demonstrate how to use your workflow methodology.

## Project Description

The app is a lightweight aggregator for Madison Common Council blog posts—a feature the city's website used to provide but no longer does. On a scheduled interval (via GitHub Action), the app will fetch all 20 alder blogs, extract new posts, and publish them to a static site on GitHub Pages.

The site will support:
- Filtering by alder (district 1-20)
- Narrowing results by date range
- Client-side text search over recent posts
- RSS feed generation

Behind the scenes, this is a classic example of Simon Willison's "[git-scraping](https://simonwillison.net/2020/Oct/9/git-scraping/)." Each run stores a lightweight history of all discovered posts in version control. This gives us a durable history with zero backend infrastructure.

**Base URL**: `https://www.cityofmadison.com/council/districtXX/blog` (XX = 1-20, no leading zeros)

## Tech Stack Requirements

- **Frontend**: React 18 + TypeScript + Vite + shadcn/ui + Tailwind CSS
- **Scraping**: Node.js + TypeScript + Cheerio (jQuery-like parsing)
- **Search**: Fuse.js (client-side fuzzy search)
- **Deployment**: GitHub Pages
- **Scheduling**: GitHub Actions (daily cron at 6am CT)
- **Data Storage**: Git (json files committed to repo)

**Important**: This is **civic tech** - no vendor lock-in, free forever, transparent and forkable by the community.

## Scraping Information Provided

All CSS selectors and alder data are documented here:
- [SCRAPING_INFO.md](https://github.com/Programming-with-AI/Civic-Hacking-Alder-Aggregator-Overview/blob/main/SCRAPING_INFO.md)

Key selectors (use these, don't reverse-engineer):
- Post list: `#block-city-front-content .content-blog-summary .cards`
- Post title: `.article-title a`
- Post date: `time .datetime` (use `datetime` attribute)
- Post body preview: `.article-content`
- Pagination: `?page=0`, `?page=1`, etc.

20 alders with names, blog URLs, and photo URLs are in the SCRAPING_INFO doc.

## Project Workflow (My Methodology from Frilly)

I follow a three-stage documentation process:

1. **PRP (Product Requirements Prompt)** - Before building
   - Create: `docs/1_prp/AA-001_Initial_Setup_prp.md`
   - Document architecture decisions, tech stack rationale

2. **DevLog (Development Log)** - While building
   - Create: `docs/2_devlog/AA-001_Initial_Setup_devlog.md`
   - Track implementation details, blockers, solutions

3. **FeatDoc (Feature Documentation)** - After completion
   - Create: `docs/3_featuredoc/AA-001_Initial_Setup_featuredoc.md`
   - Final documentation for future maintainers

**Issue numbering**: AA-001, AA-002, etc. (AA = Alder Aggregator)

## Terminology Guidelines

**Never use "user"** - this is civic technology serving Madison residents:
- ✅ **Resident** - Someone using the aggregator
- ✅ **Alder** - Madison Common Council member
- ✅ **Community** - Madison residents, contributors, maintainers
- ❌ **User** - Too impersonal for civic tech

## Initial Tasks

Please help me:

1. **Create initial project structure** following the architecture in CLAUDE.md
2. **Set up CLAUDE.md** as project instructions (copy from context)
3. **Initialize project** with:
   - Vite + React + TypeScript
   - shadcn/ui setup
   - Basic folder structure (`scraper/`, `data/`, `src/`, `docs/`)
4. **Create PRP** for AA-001 (Initial Setup)
5. **Set up git** with proper `.gitignore`

## Context Files Provided

I'm attaching two reference documents:

**ALDER_AGGREGATOR_CLAUDE.md**
- Complete project instructions
- Architecture patterns
- TypeScript examples
- shadcn/ui setup
- Git-scraping pattern explanation
- Deployment instructions

**ALDER_AGGREGATOR_GEMINI_INTEGRATION.md**
- Optional LLM summarization (demo only)
- Gemini API setup
- Cost tracking patterns
- **DO NOT commit this file to repo** (add to .gitignore)

## Key Constraints

- ❌ No backend database (Convex, Firebase, etc.)
- ❌ No user authentication
- ❌ No complex state management
- ✅ Static site with client-side logic only
- ✅ Data lives in git (git-scraping pattern)
- ✅ Free forever on GitHub Pages

## Questions to Address in PRP

1. Should we scrape detail pages or just list pages?
2. How many recent posts to load for client-side search? (500? 1000?)
3. RSS feed generation - build-time or runtime?
4. Should summaries/ folder be created (for optional Gemini demo)?

## Demo Context

This is for a live demo tonight at 6pm where I'll show how AI coding tools (like Claude Code) can rapidly scaffold civic tech projects. The goal is to demonstrate disciplined workflows adapting to different tech stacks.

**Ready to start?** Let's begin with the PRP for AA-001 (Initial Setup).
