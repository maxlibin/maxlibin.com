// @ts-check
import { readdirSync, readFileSync } from "node:fs"
import { defineConfig } from "astro/config"
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"

const SITE = "https://maxlibin.com"

// Per-post lastmod for the sitemap, read straight from the Markdown frontmatter
// (astro:content is not available inside the config file).
const postLastmod = () => {
  const dir = "content/blog"
  const entries = readdirSync(dir).filter((name) => name.endsWith(".md"))
  return new Map(
    entries.map((name) => {
      const source = readFileSync(`${dir}/${name}`, "utf8")
      const match = source.match(/^modified: (.+)$/m)
      if (!match) throw new Error(`content/blog/${name} has no modified date`)
      return [`${SITE}/${name.replace(/\.md$/, "")}/`, new Date(match[1])]
    })
  )
}

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  integrations: [
    sitemap({
      serialize: (item) => {
        const lastmod = postLastmod().get(item.url)
        return {
          ...item,
          ...(lastmod ? { lastmod: lastmod.toISOString() } : {}),
          changefreq:
            item.url === `${SITE}/`
              ? ChangeFreqEnum.DAILY
              : ChangeFreqEnum.WEEKLY,
          priority: item.url === `${SITE}/` ? 1.0 : 0.7,
        }
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: "github-dark" },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
