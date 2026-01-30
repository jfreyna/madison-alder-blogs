// TypeScript interfaces for scraping

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
  categories: string[];
  scrapedAt: string; // ISO 8601
}

export interface ScraperMetrics {
  totalPosts: number;
  newPosts: number;
  failedDistricts: number[];
  lastScrapedAt: string;
}

export interface ScraperData {
  posts: Post[];
  metadata: ScraperMetrics;
}
