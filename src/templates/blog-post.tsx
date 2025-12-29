import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import { Helmet } from "react-helmet"
import SyntaxHighlighter from "react-syntax-highlighter"
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs"

import Layout from "../components/layout"
import Projects from "../components/projects"
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

const getHeadings = (content: string) => {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const headingRegex = /<(h[2-3])(.*?)>(.*?)<\/h[2-3]>/gi
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1][1])
    const text = match[3].replace(/<[^>]*>?/gm, "")
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
                  ? "text-4xl font-bold mt-12 mb-6"
                  : "text-2xl font-bold mt-8 mb-4"
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
              style={anOldHope}
              customStyle={{
                padding: "28px",
                backgroundColor: "rgb(26 25 59)",
                borderRadius: "8px",
                marginBottom: "28px",
                border: "1px solid #01040a",
                borderLeft: "8px solid #6611e2",
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
  const plainExcerpt = excerpt.replace(/<[^>]*>?/gm, "").slice(0, 160)

  return (
    <Layout>
      <div className="post">
        <div className="py-8">
          <div className="text-xs text-gray-700 dark:text-gray-500 mb-2">
            {date}
          </div>
          <h1 className="text-6xl leading-snug font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* GEO Optimized: Key Takeaways / Summary */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-6 mb-12 rounded-r-lg">
              <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3 mt-0">
                Key Takeaways
              </h2>
              <div className="text-gray-700 dark:text-gray-300 italic text-lg">
                {plainExcerpt}...
              </div>
            </div>

            <div className="text-gray-900 dark:text-gray-300 text-xl md:max-w-4xl leading-relaxed">
              {parser(content)}
            </div>
          </div>

          {/* Sidebar with Table of Contents */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-8 border border-gray-100 dark:border-gray-800 p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 mt-0">
                Table of Contents
              </h2>
              <nav aria-label="Table of contents">
                <ul className="space-y-3 text-sm">
                  {headings.map((h, i) => (
                    <li
                      key={i}
                      style={{ paddingLeft: `${(h.level - 2) * 1.5}rem` }}
                    >
                      <a
                        href={`#${h.id}`}
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <Projects />
        </div>

        <div className="mt-8 text-gray-900 dark:text-gray-300 text-xl md:max-w-4xl">
          <div className="giscus" />
        </div>
      </div>
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
        question: match[1].replace(/<[^>]*>?/gm, ""),
        answer: match[2].replace(/<[^>]*>?/gm, ""),
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
