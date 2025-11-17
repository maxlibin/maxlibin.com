import React from "react"
import { graphql } from "gatsby"
import GitHubCalendar from "react-github-calendar"

import Layout from "../components/layout"
import  SEO  from "../components/seo"
import LatestPosts from "../components/latestPosts"
import GithubRepo from "../components/githubRepos"
import Books from "../components/books"

const title = "@maxlibin"
const description =
  "I am based in Singapore, have Javascript, React, ReasonMl, Rescript, ReasonReact, RescriptReact, ai, vibe coding projects you'd like to discuss?"

const colorTheme = {
  level0: "#f5eaea",
  level1: "#dfc7e8",
  level2: "#ffb84c",
  level3: "#f16767",
  level4: "#a459d1",
}

const Index = ({ data }) => {
  return (
    <Layout>
      <div className="mt-8">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white pt-8 inline-block">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 py-2">{description}</p>
        <LatestPosts data={data.allWpPost} />
        <GithubRepo data={data.allGithubRepos} />
        <div className="mt-8 dark:text-white">
          <GitHubCalendar
            username="maxlibin"
            blockSize={17}
            blockMargin={6}
            theme={colorTheme}
          />
        </div>
        <Books />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWpPost(limit: 8, sort: { fields: date, order: DESC }) {
      nodes {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
    allGithubRepos {
      nodes {
        name
        html_url
        description
        language
        updated_at(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export default Index

export const Head = () => <SEO />
