import type { APIRoute, GetStaticPaths } from "astro"
import type { CollectionEntry } from "astro:content"
import { getPostsNewestFirst } from "../../lib/posts"
import { markdownResponse, postMarkdown } from "../../lib/agentMarkdown"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPostsNewestFirst()
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }))
}

export const GET: APIRoute<{ post: CollectionEntry<"blog"> }> = async ({
  props,
}) => markdownResponse(await postMarkdown(props.post))
