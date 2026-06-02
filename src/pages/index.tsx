import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects"
import Avatar from "../components/avatar"
import { Section, Row } from "../components/sectionRow"

const description =
  "Software Developer & Vibe Coder based in Singapore. Currently building 24 revenue-generating apps in 12 months. Let's talk about React, TypeScript, AI, and Vibe Coding."

const keywords =
  "vibe coding, software developer, singapore, react, typescript, ai, indie maker, 24 apps challenge, max li bin"

const contacts = [
  {
    label: "X / Twitter",
    value: "@maxlibin",
    href: "https://twitter.com/maxlibin",
  },
  { label: "GitHub", value: "maxlibin", href: "https://github.com/maxlibin" },
  { label: "Email", value: "me@maxlibin.com", href: "mailto:me@maxlibin.com" },
]

const Index = ({ data }) => {
  return (
    <Layout>
      <div className="mt-4">
        <Avatar size={72} />
        <h1 className="mt-5 text-lg font-medium text-fg">Max Li Bin</h1>
        <p className="text-[15px] text-faint">
          Software Developer &amp; Vibe Coder · Singapore
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          Independent software developer based in Singapore, building with React,
          TypeScript, and AI. I'm on a{" "}
          <Link
            to="/vibe-code-to-glory"
            className="text-fg underline decoration-line underline-offset-2 hover:decoration-fg"
          >
            Vibe Code to Glory
          </Link>{" "}
          journey — shipping 24 revenue-ready apps in 12 months.
        </p>
      </div>

      <Projects />

      <Section label="Writing">
        {data.allWpPost.nodes.map(({ slug, title, date }) => (
          <Row
            key={slug}
            left={
              <Link
                to={`/${slug}`}
                className="text-fg hover:text-muted transition-colors"
              >
                {title}
              </Link>
            }
            right={date}
          />
        ))}
        <div className="pt-4">
          <Link
            to="/blog"
            className="text-[13px] text-faint hover:text-fg transition-colors"
          >
            All writing →
          </Link>
        </div>
      </Section>

      <Section label="Contact">
        {contacts.map(({ label, value, href }) => (
          <Row
            key={label}
            left={
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg hover:text-muted transition-colors"
              >
                {value}
                <span className="text-faint ml-1">↗</span>
              </a>
            }
            right={label}
          />
        ))}
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWpPost(limit: 7, sort: { fields: date, order: DESC }) {
      nodes {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export default Index

export const Head = () => <SEO description={description} keywords={keywords} />
