module.exports = {
  siteMetadata: {
    title: `Max Li Bin - Software Developer & Vibe Coder`,
    description: `Independent software developer based in Singapore specializing in React, TypeScript, and AI-powered applications. Chronicling my "Vibe Code to Glory" journey: building 24 apps in 12 months.`,
    twitterUsername: `@maxlibin`,
    author: `Max Li Bin`,
    image: `/icons/icon-512x512.png`, // Use a real image instead of data URI
    siteUrl: `https://maxlibin.com`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://b.maxlibin.com/graphql`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Max Li Bin - Software Developer`,
        short_name: `maxlibin`,
        start_url: `/`,
        background_color: `#111827`,
        theme_color: `#6366f1`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon-32x32.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-G0B3GHYF90"],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allWpPost {
              nodes {
                slug
                lastmod: modified
              }
            }
          }
        `,
        resolvePages: ({ allSitePage, allWpPost }) => {
          const wpNodeMap = allWpPost.nodes.reduce((acc, node) => {
            // WordPress slugs in Gatsby are usually just the slug,
            // but the page path is /slug/
            acc[`/${node.slug}/`] = node
            return acc
          }, {})

          return allSitePage.nodes.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, lastmod }) => {
          return {
            url: path,
            lastmod,
            changefreq: path === "/" ? "daily" : "weekly",
            priority: path === "/" ? 1.0 : 0.7,
          }
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://maxlibin.com",
        sitemap: "https://maxlibin.com/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
  trailingSlash: "always",
}
