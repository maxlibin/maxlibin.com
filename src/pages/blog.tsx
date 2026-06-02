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
                <Link to={`/${slug}`} className="group block">
                  <span className="block text-fg group-hover:text-muted transition-colors">
                    {title}
                    <span className="text-faint ml-1">↗</span>
                  </span>
                  {img ? (
                    <span className="mt-3 flex overflow-hidden rounded-xl border border-line">
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        className="w-28 sm:w-36 object-cover shrink-0"
                      />
                      <span className="flex items-center min-w-0 p-4">
                        <span
                          className="text-[13px] text-faint line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                      </span>
                    </span>
                  ) : (
                    <span
                      className="mt-1 block text-[13px] text-faint line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                  )}
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
