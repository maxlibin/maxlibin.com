import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import { Helmet } from "react-helmet"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

import Layout from "../components/layout"
import SEO from "../components/seo"

type node = {
  content: string
  date: string
  rawDate: string
  modified: string
  title: string
  slug: string
  excerpt: string
}

type post = {
  data: {
    allWpPost: {
      nodes: Array<node>
    }
  }
}

const decodeEntities = (text: string) => {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
}

const getHeadings = (content: string) => {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const headingRegex = /<(h[2-3])(.*?)>(.*?)<\/h[2-3]>/gi
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1][1])
    let text = match[3].replace(/<[^>]*>?/gm, "")
    text = decodeEntities(text)

    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
    headings.push({ id, text, level })
  }
  return headings
}

const BlogPost = ({ data }: post) => {
  const {
    allWpPost: {
      nodes: [{ title, content, date, modified, slug, excerpt }],
    },
  } = data

  const parser = (input: string) =>
    parse(input, {
      replace: (domNode: any) => {
        // Add IDs to headings for ToC linking
        if (domNode.tagName === "h2" || domNode.tagName === "h3") {
          const text =
            domNode.children
              ?.map((n: any) => n.data || (n.children && n.children[0]?.data))
              .join("") || ""
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")

          const Tag = domNode.tagName as keyof JSX.IntrinsicElements
          return (
            <Tag
              id={id}
              className={
                domNode.tagName === "h2"
                  ? "text-2xl font-semibold text-fg mt-12 mb-5"
                  : "text-xl font-semibold text-fg mt-8 mb-3"
              }
            >
              {domNode.children.map((child: any, i: number) => {
                if (child.type === "text") return child.data
                return parse(child.data || "") // Fallback for nested tags in headings
              })}
            </Tag>
          )
        }

        let language = domNode.rel || "javascript"
        if (domNode.tagName === "pre") {
          return (
            <SyntaxHighlighter
              language={language}
              style={atomOneDark}
              customStyle={{
                padding: "20px",
                backgroundColor: "#171513",
                borderRadius: "8px",
                marginBottom: "28px",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: "14px",
              }}
            >
              {domNode.children[0].children?.map((n: any) => n.data).join("")}
            </SyntaxHighlighter>
          )
        }

        // Image SEO: Ensure all images have alt tags
        if (domNode.tagName === "img") {
          const { src, alt, ...rest } = domNode.attribs
          return (
            <img
              src={src}
              alt={alt || `Image for ${title} - Max Li Bin Blog`}
              loading="lazy"
              className="rounded-lg shadow-md my-8 max-w-full h-auto"
              {...rest}
            />
          )
        }
      },
    })

  const headings = getHeadings(content)
  const plainExcerpt = decodeEntities(
    excerpt.replace(/<[^>]*>?/gm, "").slice(0, 160)
  )

  return (
    <Layout>
      <div className="post">
        <div className="py-8">
          <div className="text-[13px] text-faint mb-2">{date}</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg leading-tight">
            {title}
          </h1>
        </div>

        {/* GEO Optimized: lead / summary */}
        <div className="border-l-2 border-line pl-4 mb-12 text-[15px] italic text-muted">
          {plainExcerpt}...
        </div>

        <div className="text-[16px] text-muted leading-relaxed">
          {parser(content)}
        </div>

        <div className="mt-16 pt-8 border-t border-line">
          <div className="giscus" />
        </div>
      </div>

      {/* Table of Contents — fixed in the right margin, wide screens only.
          Kept outside .post so the prose list styles don't apply. */}
      {headings.length > 0 && (
        <aside
          className="hidden xl:block fixed top-28 w-56 max-h-[70vh] overflow-y-auto"
          style={{ left: "calc(50% + 21rem)" }}
        >
          <div className="text-[11px] font-medium uppercase tracking-wider text-faint mb-4">
            Table of Contents
          </div>
          <nav aria-label="Table of contents">
            <ul className="list-none m-0 space-y-2.5">
              {headings.map((h, i) => (
                <li
                  key={i}
                  className="m-0"
                  style={{ paddingLeft: `${(h.level - 2) * 0.75}rem` }}
                >
                  <a
                    href={`#${h.id}`}
                    title={h.text}
                    className={`block truncate border-l border-line pl-3 text-[13px] transition-colors ${
                      h.level === 2
                        ? "text-muted hover:text-fg"
                        : "text-faint hover:text-muted"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        rawDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        modified(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        content
        slug
      }
    }
  }
`

export default BlogPost

export const Head = ({ data }: post) => {
  const {
    allWpPost: {
      nodes: [{ title, rawDate, modified, slug, excerpt, content }],
    },
  } = data

  const description = `Explore ${title} and discover insights, tips, and tools to help you succeed. Dive into the full guide now!`

  // Extract potential FAQs from content (looking for Q&A patterns)
  const faqs: Array<{ question: string; answer: string }> = []
  const faqRegex = /<(?:h2|h3)>(.*?)<\/(?:h2|h3)>\s*<p>(.*?)<\/p>/gi
  let match
  let count = 0
  while ((match = faqRegex.exec(content)) !== null && count < 3) {
    if (
      match[1].includes("?") ||
      match[1].toLowerCase().includes("how") ||
      match[1].toLowerCase().includes("what")
    ) {
      faqs.push({
        question: decodeEntities(match[1].replace(/<[^>]*>?/gm, "")),
        answer: decodeEntities(match[2].replace(/<[^>]*>?/gm, "")),
      })
      count++
    }
  }

  return (
    <SEO
      title={title}
      description={description}
      pathname={`/${slug}`}
      article={true}
      datePublished={rawDate}
      dateModified={modified}
      faqs={faqs}
      breadcrumbs={[
        { name: "Home", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: title, item: `/${slug}` },
      ]}
    >
      <script
        src="https://giscus.app/client.js"
        data-repo="maxlibin/maxlibin.com"
        data-repo-id="MDEwOlJlcG9zaXRvcnkxNzQ3MTQ5MTg="
        data-category="General"
        data-category-id="DIC_kwDOCmnwJs4CTNwO"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossOrigin="anonymous"
        async
      ></script>
    </SEO>
  )
}
