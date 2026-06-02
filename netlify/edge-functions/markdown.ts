// Markdown for Agents — content negotiation.
// When a request prefers `text/markdown`, serve the pre-generated index.md
// (built in gatsby-node.js onPostBuild). Browsers (Accept: text/html,...) are
// untouched and get the normal HTML response.
import type { Context } from "https://edge.netlify.com"

export default async (request: Request, context: Context) => {
  const accept = request.headers.get("accept") || ""

  // Only intercept when markdown is explicitly requested. Browsers never send
  // text/markdown, so HTML stays the default for them.
  if (!accept.includes("text/markdown")) {
    return context.next()
  }

  const url = new URL(request.url)
  let pathname = url.pathname
  if (!pathname.endsWith("/")) pathname += "/" // site uses trailingSlash: always

  const mdUrl = new URL(pathname + "index.md", url.origin)
  const res = await fetch(mdUrl.toString(), {
    headers: { "x-md-fetch": "1" },
  })

  if (!res.ok) {
    // No markdown variant for this route — fall back to HTML.
    return context.next()
  }

  const body = await res.text()
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "vary": "Accept",
      "x-markdown-tokens": String(Math.ceil(body.length / 4)),
      "cache-control": "public, max-age=0, must-revalidate",
    },
  })
}

export const config = {
  path: "/*",
  // Skip static assets and the markdown files themselves (avoids re-entry loops).
  excludedPath: [
    "/*.md",
    "/*.xml",
    "/*.txt",
    "/*.json",
    "/*.js",
    "/*.css",
    "/*.map",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.gif",
    "/*.svg",
    "/*.webp",
    "/*.ico",
    "/*.webmanifest",
    "/*.woff",
    "/*.woff2",
  ],
}
