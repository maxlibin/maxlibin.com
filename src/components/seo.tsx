import React from "react"
import {useSiteMetadata} from "../hooks/use-site-metadata"

interface props {
  title?: string;
  description?: string;
  keywords?: string;
  pathname?: string;
  article?: boolean;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  breadcrumbs?: Array<{name: string, item: string}>;
  softwareApp?: {
    name: string;
    description: string;
    applicationCategory: string;
    operatingSystem: string;
    url: string;
    image?: string;
  };
  faqs?: Array<{question: string, answer: string}>;
  children?: React.ReactNode
}

const SEO = ({title, description, keywords, pathname, article, datePublished, dateModified, authorName, breadcrumbs, softwareApp, faqs, children}: props) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
    keywords: keywords || "web development, ai, react, gatsby, singapore, frontend"
  }

  const schemaOrgJSONLD: any[] = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": siteUrl,
      "name": defaultTitle,
      "alternateName": defaultTitle,
    },
    {
      "@context": "http://schema.org",
      "@type": "Person",
      "name": authorName || "Max Li Bin",
      "url": siteUrl,
      "sameAs": [
        `https://twitter.com/${twitterUsername.replace("@", "")}`,
        "https://github.com/maxlibin",
      ],
    }
  ]

  if (article) {
    schemaOrgJSONLD.push({
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "url": seo.url,
      "name": seo.title,
      "alternateName": defaultTitle,
      "headline": seo.title,
      "image": {
        "@type": "ImageObject",
        "url": seo.image,
      },
      "description": seo.description,
      "author": {
        "@type": "Person",
        "name": authorName || "Max Li Bin",
      },
      "publisher": {
        "@type": "Person",
        "name": "Max Li Bin",
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": seo.url,
      },
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
    })
  }

  if (softwareApp) {
    schemaOrgJSONLD.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": softwareApp.name,
      "description": softwareApp.description,
      "applicationCategory": softwareApp.applicationCategory,
      "operatingSystem": softwareApp.operatingSystem,
      "url": softwareApp.url,
      "image": softwareApp.image || seo.image,
      "author": {
        "@type": "Person",
        "name": "Max Li Bin"
      }
    })
  }

  if (faqs && faqs.length > 0) {
    schemaOrgJSONLD.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    })
  }

  if (breadcrumbs) {
    schemaOrgJSONLD.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`
      }))
    })
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="image" content={seo.image} />
      
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={defaultTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      
      <link rel="canonical" href={seo.url} />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🤔</text></svg>" />
      
      {schemaOrgJSONLD.map((schema, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(schema)}
        </script>
      ))}

      {children}
    </>
  )
}

export default SEO;
