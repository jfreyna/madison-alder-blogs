# GEMINI_INTEGRATION.md - Optional LLM Summarization

**⚠️ IMPORTANT: This file should be in `.gitignore` - DO NOT commit to public repo**

This document describes how to integrate **Google Gemini API** to generate post summaries for the Alder blog aggregator. This is an **optional demo feature** to showcase LLM capabilities.

---

## Why Gemini (Not OpenAI)?

You already have experience with Gemini from Frilly:
- ✅ Used in `convex/ai/aiService.ts` (Frilly)
- ✅ Familiar with API patterns
- ✅ Cost-effective for summarization tasks
- ✅ Fast response times

**Cost Comparison:**
| Model | Input Cost | Output Cost | Use Case |
|-------|-----------|-------------|----------|
| **Gemini 1.5 Flash** | $0.075 / 1M tokens | $0.30 / 1M tokens | ✅ Summaries (fast, cheap) |
| GPT-4o-mini | $0.15 / 1M tokens | $0.60 / 1M tokens | More expensive |

**Recommendation**: Use **Gemini 1.5 Flash** for summaries (same model you use in Frilly).

---

## Setup Instructions

### 1. Get API Key

**Option A: Use existing Frilly key**
- Copy from `frilly/.env.local`
- Look for: `GEMINI_API_KEY=...`

**Option B: Create new key** (for demo isolation)
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Get API Key"
3. Copy key

### 2. Add to Environment

```bash
# .env (DO NOT COMMIT)
GEMINI_API_KEY=your_api_key_here
```

```bash
# .env.example (COMMIT THIS)
# Optional: Gemini API for post summarization (demo only)
GEMINI_API_KEY=your_api_key_here
```

### 3. Update .gitignore

```
# .gitignore
.env
summaries/
*.log
GEMINI_INTEGRATION.md  # This file!
```

---

## Implementation

### Install Gemini SDK

```bash
npm install @google/generative-ai
```

### Summarization Script

```typescript
// scraper/summarize.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import type { Post } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSummary(post: Post): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are summarizing a blog post from a Madison Common Council member (Alder).

Post Title: ${post.title}
Post Content Preview: ${post.bodyPreview}

Generate a concise 2-3 sentence summary that captures:
1. The main topic or issue discussed
2. Any actions taken or proposed
3. Relevance to Madison residents

Keep the tone neutral and civic-focused. Do not editorialize.`;

  const result = await model.generateContent(prompt);
  const summary = result.response.text();

  return summary.trim();
}

export async function summarizePost(postUrl: string): Promise<void> {
  // Load posts
  const postsJson = await fs.readFile("data/posts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson);

  // Find post by URL
  const post = posts.find((p) => p.url === postUrl);
  if (!post) {
    throw new Error(`Post not found: ${postUrl}`);
  }

  console.log(`\n🤖 Generating summary for: "${post.title}"`);
  console.log(`   Alder District: ${post.alderId}`);

  // Generate summary
  const summary = await generateSummary(post);

  // Save to summaries/ folder (gitignored)
  await fs.mkdir("summaries", { recursive: true });
  const filename = `summaries/${post.id}.json`;
  await fs.writeFile(
    filename,
    JSON.stringify({ postId: post.id, summary, generatedAt: new Date().toISOString() }, null, 2)
  );

  console.log(`\n✅ Summary generated:`);
  console.log(`   ${summary}`);
  console.log(`\n📁 Saved to: ${filename}`);
}
```

### Command Line Usage

```bash
# Add to package.json
{
  "scripts": {
    "summarize": "tsx scraper/summarize.ts"
  }
}
```

```bash
# Run for a specific post
npm run summarize -- "https://www.cityofmadison.com/council/district1/blog/post-url"
```

---

## Cost Tracking

**Pattern from Frilly** (like Google Places cost tracking in FRI-582):

```typescript
// scraper/summarize.ts (continued)
export interface SummarizationMetrics {
  postsProcessed: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  estimatedCost: number;
}

const COSTS = {
  INPUT: 0.075 / 1_000_000,   // $0.075 per 1M input tokens
  OUTPUT: 0.30 / 1_000_000,   // $0.30 per 1M output tokens
};

export async function calculateCost(
  inputTokens: number,
  outputTokens: number
): Promise<number> {
  const inputCost = inputTokens * COSTS.INPUT;
  const outputCost = outputTokens * COSTS.OUTPUT;
  return inputCost + outputCost;
}

export async function summarizeBatch(postUrls: string[]): Promise<SummarizationMetrics> {
  const metrics: SummarizationMetrics = {
    postsProcessed: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    estimatedCost: 0,
  };

  for (const url of postUrls) {
    try {
      // Generate summary (with token counting)
      const result = await generateSummaryWithMetrics(url);

      metrics.postsProcessed++;
      metrics.totalInputTokens += result.inputTokens;
      metrics.totalOutputTokens += result.outputTokens;
    } catch (error) {
      console.error(`Failed to summarize ${url}:`, error);
    }
  }

  metrics.estimatedCost = await calculateCost(
    metrics.totalInputTokens,
    metrics.totalOutputTokens
  );

  console.log(`\n💰 Cost Summary:`);
  console.log(`   Posts processed: ${metrics.postsProcessed}`);
  console.log(`   Input tokens: ${metrics.totalInputTokens.toLocaleString()}`);
  console.log(`   Output tokens: ${metrics.totalOutputTokens.toLocaleString()}`);
  console.log(`   Estimated cost: $${metrics.estimatedCost.toFixed(4)}`);

  return metrics;
}
```

---

## Demo Workflow (Tonight)

### Option 1: Live Demo (Recommended)

1. **Pick 1 recent post** from the UI
2. **Copy URL** to clipboard
3. **Run in terminal:**
   ```bash
   npm run summarize -- "<paste-url>"
   ```
4. **Show output** in terminal (summary + cost)
5. **Explain pattern**: "This is the same Gemini API we use in Frilly for AI responses"

### Option 2: Pre-generated Summaries

1. **Before demo**, generate 5-10 summaries
2. **Save to `summaries/` folder** (gitignored)
3. **During demo**, show pre-generated results
4. **Explain**: "We could add this to GitHub Actions, but it costs money per post"

### Option 3: Skip It

- Mention it exists as stretch goal
- Show `GEMINI_INTEGRATION.md` file
- Move on to other features

---

## UI Integration (Optional)

If you want to show summaries in the frontend:

```tsx
// src/components/PostCard.tsx
interface PostCardProps {
  post: Post;
  alder: Alder;
  summary?: string; // Optional AI-generated summary
}

export function PostCard({ post, alder, summary }: PostCardProps) {
  return (
    <Card>
      <CardHeader>{/* ... */}</CardHeader>
      <CardContent>
        {summary && (
          <div className="bg-muted p-3 rounded-md mb-3">
            <p className="text-sm">
              <span className="font-semibold">🤖 AI Summary:</span> {summary}
            </p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">{post.bodyPreview}</p>
        {/* ... */}
      </CardContent>
    </Card>
  );
}
```

**Load summaries:**
```typescript
// src/hooks/useSummaries.ts
export function useSummaries() {
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load all summaries from summaries/*.json
    // (Only works if summaries are committed - NOT RECOMMENDED for public repo)
    fetch("/summaries/index.json")
      .then((r) => r.json())
      .then((data) => setSummaries(data));
  }, []);

  return summaries;
}
```

---

## Security & Privacy Notes

### ⚠️ DO NOT Commit:
- ❌ `.env` file with API key
- ❌ `summaries/` folder with generated summaries
- ❌ This `GEMINI_INTEGRATION.md` file

### ✅ Safe to Commit:
- ✅ `.env.example` (template, no real key)
- ✅ `scraper/summarize.ts` (code only)
- ✅ Instructions in CLAUDE.md referencing this file

### Why Keep This Private?

1. **API Key Security** - Exposing key allows anyone to use your quota
2. **Cost Control** - Public key = unlimited usage = surprise bills
3. **Demo-Only Feature** - Not part of public civic tool
4. **Community Forks** - Maintainers won't have Gemini keys

---

## Alternative: Use Bluesky Bot (Free)

Instead of storing summaries, post them to Bluesky:

```typescript
// scraper/bluesky.ts
import { BskyAgent } from "@atproto/api";

export async function postToBluesky(post: Post, summary: string) {
  const agent = new BskyAgent({ service: "https://bsky.social" });
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  const text = `📢 New post from Alder District ${post.alderId}

${post.title}

${summary}

${post.url}`;

  await agent.post({ text });
}
```

**Benefit**: No cost, public engagement, no storage needed

---

## Cost Estimates (For Reference)

**Typical post:**
- Input: ~500 tokens (title + preview)
- Output: ~100 tokens (summary)
- Cost per post: ~$0.00004 (4 cents per 1000 posts)

**20 alders, 10 posts each/month:**
- 200 posts/month
- Cost: ~$0.008/month (~1 cent)

**Negligible cost**, but still good practice to track.

---

## Questions for Tonight's Demo

1. **Should you demo this?**
   - Pro: Shows LLM integration (relevant to AI coding tools theme)
   - Con: Adds complexity, might confuse git-scraping message

2. **If yes, which option?**
   - Live demo (1 post) - Shows real API call
   - Pre-generated - Faster, no API failures
   - Skip - Focus on core features

3. **Alternative demo idea:**
   - Show how Claude Code helped you integrate Gemini
   - Show similarity to Frilly's `aiService.ts`
   - Highlight code reuse patterns

---

**Recommendation**: Keep it simple for tonight. Mention Gemini as "stretch goal" but focus on core git-scraping + React demo. You have enough to show!
