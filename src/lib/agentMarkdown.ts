// Markdown for Agents: plain-text variants of key routes, served as
// `<route>/index.md` and picked up by netlify/edge-functions/markdown.ts on
// `Accept: text/markdown`.
import { getImage } from "astro:assets"
import type { CollectionEntry } from "astro:content"
import type { ImageMetadata } from "astro"
import { formatDate, site } from "./site"

// Images are co-located with posts under content/blog/<slug>/ and referenced
// relatively; agents need absolute URLs of the built assets instead.
const postImages = import.meta.glob<ImageMetadata>(
  "/content/blog/*/*.{png,jpg,jpeg,webp,gif}",
  {
    eager: true,
    import: "default",
  }
)

const resolveImageLinks = async (
  slug: string,
  body: string
): Promise<string> => {
  const refs = [...body.matchAll(/\]\(\.\/([^)\s]+)\)/g)].map((m) => m[1])
  let resolved = body
  for (const ref of new Set(refs)) {
    const metadata = postImages[`/content/blog/${ref}`]
    if (!metadata)
      throw new Error(`Post ${slug} references missing image ./${ref}`)
    const built = await getImage({ src: metadata })
    resolved = resolved.split(`](./${ref})`).join(`](${site.url}${built.src})`)
  }
  return resolved
}

type Post = CollectionEntry<"blog">

export const markdownResponse = (body: string): Response =>
  new Response(body.trim() + "\n", {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })

const postUrl = (post: Post): string => `${site.url}/${post.id}/`

export const postListMarkdown = (posts: Post[]): string =>
  posts
    .map(
      (p) =>
        `- [${p.data.title}](${postUrl(p)}) — ${formatDate(p.data.date, "long")}`
    )
    .join("\n")

export const postMarkdown = async (post: Post): Promise<string> => {
  if (post.body === undefined)
    throw new Error(`Post ${post.id} has no Markdown body`)
  const body = await resolveImageLinks(post.id, post.body)
  return `# ${post.data.title}\n\n*${formatDate(post.data.date, "long")} · ${postUrl(post)}*\n\n${body}`
}

export const homeMarkdown = (
  posts: Post[]
): string => `# Max Li — AI Engineer & Founder · Singapore

Engineer and builder with 16+ years shipping web products end to end. Spent 12 years scaling Ahrefs' frontend (used by millions), and now build AI products solo from concept to paying users — multi-agent platforms, generative-AI tooling, and shipped iOS apps. On a "Vibe Code to Glory" journey: 24 revenue-ready apps in 12 months.

## Projects
- [AI Banana Flow](https://www.aibananaflow.com/) — node-based visual AI workflow editor (Web)
- [Tulsk](https://tulsk.io) — AI-native project management with autonomous multi-agent clusters (Web)
- [SG Passport Photo](https://www.sgpassportphoto.com/) — ICA-compliant passport photo tool (Web)
- [MyPhotoAI](https://apps.apple.com/sg/app/myphotoai-ai-photo-generator/id6748759925) — AI photo generation (iOS)
- [Interior AI: Room Designer](https://apps.apple.com/sg/app/interior-ai-room-designer/id6751051147) — AI interior design (iOS)

## Writing
${postListMarkdown(posts)}

## Experience
- Ahrefs — Frontend Software Engineer (2014–2026)
- Tangoshark — Frontend Developer (2012–2014)
- Earlier roles — Frontend & Web Development (2008–2012)

## Contact
- X / Twitter: https://twitter.com/maxlibin
- GitHub: https://github.com/maxlibin
- LinkedIn: https://linkedin.com/in/maxlibin
- Email: me@maxlibin.com`

export const blogIndexMarkdown = (posts: Post[]): string =>
  `# Writing — Max Li\n\n${postListMarkdown(posts)}`
