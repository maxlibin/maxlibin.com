// One-off importer: pulls every published post from the WordPress REST API,
// downloads the images it references, converts the HTML body to Markdown and
// writes `content/blog/<slug>.md` (+ `content/blog/<slug>/<image>`).
//
// Run with `yarn import:wordpress`. Any network or conversion failure aborts
// the run with the offending slug/URL in the error.
import fs from "node:fs/promises"
import path from "node:path"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"

const WP_API = "https://b.maxlibin.com/wp-json/wp/v2"
const UPLOADS_HOST = "b.maxlibin.com"
const BLOG_DIR = path.resolve("content/blog")
// Non-image attachments (e.g. a linked .txt) must be served as-is, so they
// live under public/ and are linked by absolute path.
const FILES_DIR = path.resolve("public/files")

const decodeEntities = (text) =>
  text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16))
    )
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&hellip;/g, "…")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")

const stripTags = (html) => html.replace(/<[^>]*>/g, "")

// Jetpack rewrites uploads to `i0.wp.com/b.maxlibin.com/...?ssl=1`; map every
// variant back to the origin URL so the download hits WordPress directly.
const toOriginUrl = (src) => {
  const url = new URL(src)
  if (url.hostname.endsWith(".wp.com")) {
    const [, host, ...rest] = url.pathname.split("/")
    if (host !== UPLOADS_HOST) {
      throw new Error(`Unexpected wp.com image host in ${src}`)
    }
    return `https://${UPLOADS_HOST}/${rest.join("/")}`
  }
  if (url.hostname !== UPLOADS_HOST) {
    throw new Error(`Image is not hosted on WordPress: ${src}`)
  }
  url.search = ""
  return url.toString()
}

// Original filenames contain spaces and U+202F; keep them ASCII and stable.
const localImageName = (originUrl) => {
  const base = decodeURIComponent(path.basename(new URL(originUrl).pathname))
  const ext = path.extname(base).toLowerCase()
  const stem = path
    .basename(base, path.extname(base))
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return `${stem}${ext}`
}

const download = async (url, dest) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Download failed ${res.status} ${res.statusText}: ${url}`)
  }
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()))
}

const fetchAllPosts = async () => {
  const res = await fetch(
    `${WP_API}/posts?per_page=100&status=publish&_embed=wp:featuredmedia`
  )
  if (!res.ok) {
    throw new Error(`Post list failed ${res.status}: ${await res.text()}`)
  }
  const total = Number(res.headers.get("x-wp-total"))
  const posts = await res.json()
  if (posts.length !== total) {
    throw new Error(`Expected ${total} posts, API returned ${posts.length}`)
  }
  return posts
}

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
})
turndown.use(gfm)
// WordPress emits bare <pre> (no <code>, no language); keep it a fenced block.
turndown.addRule("barePre", {
  filter: (node) =>
    node.nodeName === "PRE" &&
    !(node.firstChild && node.firstChild.nodeName === "CODE"),
  replacement: (_, node) =>
    `\n\n\`\`\`\n${node.textContent.replace(/\n$/, "")}\n\`\`\`\n\n`,
})

const yamlString = (value) => JSON.stringify(value)

const importPost = async (post) => {
  const slug = post.slug
  const postDir = path.join(BLOG_DIR, slug)
  let html = post.content.rendered

  const imageSources = [
    ...new Set([...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1])),
  ]
  const featured = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
  const allSources = featured ? [...imageSources, featured] : imageSources

  const localBySource = new Map()
  if (allSources.length > 0) await fs.mkdir(postDir, { recursive: true })
  for (const src of allSources) {
    const origin = toOriginUrl(src)
    const name = localImageName(origin)
    await download(origin, path.join(postDir, name))
    localBySource.set(src, `./${slug}/${name}`)
  }
  for (const [src, local] of localBySource) {
    html = html.split(`src="${src}"`).join(`src="${local}"`)
  }
  const linkedFiles = [
    ...new Set(
      [
        ...html.matchAll(
          /href="(https:\/\/b\.maxlibin\.com\/wp-content\/uploads\/[^"]+)"/g
        ),
      ].map((m) => m[1])
    ),
  ]
  for (const href of linkedFiles) {
    const name = localImageName(href)
    await fs.mkdir(path.join(FILES_DIR, slug), { recursive: true })
    await download(href, path.join(FILES_DIR, slug, name))
    html = html.split(`href="${href}"`).join(`href="/files/${slug}/${name}"`)
  }
  // Strip Jetpack's responsive-image attributes, which still point at wp.com.
  html = html.replace(/\s(srcset|sizes|data-recalc-dims)="[^"]*"/g, "")

  const body = turndown.turndown(html).trim()
  if (body.includes(".wp.com/") || body.includes(UPLOADS_HOST)) {
    throw new Error(`Post ${slug} still references WordPress after conversion`)
  }

  const frontmatter = [
    "---",
    `title: ${yamlString(decodeEntities(post.title.rendered))}`,
    `date: ${post.date_gmt}Z`,
    `modified: ${post.modified_gmt}Z`,
    `excerpt: ${yamlString(
      decodeEntities(stripTags(post.excerpt.rendered))
        .replace(/\s*\[…\]\s*$/, "")
        .trim()
    )}`,
    ...(featured ? [`cover: ${yamlString(localBySource.get(featured))}`] : []),
    "---",
  ].join("\n")

  await fs.writeFile(
    path.join(BLOG_DIR, `${slug}.md`),
    `${frontmatter}\n\n${body}\n`
  )
  return { slug, images: allSources.length }
}

const main = async () => {
  await fs.rm(BLOG_DIR, { recursive: true, force: true })
  await fs.rm(FILES_DIR, { recursive: true, force: true })
  await fs.mkdir(BLOG_DIR, { recursive: true })
  const posts = await fetchAllPosts()
  let images = 0
  for (const post of posts) {
    const result = await importPost(post)
    images += result.images
    console.log(`${result.slug} (${result.images} images)`)
  }
  console.log(`Imported ${posts.length} posts, ${images} images`)
}

await main()
