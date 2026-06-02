const path = require(`path`)
const fs = require(`fs`)
const fetch = require('node-fetch');
const TurndownService = require('turndown');

const SITE_URL = "https://maxlibin.com"

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
  return graphql(`
    {
      allWpPost(sort: { fields: [date] }) {
        nodes {
          title
          excerpt
          content
          slug
        }
      }
    }
  `).then(result => {
    result.data.allWpPost.nodes.forEach(node => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          slug: node.slug,
        },
      })
    })
  })
}

// Markdown for Agents: at build time, emit an index.md next to each HTML route
// so a Netlify edge function can serve it on `Accept: text/markdown`.
exports.onPostBuild = async ({ graphql, reporter }) => {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  })

  const PUBLIC = path.join(__dirname, "public")
  const writeMd = (routePath, md) => {
    const clean = routePath.replace(/^\/+/, "").replace(/\/+$/, "")
    const dir = clean ? path.join(PUBLIC, clean) : PUBLIC
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, "index.md"), md.trim() + "\n", "utf8")
  }

  const result = await graphql(`
    {
      allWpPost(sort: { fields: date, order: DESC }) {
        nodes {
          title
          slug
          content
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  `)

  if (result.errors) {
    reporter.warn("markdown-for-agents: skipped (graphql error)")
    return
  }

  const posts = result.data.allWpPost.nodes

  // Per-post markdown from the source WordPress HTML (clean <pre>/<h2>/<p>).
  posts.forEach(post => {
    const body = td.turndown(post.content || "")
    const md = `# ${post.title}\n\n*${post.date} · ${SITE_URL}/${post.slug}/*\n\n${body}`
    writeMd(`/${post.slug}/`, md)
  })

  const postList = posts
    .map(p => `- [${p.title}](${SITE_URL}/${p.slug}/) — ${p.date}`)
    .join("\n")

  // Homepage
  writeMd(
    "/",
    `# Max Li — AI Engineer & Founder · Singapore

Engineer and builder with 16+ years shipping web products end to end. Spent 12 years scaling Ahrefs' frontend (used by millions), and now build AI products solo from concept to paying users — multi-agent platforms, generative-AI tooling, and shipped iOS apps. On a "Vibe Code to Glory" journey: 24 revenue-ready apps in 12 months.

## Projects
- [AI Banana Flow](https://www.aibananaflow.com/) — node-based visual AI workflow editor (Web)
- [Tulsk](https://tulsk.io) — AI-native project management with autonomous multi-agent clusters (Web)
- [SG Passport Photo](https://www.sgpassportphoto.com/) — ICA-compliant passport photo tool (Web)
- [MyPhotoAI](https://apps.apple.com/sg/app/myphotoai-ai-photo-generator/id6748759925) — AI photo generation (iOS)
- [Interior AI: Room Designer](https://apps.apple.com/sg/app/interior-ai-room-designer/id6751051147) — AI interior design (iOS)

## Writing
${postList}

## Experience
- Ahrefs — Frontend Software Engineer (2014–2026)
- Tangoshark — Frontend Developer (2012–2014)
- Earlier roles — Frontend & Web Development (2008–2012)

## Contact
- X / Twitter: https://twitter.com/maxlibin
- GitHub: https://github.com/maxlibin
- LinkedIn: https://linkedin.com/in/maxlibin
- Email: me@maxlibin.com`
  )

  // Blog index
  writeMd("/blog/", `# Writing — Max Li\n\n${postList}`)

  reporter.info(`markdown-for-agents: wrote ${posts.length + 2} .md files`)
}

exports.sourceNodes = async ({actions: {createNode}, createContentDigest}) => {
  const response = await fetch("https://api.github.com/users/maxlibin/repos")

  const repos = await response.json();

  repos.forEach((repo) => {
    createNode({
      ...repo,
      id: String(repo.id),
      internal: {
        type: 'GithubRepos',
        contentDigest: createContentDigest(repo)
      }
    });
  });
};
