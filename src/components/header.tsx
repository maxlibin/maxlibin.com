import React from "react"
import { Link } from "gatsby"

import Social from "./social"
import ThemeToggle from "./toggler"

type link = {
  label: string
  href: string
}

const links: Array<link> = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Vibe Code to Glory", href: "/vibe-code-to-glory" },
]

const Header = () => (
  <header className="py-8 flex items-center gap-6">
    <nav aria-label="Main navigation">
      <ul className="flex gap-5 text-sm">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              to={href}
              className="text-faint hover:text-fg transition-colors"
              activeClassName="!text-fg"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="ml-auto flex items-center gap-4">
      <Social />
      <ThemeToggle />
    </div>
  </header>
)

export default Header
