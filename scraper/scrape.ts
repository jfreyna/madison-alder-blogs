// Main scraping logic for Madison alder blogs

import * as cheerio from 'cheerio';
import type { Alder, Post } from './types';

/**
 * Extract page number from pagination URL
 * Example: "?page=5" -> 5
 */
function extractPageNumber(href: string | undefined): number {
  if (!href) return 0;
  const match = href.match(/page=(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Generate unique post ID from URL
 * Example: "/council/district2/blog/2026/01/15/meeting-recap" -> "district2-2026-01-15-meeting-recap"
 */
function generatePostId(url: string): string {
  return url
    .replace(/^\/council\//, '')
    .replace(/\//g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract posts from a single page of HTML
 */
function extractPostsFromPage($: cheerio.CheerioAPI, alder: Alder): Post[] {
  const posts: Post[] = [];

  // Select all post cards from the page
  $('#block-city-front-content .content-blog-summary .cards li').each((_, element) => {
    const $post = $(element);

    try {
      // Extract post data using CSS selectors from SCRAPING_INFO.md
      const titleElement = $post.find('.article-title a');
      const title = titleElement.text().trim();
      const relativeUrl = titleElement.attr('href');

      const dateElement = $post.find('time .datetime');
      const datetime = dateElement.attr('datetime');

      const bodyPreview = $post.find('.article-content').text().trim();

      // Extract categories
      const categories: string[] = [];
      $post.find('.card-content > p a').each((_, catElement) => {
        const category = $(catElement).text().trim();
        if (category) {
          categories.push(category);
        }
      });

      // Only add post if we have required fields
      if (title && relativeUrl && datetime) {
        const fullUrl = `https://www.cityofmadison.com${relativeUrl}`;

        posts.push({
          id: generatePostId(relativeUrl),
          alderId: alder.district,
          title,
          url: fullUrl,
          date: datetime,
          bodyPreview,
          categories,
          scrapedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      // Skip malformed posts silently
      console.error(`   └─ Warning: Failed to parse post - ${error}`);
    }
  });

  return posts;
}

/**
 * Scrape all blog posts for a single alder
 * Handles pagination automatically
 */
export async function scrapeAlderBlog(alder: Alder): Promise<Post[]> {
  console.log(`\n📍 District ${alder.district} - ${alder.name}`);
  console.log(`   └─ Fetching ${alder.blogUrl}`);

  const allPosts: Post[] = [];

  try {
    // Fetch first page to determine total pages
    const firstPageResponse = await fetch(alder.blogUrl);

    if (!firstPageResponse.ok) {
      throw new Error(`HTTP ${firstPageResponse.status}`);
    }

    const firstPageHtml = await firstPageResponse.text();
    const $ = cheerio.load(firstPageHtml);

    // Extract posts from first page
    const firstPagePosts = extractPostsFromPage($, alder);
    allPosts.push(...firstPagePosts);

    // Determine total pages from pagination
    const lastPageHref = $('#block-city-front-content nav.pager .pager__item--last a').attr('href');
    const totalPages = extractPageNumber(lastPageHref) + 1; // 0-indexed, so add 1

    console.log(`   └─ Found ${totalPages} page(s)`);

    // Scrape remaining pages if pagination exists
    if (totalPages > 1) {
      for (let page = 1; page < totalPages; page++) {
        // Add delay to be respectful to the server
        await new Promise(resolve => setTimeout(resolve, 1000));

        const pageUrl = `${alder.blogUrl}?page=${page}`;
        const pageResponse = await fetch(pageUrl);

        if (!pageResponse.ok) {
          console.error(`   └─ Warning: Page ${page} failed (HTTP ${pageResponse.status})`);
          continue;
        }

        const pageHtml = await pageResponse.text();
        const $page = cheerio.load(pageHtml);

        const pagePosts = extractPostsFromPage($page, alder);
        allPosts.push(...pagePosts);
      }
    }

    console.log(`   └─ Scraped ${allPosts.length} posts ✓`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`   └─ Error: ${errorMessage} ✗`);
  }

  return allPosts;
}

/**
 * Scrape all 20 alder blogs
 */
export async function scrapeAllAlders(alders: Alder[]): Promise<Post[]> {
  console.log('🚀 Starting blog scraper...');
  console.log(`📊 Total districts: ${alders.length}`);

  const allPosts: Post[] = [];
  const failedDistricts: number[] = [];

  for (const alder of alders) {
    const posts = await scrapeAlderBlog(alder);

    if (posts.length === 0) {
      failedDistricts.push(alder.district);
    }

    allPosts.push(...posts);

    // Delay between alders to be respectful
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log('\n✅ Scraping complete!');
  console.log(`   Total posts: ${allPosts.length}`);
  console.log(`   Failed districts: ${failedDistricts.length > 0 ? failedDistricts.join(', ') : 'None'}`);

  return allPosts;
}
