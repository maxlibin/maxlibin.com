export const site = {
  url: "https://maxlibin.com",
  title: "Max Li Bin - Software Developer & Vibe Coder",
  description:
    'Independent software developer based in Singapore specializing in React, TypeScript, and AI-powered applications. Chronicling my "Vibe Code to Glory" journey: building 24 apps in 12 months.',
  keywords: "web development, ai, react, astro, singapore, frontend",
  author: "Max Li Bin",
  twitterUsername: "@maxlibin",
  image: "/android-chrome-512x512.png",
  gaTrackingId: "G-G0B3GHYF90",
} as const

export const socials = [
  { label: "Twitter", href: "https://twitter.com/maxlibin" },
  { label: "Github", href: "https://github.com/maxlibin" },
  { label: "LinkedIn", href: "https://linkedin.com/in/maxlibin" },
] as const

export const formatDate = (date: Date, month: "short" | "long"): string =>
  new Intl.DateTimeFormat("en-US", {
    month,
    day: "2-digit",
    year: "numeric",
    timeZone: "Asia/Singapore",
  }).format(date)
