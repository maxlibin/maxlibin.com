import type { APIRoute } from "astro"
import { getPostsNewestFirst } from "../../lib/posts"
import { blogIndexMarkdown, markdownResponse } from "../../lib/agentMarkdown"

export const GET: APIRoute = async () =>
  markdownResponse(blogIndexMarkdown(await getPostsNewestFirst()))
