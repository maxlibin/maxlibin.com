import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import { Helmet } from "react-helmet"
import SyntaxHighlighter from "react-syntax-highlighter"
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs"

import Layout from "../components/layout"
import Projects from "../components/projects"

type node = {
  content: string
  date: string
  title: string
}

type post = {
  data: {
    allWpPost: {
      nodes: Array<node>
    }
  }
}

const parser = (input: string) =>
  parse(input, {
    replace: (domNode: any) => {
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
    },
  })

const BlogPost = ({ data }: post) => {
  const {
    allWpPost: {
      nodes: [{ title, content, date }],
    },
  } = data

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Explore ${title} and discover insights, tips, and tools to help you succeed. Dive into the full guide now!`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`Explore ${title} and discover insights, tips, and tools to help you succeed. Dive into the full guide now!`} />
        <script src="https://giscus.app/client.js"
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
          crossorigin="anonymous"
          async>
        </script>
      </Helmet>
      <div className="post">
        <div className="text-xs text-gray-700 dark:text-gray-500 py-8">
          <div className="text-xs text-gray-700 dark:text-gray-500 mb-2">
            {date}
          </div>
          <h1 className="text-6xl leading-snug font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        <div className="mt-8 text-gray-900 dark:text-gray-300 text-xl md:max-w-4xl">
          {parser(content)}
        </div>
        <Projects />
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
        content
      }
    }
  }
`

export default BlogPost
