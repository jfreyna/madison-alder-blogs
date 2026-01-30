// CLI entry point for scraper

import * as fs from 'fs/promises';
import * as path from 'path';
import { alders } from './alders';
import { scrapeAllAlders } from './scrape';
import type { Post, ScraperData } from './types';

/**
 * Load existing posts from data/posts.json
 * Returns empty array if file doesn't exist
 */
async function loadExistingPosts(): Promise<Post[]> {
  const dataPath = path.join(process.cwd(), 'data', 'posts.json');

  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const parsed: ScraperData = JSON.parse(data);
    return parsed.posts || [];
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

/**
 * Deduplicate posts by URL
 * Returns only new posts that don't exist in existing data
 */
function deduplicatePosts(newPosts: Post[], existingPosts: Post[]): Post[] {
  const existingUrls = new Set(existingPosts.map(p => p.url));
  return newPosts.filter(post => !existingUrls.has(post.url));
}

/**
 * Save posts to data/posts.json
 */
async function savePosts(posts: Post[], newPostsCount: number): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data');
  const dataPath = path.join(dataDir, 'posts.json');

  // Ensure data directory exists
  await fs.mkdir(dataDir, { recursive: true });

  const scraperData: ScraperData = {
    posts,
    metadata: {
      totalPosts: posts.length,
      newPosts: newPostsCount,
      failedDistricts: [],
      lastScrapedAt: new Date().toISOString(),
    },
  };

  await fs.writeFile(dataPath, JSON.stringify(scraperData, null, 2), 'utf-8');

  console.log(`\n💾 Data saved to: data/posts.json`);
  console.log(`   New posts added: ${newPostsCount}`);
  console.log(`   Total posts in database: ${posts.length}`);
}

/**
 * Main scraper function
 */
async function main() {
  try {
    // Load existing posts
    const existingPosts = await loadExistingPosts();
    console.log(`\n📂 Loaded ${existingPosts.length} existing posts from database`);

    // Scrape all alder blogs
    const scrapedPosts = await scrapeAllAlders(alders);

    // Deduplicate
    const newPosts = deduplicatePosts(scrapedPosts, existingPosts);

    // Merge with existing posts (newest first)
    const allPosts = [...newPosts, ...existingPosts];

    // Sort by date (newest first)
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Save to file
    await savePosts(allPosts, newPosts.length);

    console.log('\n🎉 Scraping completed successfully!\n');
  } catch (error) {
    console.error('\n❌ Scraping failed:', error);
    process.exit(1);
  }
}

// Run scraper
main();
