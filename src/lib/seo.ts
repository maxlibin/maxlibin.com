import { site } from "./site"

export type Breadcrumb = { name: string; item: string }
export type Faq = { question: string; answer: string }
export type SoftwareApp = {
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  url: string
  image?: string
}

export type SeoProps = {
  title?: string
  description?: string
  keywords?: string
  pathname?: string
  article?: boolean
  datePublished?: Date
  dateModified?: Date
  breadcrumbs?: Breadcrumb[]
  softwareApp?: SoftwareApp
  faqs?: Faq[]
}

export type ResolvedSeo = {
  title: string
  description: string
  keywords: string
  image: string
  url: string
  article: boolean
  jsonLd: Record<string, unknown>[]
}

export const resolveSeo = (props: SeoProps): ResolvedSeo => {
  const title = props.title ?? site.title
  const description = props.description ?? site.description
  const image = `${site.url}${site.image}`
  const url = `${site.url}${props.pathname ?? ""}`

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: site.url,
      name: site.title,
      alternateName: site.title,
    },
    {
      "@context": "http://schema.org",
      "@type": "Person",
      name: site.author,
      url: site.url,
      sameAs: [
        `https://twitter.com/${site.twitterUsername.replace("@", "")}`,
        "https://github.com/maxlibin",
      ],
    },
  ]

  if (props.article) {
    jsonLd.push({
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url,
      name: title,
      alternateName: site.title,
      headline: title,
      image: { "@type": "ImageObject", url: image },
      description,
      author: { "@type": "Person", name: site.author },
      publisher: { "@type": "Person", name: site.author },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      datePublished: props.datePublished?.toISOString(),
      dateModified: (props.dateModified ?? props.datePublished)?.toISOString(),
    })
  }

  if (props.softwareApp) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: props.softwareApp.name,
      description: props.softwareApp.description,
      applicationCategory: props.softwareApp.applicationCategory,
      operatingSystem: props.softwareApp.operatingSystem,
      url: props.softwareApp.url,
      image: props.softwareApp.image ?? image,
      author: { "@type": "Person", name: site.author },
    })
  }

  if (props.faqs && props.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: props.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    })
  }

  if (props.breadcrumbs) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: props.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.item.startsWith("http")
          ? crumb.item
          : `${site.url}${crumb.item}`,
      })),
    })
  }

  return {
    title,
    description,
    keywords: props.keywords ?? site.keywords,
    image,
    url,
    article: props.article ?? false,
    jsonLd,
  }
}
