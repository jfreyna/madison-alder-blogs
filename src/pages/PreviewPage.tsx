import { PostCard } from "@/components/PostCard";
import { samplePosts } from "@/data/samplePosts";

export function PreviewPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Component Preview</h1>
        <p className="text-muted-foreground">
          Testing PostCard component with sample data
        </p>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Single Post Card</h2>
          <PostCard post={samplePosts[0]} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Multiple Post Cards</h2>
          <div className="space-y-4">
            {samplePosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
