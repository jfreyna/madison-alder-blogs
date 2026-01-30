// Hook to load and manage blog posts data

import { useState, useEffect } from 'react';

export interface Post {
  id: string;
  alderId: number;
  title: string;
  url: string;
  date: string;
  bodyPreview: string;
  categories: string[];
  scrapedAt: string;
}

export interface PostsData {
  posts: Post[];
  metadata: {
    totalPosts: number;
    newPosts: number;
    failedDistricts: number[];
    lastScrapedAt: string;
  };
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/data/posts.json');

        if (!response.ok) {
          throw new Error(`Failed to load posts: ${response.status}`);
        }

        const data: PostsData = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return { posts, loading, error };
}
