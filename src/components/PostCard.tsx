import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAlderByDistrict } from "@/data/alders";
import type { Post } from "@/hooks/usePosts";

interface PostCardProps {
  post: Post;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function PostCard({ post }: PostCardProps) {
  const alder = getAlderByDistrict(post.alderId);

  if (!alder) {
    return null; // Skip posts with invalid alder IDs
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img
            src={alder.photoUrl}
            alt={alder.name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alder.name)}&background=random`;
            }}
          />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {post.title}
              </a>
            </CardTitle>
            <CardDescription className="text-sm">
              {alder.name} • District {alder.district} • {formatDate(post.date)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {post.bodyPreview}
        </p>
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
