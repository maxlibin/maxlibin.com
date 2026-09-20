import type { Faq } from "./seo"

const stripTags = (html: string): string => html.replace(/<[^>]*>/g, "")

const looksLikeQuestion = (heading: string): boolean => {
  const lower = heading.toLowerCase()
  return (
    heading.includes("?") || lower.includes("how") || lower.includes("what")
  )
}

// Pull up to three question-style H2/H3 headings (with the paragraph that
// follows each) out of rendered post HTML, for FAQPage JSON-LD.
export const extractFaqs = (html: string): Faq[] => {
  const pattern = /<(?:h2|h3)[^>]*>(.*?)<\/(?:h2|h3)>\s*<p[^>]*>(.*?)<\/p>/gis
  const faqs: Faq[] = []
  for (const match of html.matchAll(pattern)) {
    if (faqs.length === 3) break
    const question = stripTags(match[1])
    if (!looksLikeQuestion(question)) continue
    faqs.push({ question, answer: stripTags(match[2]) })
  }
  return faqs
}
