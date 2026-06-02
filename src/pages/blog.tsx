import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SectionLabel } from "../components/sectionRow"

interface node {
  date: string
  excerpt: string
  slug: string
  title: string
}

interface post {
  data: {
    allWpPost: {
      nodes: Array<node>
    }
  }
}

const Blog = ({ data }: post) => {
  return (
    <Layout>
      <div className="mt-4">
        <SectionLabel>Writing</SectionLabel>
        <div className="-mt-1">
          {data.allWpPost.nodes.map(({ slug, title, excerpt, date }) => (
            <Link
              to={`/${slug}`}
              key={slug}
              className="group block py-4 border-b border-line"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-[15px] text-fg group-hover:text-muted transition-colors">
                  {title}
                </h3>
                <span className="text-[13px] text-faint whitespace-nowrap tabular-nums shrink-0">
                  {date}
                </span>
              </div>
              <div
                className="mt-1 text-[13px] text-faint line-clamp-1"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date], order: DESC }) {
      nodes {
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`

export default Blog

export const Head = () => (
  <SEO
    title="Blog | Insights, Tutorials, and Guides for Developers"
    description="Explore our blog for the latest insights, tutorials, and guides on web development, vibe coding, AI-powered tools, and innovative technologies. Stay updated with expert knowledge and practical tips."
    pathname="/blog"
    breadcrumbs={[
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
    ]}
  />
)
