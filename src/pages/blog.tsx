import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SectionLabel, Row } from "../components/sectionRow"

interface node {
  date: string
  excerpt: string
  slug: string
  title: string
  featuredImage?: {
    node?: {
      sourceUrl?: string
      altText?: string
    }
  }
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
        <div>
          {data.allWpPost.nodes.map(({ slug, title, excerpt, date, featuredImage }) => {
            const img = featuredImage?.node?.sourceUrl
            return (
              <Row key={slug} meta={date}>
                <Link to={`/${slug}`} className="group flex items-start gap-3">
                  {img && (
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="w-16 h-11 rounded object-cover border border-line shrink-0 mt-0.5"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block text-fg group-hover:text-muted transition-colors">
                      {title}
                    </span>
                    <span
                      className="block mt-1 text-[13px] text-faint line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                  </span>
                </Link>
              </Row>
            )
          })}
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
        date(formatString: "MMM DD, YYYY")
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
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
