import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects"
import Avatar from "../components/avatar"
import { Section, Row } from "../components/sectionRow"

const description =
  "AI Engineer & Founder based in Singapore. 16+ years shipping web products — 12 years scaling Ahrefs' frontend, now building AI products solo from concept to paying users. Building 24 revenue-generating apps in 12 months."

const keywords =
  "ai engineer, founder, software developer, singapore, react, nextjs, typescript, ocaml, rescript, llm, multi-agent, vibe coding, indie maker, max li, max li bin"

const experience = [
  { org: "Ahrefs", role: "Frontend Software Engineer", years: "2014 — 2026" },
  { org: "Tangoshark", role: "Frontend Developer", years: "2012 — 2014" },
  {
    org: "Earlier roles",
    role: "Frontend & Web Development",
    years: "2008 — 2012",
  },
]

const education = [
  { school: "React Nanodegree", org: "Udacity", years: "2017 — 2018" },
  {
    school: "Adv. Diploma, Multimedia Design",
    org: "First Media Design School",
    years: "2006 — 2008",
  },
]

const contacts = [
  {
    label: "X / Twitter",
    value: "@maxlibin",
    href: "https://twitter.com/maxlibin",
  },
  { label: "GitHub", value: "maxlibin", href: "https://github.com/maxlibin" },
  {
    label: "LinkedIn",
    value: "in/maxlibin",
    href: "https://linkedin.com/in/maxlibin",
  },
  { label: "Email", value: "me@maxlibin.com", href: "mailto:me@maxlibin.com" },
]

const Index = ({ data }) => {
  return (
    <Layout>
      <div className="mt-4">
        <Avatar size={72} />
        <h1 className="mt-5 text-lg font-medium text-fg">Max Li</h1>
        <p className="text-[15px] text-faint">
          AI Engineer &amp; Founder · Singapore
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          Engineer and builder with 16+ years shipping web products end to end.
          I spent 12 years scaling Ahrefs' frontend (used by millions), and now
          build AI products solo from concept to paying users. I'm on a{" "}
          <Link
            to="/vibe-code-to-glory"
            className="text-fg underline decoration-line underline-offset-2 hover:decoration-fg"
          >
            Vibe Code to Glory
          </Link>{" "}
          journey — shipping 24 revenue-ready apps in 12 months.
        </p>
      </div>

      <Section label="Writing">
        {data.allWpPost.nodes.map(({ slug, title, date, excerpt, featuredImage }) => {
          const img = featuredImage?.node?.sourceUrl
          return (
            <Row key={slug} meta={date}>
              <Link to={`/${slug}`} className="group block">
                <span className="block text-fg group-hover:text-muted transition-colors">
                  {title}
                  <span className="text-faint ml-1">↗</span>
                </span>
                {img && (
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
                )}
              </Link>
            </Row>
          )
        })}
        <div className="pt-4">
          <Link
            to="/blog"
            className="text-[13px] text-faint hover:text-fg transition-colors"
          >
            All writing →
          </Link>
        </div>
      </Section>

      <Projects />

      <Section label="Experience">
        {experience.map(({ org, role, years }) => (
          <Row key={org} meta={years}>
            <span className="text-fg">{org}</span>
            <span className="text-faint"> — {role}</span>
          </Row>
        ))}
      </Section>

      <Section label="Education">
        {education.map(({ school, org, years }) => (
          <Row key={school} meta={years}>
            <span className="text-fg">{school}</span>
            <span className="text-faint"> — {org}</span>
          </Row>
        ))}
      </Section>

      <Section label="Contact">
        {contacts.map(({ label, value, href }) => (
          <Row key={label} meta={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg hover:text-muted transition-colors"
            >
              {value}
              <span className="text-faint ml-1">↗</span>
            </a>
          </Row>
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
        excerpt
        date(formatString: "MMM DD, YYYY")
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

export default Index

export const Head = () => <SEO description={description} keywords={keywords} />
