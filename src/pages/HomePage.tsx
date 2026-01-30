import { useState, useMemo } from 'react';
import { PostCard } from '@/components/PostCard';
import { AlderFilter } from '@/components/AlderFilter';
import { SearchBar } from '@/components/SearchBar';
import { usePosts } from '@/hooks/usePosts';

const POSTS_PER_PAGE = 50;

export function HomePage() {
  const { posts, loading, error } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlder, setSelectedAlder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter posts by selected alder and search query
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by alder
    if (selectedAlder !== 'all') {
      filtered = filtered.filter(post => post.alderId === parseInt(selectedAlder));
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.bodyPreview.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [posts, selectedAlder, searchQuery]);

  // Reset to page 1 when filter changes
  const handleAlderChange = (value: string) => {
    setSelectedAlder(value);
    setCurrentPage(1);
  };

  // Reset to page 1 when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <p className="text-lg">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Madison Alder Blog Aggregator</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Aggregated blog posts from all 20 Common Council members
        </p>

        {/* Filter and Count Row */}
        <div className="flex items-center gap-4 flex-wrap">
          <AlderFilter value={selectedAlder} onChange={handleAlderChange} />
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
          </p>
        </div>
      </header>

      {/* Posts Grid */}
      <div className="space-y-4 mb-8">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found for this filter.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
