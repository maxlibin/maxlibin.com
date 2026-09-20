import type { APIRoute } from "astro"
import { getPostsNewestFirst } from "../lib/posts"
import { homeMarkdown, markdownResponse } from "../lib/agentMarkdown"

export const GET: APIRoute = async () =>
  markdownResponse(homeMarkdown(await getPostsNewestFirst()))
